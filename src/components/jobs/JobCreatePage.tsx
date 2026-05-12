import { JobForm } from './JobForm';
import { AppLayout } from '../layout/AppLayout';

export function JobCreatePage() {
  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-margin py-12 md:py-16">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-h2 font-h2 text-on-surface mb-4">Post a New Job</h1>
          <p className="text-body-md text-on-surface-variant">
            Connect with top-tier professionals by providing clear details about your project.
          </p>
        </div>
        
        <JobForm />
      </div>
    </AppLayout>
  );
}
