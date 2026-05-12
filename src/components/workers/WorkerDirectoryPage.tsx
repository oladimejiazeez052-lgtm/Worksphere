import { useState } from 'react';
import { AppLayout } from '../layout/AppLayout';
import { WorkerCard } from './WorkerCard';
import { SearchBar } from '../shared/SearchBar';
import { FilterChips } from '../shared/FilterChips';

const MOCK_WORKERS = [
  {
    id: 1,
    name: "Musa Adewale",
    role: "Master Electrician",
    location: "Lagos, Nigeria",
    rating: 4.9,
    isVerified: true,
    skills: ["Commercial Wiring", "Panel Upgrades", "Smart Home"],
    avatar: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=400&h=400&fit=crop"
  },
  {
    id: 2,
    name: "Chinedu Eze",
    role: "Senior Plumber",
    location: "Enugu, Nigeria",
    rating: 4.8,
    isVerified: true,
    skills: ["Pipe Fitting", "Emergency Repair", "Solar Water"],
    avatar: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=400&h=400&fit=crop"
  },
  {
    id: 3,
    name: "Fatima Bello",
    role: "Interior Designer",
    location: "Abuja, Nigeria",
    rating: 4.7,
    isVerified: false,
    skills: ["Space Planning", "3D Rendering", "Furniture Styling"],
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
  },
  {
    id: 4,
    name: "Samuel Okafor",
    role: "App Developer",
    location: "Lekki, Lagos",
    rating: 5.0,
    isVerified: true,
    skills: ["React Native", "Firebase", "UI/UX Design"],
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop"
  }
];

export function WorkerDirectoryPage() {
  const [selectedRole, setSelectedRole] = useState("All Workers");

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-margin py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <div>
            <h1 className="text-h2 font-h2 text-on-surface mb-2">Service Professionals</h1>
            <p className="text-body-md text-on-surface-variant">Hire the best talent for your project.</p>
          </div>
          <SearchBar placeholder="Search skills, names..." className="md:w-96" />
        </div>

        <FilterChips
          options={["All Workers", "Electricians", "Plumbers", "Designers", "Developers"]}
          selectedOption={selectedRole}
          onSelect={setSelectedRole}
          className="mb-8"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {MOCK_WORKERS.map(worker => (
            <WorkerCard 
              key={worker.id}
              name={worker.name}
              role={worker.role}
              location={worker.location}
              rating={worker.rating}
              isVerified={worker.isVerified}
              skills={worker.skills}
              avatar={worker.avatar}
            />
          ))}
          
          {MOCK_WORKERS.length === 0 && (
            <div className="col-span-full py-20 text-center bg-surface-container-low rounded-xl border border-dashed border-outline-variant">
              <p className="text-on-surface-variant">No professionals found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
