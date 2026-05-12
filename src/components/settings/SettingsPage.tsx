import { useState } from 'react';
import { AppLayout } from '../layout/AppLayout';
import { SettingsSidebar } from './SettingsSidebar';
import { Card } from '../ui/Card';
import { User, Shield, Bell, CreditCard, Upload, Save, LogOut, Loader2 } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import { uploadToBlob } from '../../lib/blob';

export function SettingsPage() {
  const { user, updateUser, logout } = useAuth();
  const { success, error: toastError } = useToast();
  const [activeSection, setActiveSection] = useState('profile');
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.name?.split(' ')[0] || 'Alex',
    lastName: user?.name?.split(' ')[1] || 'Mercer',
    email: user?.email || 'alex.mercer@example.com',
    bio: 'Senior software engineer with a focus on cloud-native applications and microservices.'
  });

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateUser({ 
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email
      });
      success('Settings saved successfully!');
    } catch (err) {
      toastError('Failed to save settings.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleUploadPhoto = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        setIsUploading(true);
        try {
          const url = await uploadToBlob(file);
          await updateUser({ avatar: url });
          success('Profile picture updated successfully!');
        } catch (err) {
          console.error(err);
          toastError('Failed to upload photo.');
        } finally {
          setIsUploading(false);
        }
      }
    };
    input.click();
  };

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-margin py-10">
        <header className="mb-10">
          <h1 className="text-h2 font-h2 text-on-surface">Account Settings</h1>
          <p className="text-body-lg text-on-surface-variant">Manage your account preferences and professional identity.</p>
        </header>

        <div className="flex flex-col md:flex-row gap-10">
          <SettingsSidebar activeSection={activeSection} onSectionChange={setActiveSection} />

          <main className="flex-1 max-w-3xl">
            <AnimatePresence mode="wait">
              {activeSection === 'profile' && (
                <motion.div
                  key="profile"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <Card className="p-8">
                    <h3 className="text-h4 font-h4 text-on-surface mb-6 flex items-center gap-2">
                       <User className="w-5 h-5 text-primary" />
                       Profile Picture
                    </h3>
                    <div className="flex flex-col sm:flex-row items-center gap-8">
                      <div className="relative group">
                        <img 
                          src={user?.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"} 
                          alt="Avatar" 
                          className="w-24 h-24 rounded-full object-cover border-2 border-outline-variant"
                        />
                        <button 
                          onClick={handleUploadPhoto}
                          disabled={isUploading}
                          className="absolute inset-0 bg-on-surface/50 opacity-0 group-hover:opacity-100 rounded-full flex items-center justify-center transition-all disabled:opacity-50"
                        >
                          {isUploading ? <Loader2 className="w-6 h-6 text-surface animate-spin" /> : <Upload className="w-6 h-6 text-surface" />}
                        </button>
                      </div>
                      <div className="text-center sm:text-left space-y-4">
                        <p className="text-body-sm text-on-surface-variant">
                          We recommend a professional photo of at least 400x400px. JPG, PNG or GIF.
                        </p>
                        <div className="flex gap-4">
                          <button 
                            onClick={handleUploadPhoto}
                            disabled={isUploading}
                            className="bg-primary text-on-primary px-4 py-2 rounded-xl font-label-md flex items-center gap-2 shadow-sm disabled:opacity-50"
                          >
                            {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                            {isUploading ? 'Uploading...' : 'Upload Photo'}
                          </button>
                          <button className="text-error font-label-md px-4 py-2 rounded-xl border border-error/20 hover:bg-error/5">
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-8">
                    <h3 className="text-h4 font-h4 text-on-surface mb-6">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">First Name</label>
                        <input 
                          className="w-full bg-surface border border-outline-variant rounded-xl p-3 focus:border-primary outline-none transition-all" 
                          value={formData.firstName} 
                          onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Last Name</label>
                        <input 
                          className="w-full bg-surface border border-outline-variant rounded-xl p-3 focus:border-primary outline-none transition-all" 
                          value={formData.lastName} 
                          onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                        />
                      </div>
                      <div className="md:col-span-2 space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Email Address</label>
                        <input 
                          className="w-full bg-surface border border-outline-variant rounded-xl p-3 focus:border-primary outline-none transition-all" 
                          value={formData.email} 
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        />
                      </div>
                      <div className="md:col-span-2 space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Professional Bio</label>
                        <textarea 
                          rows={4} 
                          className="w-full bg-surface border border-outline-variant rounded-xl p-3 focus:border-primary outline-none transition-all resize-none" 
                          value={formData.bio} 
                          onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                        />
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )}

              {activeSection === 'billing' && (
                <motion.div
                  key="billing"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-8"
                >
                  <Card className="p-8">
                    <div className="flex justify-between items-center mb-6">
                       <h3 className="text-h4 font-h4 text-on-surface flex items-center gap-2">
                         <CreditCard className="w-5 h-5 text-primary" />
                         Payment Methods
                       </h3>
                       <button className="text-primary font-semibold text-sm">Add New Card</button>
                    </div>
                    <div className="p-4 border border-outline-variant rounded-xl flex items-center justify-between group hover:border-primary transition-all">
                       <div className="flex items-center gap-4">
                         <div className="w-12 h-8 bg-surface-container-high rounded flex items-center justify-center font-bold text-on-surface-variant">VISA</div>
                         <div>
                           <p className="font-label-md">Visa ending in 4921</p>
                           <p className="text-xs text-on-surface-variant">Expires 12/26</p>
                         </div>
                       </div>
                       <Badge variant="outline">Default</Badge>
                    </div>
                  </Card>
                </motion.div>
              )}

              {activeSection === 'security' && (
                <motion.div
                  key="security"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-8"
                >
                   <Card className="p-8">
                    <h3 className="text-h4 font-h4 text-on-surface mb-6 flex items-center gap-2">
                       <Shield className="w-5 h-5 text-primary" />
                       Security
                    </h3>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Current Password</label>
                        <input type="password" placeholder="••••••••" className="w-full bg-surface border border-outline-variant rounded-xl p-3 focus:border-primary outline-none" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">New Password</label>
                        <input type="password" placeholder="••••••••" className="w-full bg-surface border border-outline-variant rounded-xl p-3 focus:border-primary outline-none" />
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-10 flex flex-col sm:flex-row justify-between items-center gap-4 pt-10 border-t border-outline-variant">
              <button className="flex items-center gap-2 text-error font-label-md hover:bg-error/5 px-4 py-2 rounded-lg transition-all">
                <LogOut className="w-4 h-4" />
                Sign Out from all devices
              </button>
              <div className="flex gap-4 w-full sm:w-auto">
                <button className="flex-1 sm:flex-none px-6 py-2.5 text-on-surface-variant font-label-md">Cancel</button>
                <button 
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex-1 sm:flex-none px-10 py-2.5 bg-primary text-on-primary rounded-xl font-label-md shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSaving ? 'Saving...' : (
                    <>
                      <Save className="w-4 h-4" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </AppLayout>
  );
}
