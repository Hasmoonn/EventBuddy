import React, { useEffect, useContext, useState } from 'react'
import toast from "react-hot-toast"
import Header from "../components/Header"
import { ArrowLeft, Bell, CreditCard, Shield, User } from 'lucide-react';
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';

const Settings = () => {
  const { user, token, backendUrl, navigate } = useContext(AuthContext);

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

  const [notifications, setNotifications] = useState({
    email_bookings: true,
    email_reminders: true,
    sms_notifications: false,
    marketing_emails: false,
  });

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }

    if (user) {
      fetchProfile();
      fetchNotificationSettings();
    }
  }, [user, navigate]);


  const fetchProfile = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/profile/get-profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (data.success) {
        setProfile(data.user);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch profile");
    } finally {
      setLoading(false);
    }
  };

  const fetchNotificationSettings = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/profile/get-notification-settings`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (data.success) {
        setNotifications(data.settings);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch notification settings");
    }
  };

  const updateProfile = async () => {
    if (!user)
      return;

    setUpdating(true);
    try {
      const { data } = await axios.put(`${backendUrl}/api/profile/update-profile`, profile, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (data.success) {
        toast.success("Profile updated successfully");
        setProfile(data.user);

        // Redirect to vendor profile form if user checked "I am a vendor"
        if (profile?.is_vendor) {
          navigate("/vendor/create-vendor");
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setUpdating(false);
    }
  };

  // function to update a specific setting
  const updateNotificationSettings = async (key, value) => {
    try {
      const { data } = await axios.put(`${backendUrl}/api/profile/update-notification-settings`, { [key]: value }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (data.success) {
        setNotifications((prev) => ({ ...prev, [key]: value }));
        toast.success("Notification settings updated!");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update notification settings");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[rgb(var(--background))]">
        <Header />

        <div className="max-w-7xl mx-auto py-8 px-4">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-[rgb(var(--muted))] rounded w-1/4"></div>
            <div className="h-64 bg-[rgb(var(--muted))] rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-[rgb(var(--accent),0.5)] to-[rgba(var(--accent-foreground),0.1)]">
      <Header />

      <div className="mx-auto py-8 pt-16 sm:pt-24 px-4 max-w-5xl">
        <div className="flex gap-4 mb-8">
          <button onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-[rgb(var(--accent))] hover:text-[rgb(var(--accent-foreground))] hover:scale-105 active:scale-95 h-9 px-4 py-2 cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>

          <div>
            <h1 className="text-3xl font-bold text-gradient">Settings</h1>
            <p className="text-[rgb(var(--muted-foreground))]">Manage your account preferences</p>
          </div>
        </div>


        {/* Tab Buttons */}
        <div className='space-y-6'>
          <div className="grid w-full grid-cols-2 sm:grid-cols-4 bg-[rgba(var(--accent-foreground),0.2)] p-1 rounded-md text-[rgb(var(--muted-foreground))]">
            {["profile", "notifications", "privacy", "billing"].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`inline-flex items-center justify-center rounded-sm px-3 py-1.5 text-sm font-medium transition-all cursor-pointer ${activeTab === tab
                  ? "bg-[rgb(var(--background))] text-[rgb(var(--foreground))] shadow-sm"
                  : "text-[rgb(var(--muted-foreground))]" } 
                `}
              >
                {tab === "profile" && <User className="h-4 w-4 mr-1" />}
                {tab === "notifications" && <Bell className="h-4 w-4 mr-1" />}
                {tab === "privacy" && <Shield className="h-4 w-4 mr-1" />}
                {tab === "billing" && <CreditCard className="h-4 w-4 mr-1" />}
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div>
            {activeTab === "profile" && (
              <div className="rounded-lg border bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))] shadow-sm card-elegant">
                <div className='flex flex-col space-y-1.5 p-6'>
                  <div className='text-2xl font-semibold leading-none tracking-tight'>Profile Information</div>
                  <div className='text-sm text-[rgb(var(--muted-foreground))]'>
                    Update your personal information and preferences
                  </div>
                </div>
                <div className="p-6 pt-0 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium leading-none" htmlFor="full_name">Full Name</label>

                      <input className='flex h-10 w-full rounded-md border border-[rgb(var(--input))] bg-[rgb(var(--background))] px-3 py-2 text-base ring-offset-[rgb(var(--background))] placeholder:text-[rgb(var(--muted-foreground))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--ring))] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm'
                        id="full_name"
                        value={profile?.name || ""}
                        onChange={(e) => setProfile(prev => prev ? { ...prev, name: e.target.value } : null)}
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium leading-none" htmlFor="phone">Phone Number</label>
                      <input className='flex h-10 w-full rounded-md border border-[rgb(var(--input))] bg-[rgb(var(--background))] px-3 py-2 text-base ring-offset-[rgb(var(--background))] placeholder:text-[rgb(var(--muted-foreground))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--ring))] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm'
                        id="phone"
                        value={profile?.phone || ""}
                        onChange={(e) => setProfile(prev => prev ? { ...prev, phone: e.target.value } : null)}
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium leading-none" htmlFor="location">Location</label>
                    <input className='flex h-10 w-full rounded-md border border-[rgb(var(--input))] bg-[rgb(var(--background))] px-3 py-2 text-base ring-offset-[rgb(var(--background))] placeholder:text-[rgb(var(--muted-foreground))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--ring))] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm'
                      id="location"
                      value={profile?.location || ""}
                      onChange={(e) => setProfile(prev => prev ? { ...prev, location: e.target.value } : null)}
                      placeholder="Enter your location"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium leading-none" htmlFor="bio">Bio</label>

                    <textarea className='flex w-full rounded-md border border-[rgb(var(--input))] bg-[rgb(var(--background))] px-3 py-2 text-base ring-offset-[rgb(var(--background))] placeholder:text-[rgb(var(--muted-foreground))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--ring))] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm'
                      id="bio"
                      value={profile?.bio || ""}
                      onChange={(e) => setProfile(prev => prev ? { ...prev, bio: e.target.value } : null)}
                      placeholder="Tell us about yourself"
                      rows={4}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <input type='checkbox'
                      id="is_vendor"
                      checked={profile?.is_vendor || false}
                      onChange={(e) => setProfile(prev => prev ? { ...prev, is_vendor: e.target.checked } : null)}
                    />
                    <label className="text-sm font-medium leading-none" htmlFor="is_vendor">I am a vendor</label>
                  </div>

                  <button
                    onClick={() => updateProfile(profile || {})}
                    disabled={updating}
                    className="inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition-all duration-300 bg-gradient-to-r from-[rgb(var(--primary))] to-[rgb(var(--primary-glow))] text-[rgb(var(--primary-foreground))] hover:shadow-[rgb(var(--shadow-glow))] hover:scale-105 active:scale-95 h-11 px-6 py-3 btn-hero"
                  >
                    {updating ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </div>
            )}


            {activeTab === "notifications" && (
              <div className="rounded-lg border bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))] shadow-sm card-elegant">
                <div className='flex flex-col space-y-1.5 p-6'>
                  <div className='text-2xl font-semibold leading-none tracking-tight'>Notification Preferences</div>
                  <div className='text-sm text-[rgb(var(--muted-foreground))]'>
                    Choose how you want to be notified about events and bookings
                  </div>
                </div>
                <div className="p-6 pt-0 space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <label className="text-sm font-medium leading-none">Booking Notifications</label>
                        <p className="text-sm text-[rgb(var(--muted-foreground))]">
                          Get notified when you receive new booking requests
                        </p>
                      </div>
                      <input type='checkbox'
                        checked={notifications.email_bookings}
                        onChange={(e) => updateNotificationSettings('email_bookings', e.target.checked)}
                      />
                    </div>

                    <hr />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <label className="text-sm font-medium leading-none">Event Reminders</label>
                        <p className="text-sm text-[rgb(var(--muted-foreground))]">
                          Receive reminders about upcoming events
                        </p>
                      </div>
                      <input type='checkbox'
                        checked={notifications.email_reminders}
                        onChange={(e) => updateNotificationSettings('email_reminders', e.target.checked)}
                      />
                    </div>

                    <hr />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <label className="text-sm font-medium leading-none">SMS Notifications</label>
                        <p className="text-sm text-[rgb(var(--muted-foreground))]">
                          Get important updates via text message
                        </p>
                      </div>
                      <input type='checkbox'
                        checked={notifications.sms_notifications}
                        onChange={(e) => updateNotificationSettings('sms_notifications', e.target.checked)}
                      />
                    </div>

                    <hr />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <label className="text-sm font-medium leading-none">Marketing Emails</label>
                        <p className="text-sm text-[rgb(var(--muted-foreground))]">
                          Receive tips, news, and promotional content
                        </p>
                      </div>
                      <input type='checkbox'
                        checked={notifications.marketing_emails}
                        onChange={(e) => updateNotificationSettings('marketing_emails', e.target.checked)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}


            {activeTab === "privacy" && (
              <div className="rounded-lg border bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))] shadow-sm card-elegant">
                <div className='flex flex-col space-y-1.5 p-6'>
                  <div className='text-2xl font-semibold leading-none tracking-tight'>Privacy Settings</div>
                  <div className='text-sm text-[rgb(var(--muted-foreground))]'>
                    Control your privacy and data sharing preferences
                  </div>
                </div>
                <div className="p-6 pt-0 space-y-6">
                  <div className="space-y-4">
                    <div className="p-4 border border-[rgb(var(--border))] rounded-lg">
                      <h3 className="font-semibold mb-2">Profile Visibility</h3>
                      <p className="text-sm text-[rgb(var(--muted-foreground))] mb-4">
                        Your profile is currently visible to other users and vendors.
                      </p>

                      <button onClick={() => toast("Profile visibility settings will be available soon.")} className="inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition-all duration-300 border-2 border-[rgb(var(--primary))] text-[rgb(var(--primary))] bg-transparent hover:bg-[rgb(var(--primary))] hover:text-[rgb(var(--primary-foreground))] hover:shadow-[rgb(var(--shadow-soft))] hover:scale-105 active:scale-95 h-11 px-6 py-3">
                        Manage Visibility
                      </button>
                    </div>

                    <div className="p-4 border border-[rgb(var(--border))] rounded-lg">
                      <h3 className="font-semibold mb-2">Data Export</h3>
                      <p className="text-sm text-[rgb(var(--muted-foreground))] mb-4">
                        Download a copy of your data including events, bookings, and messages.
                      </p>
                      
                      <button className="inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition-all duration-300 border-2 border-[rgb(var(--primary))] text-[rgb(var(--primary))] bg-transparent hover:bg-[rgb(var(--primary))] hover:text-[rgb(var(--primary-foreground))] hover:shadow-[rgb(var(--shadow-soft))] hover:scale-105 active:scale-95 h-11 px-6 py-3" onClick={() => toast("Your data export will be ready shortly.")}>Export Data</button>
                    </div>

                    <div className="p-4 border border-[rgb(var(--destructive))] rounded-lg">
                      <h3 className="font-semibold mb-2 text-[rgb(var(--destructive))]">Delete Account</h3>
                      <p className="text-sm text-[rgb(var(--muted-foreground))] mb-4">
                        Permanently delete your account and all associated data. This action cannot be undone.
                      </p>

                      <button className="inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition-all duration-300 bg-[rgb(var(--destructive))] text-[rgb(var(--destructive-foreground))] hover:bg-[rgba(var(--destructive),0.9)] hover:scale-105 active:scale-95 h-11 px-6 py-3" onClick={() => toast("Please contact support to delete your account.")}>Delete Account</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "billing" && (
              <div className="rounded-lg border bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))] shadow-sm card-elegant">
                <div className='flex flex-col space-y-1.5 p-6'>
                  <div className='text-2xl font-semibold leading-none tracking-tight'>Billing & Payments</div>
                  <div className='text-sm text-[rgb(var(--muted-foreground))]'>
                    Manage your payment methods and billing information
                  </div>
                </div>
                <div className="p-6 pt-0 space-y-6">
                  <div className="space-y-4">
                    <div className="p-4 border border-[rgb(var(--border))] rounded-lg">
                      <h3 className="font-semibold mb-2">Payment Methods</h3>
                      <p className="text-sm text-[rgb(var(--muted-foreground))] mb-4">
                        No payment methods added yet.
                      </p>
                      <button className="inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition-all duration-300 bg-gradient-to-r from-[rgb(var(--primary))] to-[rgb(var(--primary-glow))] text-[rgb(var(--primary-foreground))] hover:shadow-[rgb(var(--shadow-glow))] hover:scale-105 active:scale-95 h-11 px-6 py-3 btn-hero" onClick={() => toast("Payment integration coming soon.")}>Add Payment Method</button>
                    </div>

                    <div className="p-4 border border-[rgb(var(--border))] rounded-lg">
                      <h3 className="font-semibold mb-2">Billing History</h3>
                      <p className="text-sm text-[rgb(var(--muted-foreground))] mb-4">
                        View your past transactions and download receipts.
                      </p>
                      <button className="inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition-all duration-300 border-2 border-[rgb(var(--primary))] text-[rgb(var(--primary))] bg-transparent hover:bg-[rgb(var(--primary))] hover:text-[rgb(var(--primary-foreground))] hover:shadow-[rgb(var(--shadow-soft))] hover:scale-105 active:scale-95 h-11 px-6 py-3" onClick={() => toast("No transactions yet!") }>View History</button>
                    </div>

                    <div className="p-4 border border-[rgb(var(--border))] rounded-lg">
                      <h3 className="font-semibold mb-2">Subscription</h3>
                      <p className="text-sm text-[rgb(var(--muted-foreground))] mb-4">
                        Currently on the free plan. Upgrade for more features.
                      </p>

                      <button className="inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition-all duration-300 bg-gradient-to-r from-[rgb(var(--primary))] to-[rgb(var(--primary-glow))] text-[rgb(var(--primary-foreground))] hover:shadow-[rgb(var(--shadow-glow))] hover:scale-105 active:scale-95 h-11 px-6 py-3 btn-hero" onClick={() => toast("Premium features coming soon!")}>Upgrade Plan</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default Settings