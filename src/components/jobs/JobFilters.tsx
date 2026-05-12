import { Search } from 'lucide-react';

export function JobFilters() {
  return (
    <aside className="w-full md:w-64 flex-shrink-0 bg-surface-container-low p-6 rounded-xl border border-outline-variant h-fit">
      <h2 className="font-h4 text-h4 text-on-surface mb-6">Filters</h2>
      
      <div className="mb-6">
        <label className="font-label-sm text-label-sm text-on-surface-variant block mb-2">Search Job</label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-outline" />
          <input
            type="text"
            placeholder="e.g. Electrician"
            className="w-full pl-10 pr-3 py-2 bg-surface border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-primary font-body-sm text-body-sm text-on-surface outline-none"
          />
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-label-md text-label-md text-on-surface mb-3">Job Type</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="rounded border-outline-variant text-primary focus:ring-primary" />
            <span className="font-body-sm text-body-sm text-on-surface-variant">Fixed Price</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="rounded border-outline-variant text-primary focus:ring-primary" />
            <span className="font-body-sm text-body-sm text-on-surface-variant">Hourly Rate</span>
          </label>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-label-md text-label-md text-on-surface mb-3">Price Range</h3>
        <div className="grid grid-cols-2 gap-2">
          <input type="number" placeholder="Min" className="w-full px-3 py-2 bg-surface border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary font-body-sm text-body-sm outline-none" />
          <input type="number" placeholder="Max" className="w-full px-3 py-2 bg-surface border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary font-body-sm text-body-sm outline-none" />
        </div>
      </div>

      <div>
        <h3 className="font-label-md text-label-md text-on-surface mb-3">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {['Plumbing', 'Electrical', 'Cleaning', 'Repair'].map(skill => (
            <span key={skill} className="px-2 py-1 bg-surface-container-high text-on-surface-variant rounded text-xs font-label-md cursor-pointer hover:bg-surface-variant transition-colors">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </aside>
  );
}
