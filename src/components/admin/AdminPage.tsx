import React, { useState } from 'react';
import { AppLayout } from '../layout/AppLayout';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Search, UserPlus, Filter, MoreVertical, Shield, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

const MOCK_USERS = [
  { id: '1', name: 'John Doe', email: 'john.doe@example.com', role: 'Worker', status: 'Active', joined: 'Oct 24, 2023', initials: 'JD' },
  { id: '2', name: 'Alice Smith', email: 'alice.smith@corp.com', role: 'Client', status: 'Pending', joined: 'Nov 02, 2023', initials: 'AS' },
  { id: '3', name: 'Robert Johnson', email: 'rj.design@freelance.net', role: 'Worker', status: 'Suspended', joined: 'Sep 15, 2023', initials: 'RJ' },
  { id: '4', name: 'Sarah Jenkins', email: 'sarah.j@worksphere.com', role: 'Worker', status: 'Active', joined: 'Dec 10, 2023', initials: 'SJ' },
  { id: '5', name: 'Mike Wilson', email: 'mike@techflow.io', role: 'Client', status: 'Active', joined: 'Jan 05, 2024', initials: 'MW' },
];

export function AdminPage() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-margin py-8 md:py-12">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <h1 className="text-h2 font-h2 text-on-surface">User Management</h1>
            <p className="text-body-lg text-on-surface-variant">Manage platform users, roles, and account statuses.</p>
          </div>
          <button className="bg-primary text-on-primary px-6 py-3 rounded-xl font-label-md flex items-center gap-2 shadow-lg hover:bg-primary/90 transition-all active:scale-[0.98]">
            <UserPlus className="w-5 h-5" />
            Add New User
          </button>
        </header>

        <Card className="mb-8 border-outline-variant">
          <div className="p-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant w-4 h-4" />
              <input 
                type="text" 
                placeholder="Search users by name, email or role..."
                className="w-full bg-surface border border-outline-variant rounded-xl py-2.5 pl-10 pr-4 focus:ring-2 focus:ring-primary outline-none transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-surface border border-outline-variant rounded-xl font-label-md hover:bg-surface-container transition-all">
                <Filter className="w-4 h-4" />
                Filter
              </button>
              <button className="flex-1 md:flex-none px-4 py-2.5 bg-surface border border-outline-variant rounded-xl font-label-md text-on-surface-variant disabled:opacity-50">
                Bulk Actions
              </button>
            </div>
          </div>
        </Card>

        <Card className="overflow-hidden border-outline-variant shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low border-b border-outline-variant">
                  <th className="px-6 py-4 w-12"><input type="checkbox" className="rounded" /></th>
                  <th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-wider">User</th>
                  <th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-wider">Role</th>
                  <th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-wider">Joined Date</th>
                  <th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant bg-surface">
                {MOCK_USERS.map((user) => (
                  <tr key={user.id} className="hover:bg-surface-container-low transition-colors group">
                    <td className="px-6 py-4"><input type="checkbox" className="rounded" /></td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-primary font-bold shadow-sm">
                          {user.initials}
                        </div>
                        <div>
                          <div className="font-label-md text-on-surface">{user.name}</div>
                          <div className="text-xs text-on-surface-variant">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={user.role === 'Client' ? 'primary' : 'outline'} className="rounded-lg">
                        {user.role}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5">
                        <div className={`w-2 h-2 rounded-full ${
                          user.status === 'Active' ? 'bg-secondary' : 
                          user.status === 'Pending' ? 'bg-tertiary' : 'bg-error'
                        }`} />
                        <span className="text-sm font-medium">{user.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-on-surface-variant">{user.joined}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 hover:bg-surface-container-high rounded-lg transition-all text-on-surface-variant hover:text-primary">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="px-6 py-4 bg-surface border-t border-outline-variant flex items-center justify-between">
            <span className="text-sm text-on-surface-variant">Showing 1 to 5 of 124 users</span>
            <div className="flex items-center gap-2">
              <button disabled className="p-2 border border-outline-variant rounded-lg disabled:opacity-30">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="p-2 border border-outline-variant rounded-lg hover:bg-surface-container transition-all">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <Card className="p-6 bg-surface-container-low border-none">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/10 rounded-lg"><Shield className="w-5 h-5 text-primary" /></div>
              <h3 className="font-label-md">Audit Logs</h3>
            </div>
            <p className="text-sm text-on-surface-variant mb-4">Track all administrative actions and user events.</p>
            <button className="text-primary text-sm font-bold hover:underline">View Logs</button>
          </Card>
          
          <Card className="p-6 bg-surface-container-low border-none">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-secondary/10 rounded-lg"><UserPlus className="w-5 h-5 text-secondary" /></div>
              <h3 className="font-label-md">Role Management</h3>
            </div>
            <p className="text-sm text-on-surface-variant mb-4">Configure permissions and access levels for platform roles.</p>
            <button className="text-secondary text-sm font-bold hover:underline">Manage Roles</button>
          </Card>

          <Card className="p-6 bg-primary-container text-on-primary-container border-none shadow-lg">
            <h3 className="text-lg font-bold mb-2">Platform Health</h3>
            <div className="text-3xl font-bold mb-4">99.9%</div>
            <div className="text-xs opacity-80">All systems operational. No major incidents in the last 30 days.</div>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
