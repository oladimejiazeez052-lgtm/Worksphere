/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { DesignSystemPage } from './components/DesignSystem';
import { LandingPage } from './components/marketing/LandingPage';
import { LoginPage } from './components/auth/LoginPage';
import { RegisterPage } from './components/auth/RegisterPage';
import { OnboardingPage } from './components/onboarding/OnboardingPage';
import { ROUTES } from './lib/routes';

import { DashboardPage } from './components/dashboard/DashboardPage';
import { JobsPage } from './components/jobs/JobsPage';
import { WorkerDirectoryPage } from './components/workers/WorkerDirectoryPage';
import { JobCreatePage } from './components/jobs/JobCreatePage';
import { PortfolioPage } from './components/portfolio/PortfolioPage';
import { AIProfileBuilderPage } from './components/ai/AIProfileBuilderPage';
import { ReportsPage } from './components/reports/ReportsPage';
import { NotificationsPage } from './components/notifications/NotificationsPage';
import { SettingsPage } from './components/settings/SettingsPage';
import { AdminPage } from './components/admin/AdminPage';
import { NotFoundPage } from './components/shared/NotFoundPage';

import { AuthProvider } from './hooks/useAuth';
import { ToastProvider } from './hooks/useToast';

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <ToastProvider>
          <Routes>
        {/* Public Marketing */}
        <Route path={ROUTES.LANDING} element={<LandingPage />} />
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
        <Route path={ROUTES.ONBOARDING} element={<OnboardingPage />} />

        {/* Core Marketplace */}
        <Route path={ROUTES.JOBS} element={<JobsPage />} />
        <Route path={ROUTES.WORKERS} element={<WorkerDirectoryPage />} />
        <Route path={ROUTES.CREATE_JOB} element={<JobCreatePage />} />
        <Route path={ROUTES.PORTFOLIO} element={<PortfolioPage />} />
        <Route path={ROUTES.AI_PROFILE} element={<AIProfileBuilderPage />} />

        {/* Analytics, Activity & Settings */}
        <Route path={ROUTES.REPORTS} element={<ReportsPage />} />
        <Route path={ROUTES.NOTIFICATIONS} element={<NotificationsPage />} />
        <Route path={ROUTES.SETTINGS} element={<SettingsPage />} />
        <Route path={ROUTES.ADMIN} element={<AdminPage />} />
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />} />

        {/* Foundations & Design System */}
        <Route path="/design-system" element={
          <AppLayout>
            <DesignSystemPage />
          </AppLayout>
        } />

        {/* Dashboard */}
        <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />

        {/* Fallback */}
        </Routes>
        </ToastProvider>
      </AuthProvider>
    </Router>
  );
}


