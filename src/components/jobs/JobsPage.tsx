import { useState, useEffect } from 'react';
import { AppLayout } from '../layout/AppLayout';
import { JobCard } from './JobCard';
import { JobFilters } from './JobFilters';
import { EmptyState } from '../ui/EmptyState';
import { Search, Loader2 } from 'lucide-react';
import { SearchBar } from '../shared/SearchBar';
import { FilterChips } from '../shared/FilterChips';
import { supabase } from '../../lib/supabase';

export function JobsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Jobs");
  const [searchQuery, setSearchQuery] = useState("");
  const [jobs, setJobs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      let query = supabase
        .from('jobs')
        .select('*')
        .order('created_at', { ascending: false });

      if (selectedCategory !== "All Jobs") {
        query = query.eq('category', selectedCategory);
      }

      const { data, error } = await query;
      
      if (error) {
        console.error('Error fetching jobs:', error);
      } else {
        setJobs(data || []);
      }
      setIsLoading(false);
    };

    fetchJobs();
  }, [selectedCategory]);

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          job.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-margin py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <div>
            <h1 className="text-h2 font-h2 text-on-surface mb-2">Available Jobs</h1>
            <p className="text-body-md text-on-surface-variant">Find the perfect opportunity for your skills.</p>
          </div>
          <SearchBar 
            placeholder="Search jobs, projects..." 
            className="md:w-96" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <FilterChips
          options={["All Jobs", "Maintenance", "Electronics", "Construction", "Cleaning"]}
          selectedOption={selectedCategory}
          onSelect={setSelectedCategory}
          className="mb-8"
        />

        <div className="flex flex-col md:flex-row gap-gutter">
          <JobFilters />

          <div className="flex-1">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="w-8 h-8 text-primary animate-spin mb-4" />
                <p className="text-on-surface-variant">Loading available jobs...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredJobs.map(job => (
                  <JobCard 
                    key={job.id} 
                    title={job.title}
                    category={job.category}
                    budget={job.budget}
                    location={job.location}
                    postedAt={new Date(job.created_at).toLocaleDateString()}
                    type={job.type}
                    description={job.description}
                  />
                ))}
                
                {filteredJobs.length === 0 && (
                  <div className="col-span-full">
                    <EmptyState 
                      icon={Search}
                      title="No Jobs Found"
                      description="We couldn't find any results matching your current filters. Try clearing them or using a different keyword."
                      action={
                        <button className="bg-primary text-on-primary px-8 py-2.5 rounded-xl font-label-md">
                          Clear Filters
                        </button>
                      }
                      className="bg-surface-container-low rounded-xl border border-outline-variant"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
