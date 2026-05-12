import { useState } from 'react';
import { AppLayout } from '../layout/AppLayout';
import { NotificationCard, NotificationType } from './NotificationCard';
import { FilterChips } from '../shared/FilterChips';
import { CheckCheck, Settings } from 'lucide-react';

const MOCK_NOTIFICATIONS = [
  {
    id: '1',
    type: 'job' as NotificationType,
    title: 'New plumbing job near you',
    message: 'A client in Lagos just posted a high-value plumbing repair job that matches your expertise.',
    time: '2m ago',
    unread: true,
  },
  {
    id: '2',
    type: 'message' as NotificationType,
    title: 'Sarah Jenkins sent a message',
    message: '"Can we schedule a quick call tomorrow to discuss the wireframes for the new project?"',
    time: '45m ago',
    unread: true,
  },
  {
    id: '3',
    type: 'payment' as NotificationType,
    title: 'Payment processed successfully',
    message: 'Your withdrawal for $1,250.00 has been deposited into your account ending in ...4921.',
    time: '3h ago',
    unread: false,
  },
  {
    id: '4',
    type: 'system' as NotificationType,
    title: 'Portfolio published successfully',
    message: 'Your professional portfolio is now live and visible to potential clients worldwide.',
    time: 'Yesterday',
    unread: false,
  }
];

export function NotificationsPage() {
  const [filter, setFilter] = useState('All');
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'All') return true;
    return n.type.toLowerCase().includes(filter.toLowerCase().slice(0, -1));
  });

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto px-margin py-8 md:py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
          <div>
            <h1 className="text-h2 font-h2 text-on-surface mb-2">Notifications</h1>
            <p className="text-body-lg text-on-surface-variant">Stay updated on your activity and opportunities.</p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={markAllAsRead}
              className="flex items-center gap-2 text-primary font-label-md text-sm hover:underline"
            >
              <CheckCheck className="w-4 h-4" />
              Mark all as read
            </button>
            <button className="p-2 bg-surface-container-high rounded-full hover:bg-surface-variant transition-all">
              <Settings className="w-5 h-5 text-on-surface" />
            </button>
          </div>
        </div>

        <FilterChips 
          options={['All', 'Jobs', 'Messages', 'Payments', 'System']}
          selectedOption={filter}
          onSelect={setFilter}
          className="mb-8"
        />

        <div className="space-y-4">
          {filteredNotifications.map((n) => (
            <NotificationCard key={n.id} {...n} />
          ))}
          
          {filteredNotifications.length === 0 && (
            <div className="py-20 text-center bg-surface-container-low rounded-2xl border border-dashed border-outline-variant">
              <p className="text-on-surface-variant">No notifications to show.</p>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
