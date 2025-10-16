import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ArrowLeft, Settings, Shield, User } from 'lucide-react';

const Profile = () => {
  const [user, setUser] = useState(true);
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user)
      return;

    setLoading(true)

    try {
      const data = {
        id: "1",
        user_id: "U001",
        full_name: "Aarav Kumar",
        phone: "+91 9876543210",
        avatar_url: "https://randomuser.me/api/portraits/men/32.jpg",
        bio: "Passionate event planner with 5+ years of experience in weddings and corporate events.",
        location: "Bangalore, India",
        is_vendor: true
      }

      if (data) {
        setProfile(data);
      } else {
        // Create a new profile
        const newProfile = {
          id: "",
          user_id: user.id,
          full_name: user.user_metadata?.full_name || "",
          phone: "",
          avatar_url: "",
          bio: "",
          location: "",
          is_vendor: false
        };
        setProfile(newProfile);
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!user || !profile)
      return;

    setSaving(true);

    try {
      // const { error } = await supabase
      //   .from("profiles")
      //   .upsert({
      //     user_id: user.id,
      //     full_name: profile.full_name,
      //     phone: profile.phone,
      //     avatar_url: profile.avatar_url,
      //     bio: profile.bio,
      //     location: profile.location,
      //     is_vendor: profile.is_vendor
      //   });

      // if (error) throw error;

      // toast({
      //   title: "Profile updated",
      //   description: "Your profile has been successfully updated.",
      // });
    } catch (error) {
      toast.error(error.message)
    } finally {
      setSaving(false);
    }
  };

  const updateProfile = (name, value) => {
    if (!profile)
      return;

    setProfile({ ...profile, [name]: value });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[rgb(var(--background))] to-[rgba(var(--accent),0.2)] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[rgb(var(--primary))] mx-auto mb-4"></div>
          <p className="text-[rgb(var(--muted-foreground))]">
            Loading profile...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[rgb(var(--background))] to-[rgba(var(--accent),0.3)]">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-6">
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-300 h-11 px-6 py-3 cursor-pointer hover:bg-[rgb(var(--accent))] hover:text-[rgb(var(--accent-foreground))] hover:scale-105 active:scale-95 mb-4" onClick={() => navigate("/dashboard")} >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </button>
          <h1 className="text-4xl font-bold text-gradient mb-2">
            Profile Settings
          </h1>
          <p className="text-[rgb(var(--muted-foreground))]">
            Manage your account information and preferences
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid w-full grid-cols-3 bg-[rgba(var(--accent-foreground),0.2)] p-1 rounded-md text-[rgb(var(--muted-foreground))] mb-6">
            {
              ["profile", "account", "vendor"].map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)} className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all cursor-pointer ${activeTab === tab ? "bg-[rgb(var(--background))] text-[rgb(var(--foreground))] shadow-sm" : "text-[rgb(var(--muted-foreground))]"}`} >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))
            }
          </div>

          {activeTab === "profile" && (
            <div className="rounded-lg border bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))] shadow-sm card-elegant">
              <div className='flex flex-col space-y-1.5 p-6'>
                <div className="text-2xl font-semibold leading-none tracking-tight flex items-center gap-2">
                  <User className="h-5 w-5 text-[rgb(var(--primary))]" />
                  Personal Information
                </div>
                <div className='text-sm text-[rgb(var(--muted-foreground))]'>
                  Update your personal details and contact information.
                </div>
              </div>
              <div className="p-6 pt-0 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className='text-sm font-medium leading-none ' htmlFor="full_name">Full Name</label>

                    <input className="flex w-full h-10 rounded-md border border-[rgb(var(--input))] bg-[rgb(var(--background))] px-3 py-2 text-sm ring-offset-background placeholder:text-[rgb(var(--muted-foreground))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--ring))] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      id="full_name"
                      value={profile?.full_name || ""}
                      onChange={(e) => updateProfile("full_name", e.target.value)}
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className='text-sm font-medium leading-none ' htmlFor="phone">Phone Number</label>
                    <input className="flex h-10 w-full rounded-md border border-[rgb(var(--input))] bg-[rgb(var(--background))] px-3 py-2 text-sm ring-offset-background placeholder:text-[rgb(var(--muted-foreground))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--ring))] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" id="phone" value={profile?.phone || ""} onChange={(e) => updateProfile("phone", e.target.value)} placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className='text-sm font-medium leading-none' htmlFor="location">Location</label>
                  <input className="flex h-10 w-full rounded-md border border-[rgb(var(--input))] bg-[rgb(var(--background))] px-3 py-2 text-sm ring-offset-background placeholder:text-[rgb(var(--muted-foreground))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--ring))] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    id="location"
                    value={profile?.location || ""}
                    onChange={(e) => updateProfile("location", e.target.value)}
                    placeholder="Enter your location"
                  />
                </div>

                <div className="space-y-2">
                  <label className='text-sm font-medium leading-none ' htmlFor="bio">Bio</label>
                  <textarea className="flex w-full rounded-md border border-[rgb(var(--input))] bg-[rgb(var(--background))] px-3 py-2 text-sm ring-offset-background placeholder:text-[rgb(var(--muted-foreground))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--ring))] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    id="bio"
                    value={profile?.bio || ""}
                    onChange={(e) => updateProfile("bio", e.target.value)}
                    placeholder="Tell us about yourself..."
                    rows={4}
                  />
                </div>

                <button className="inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-300 h-11 px-6 py-3 cursor-pointer border-2 border-[rgb(var(--primary))] text-[rgb(var(--primary))] bg-transparent hover:bg-[rgb(var(--primary))] hover:text-[rgb(var(--primary-foreground))] hover:shadow-[rgb(var(--shadow-soft))] hover:scale-105 active:scale-95" onClick={handleSave} disabled={saving} >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          )

          }
          {activeTab === "account" && (
            <div className="rounded-lg border bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))] shadow-sm card-elegant">
              <div className='flex flex-col space-y-1.5 p-6'>
                <div className="text-2xl font-semibold leading-none tracking-tight flex items-center gap-2">
                  <Shield className="h-5 w-5 text-[rgb(var(--primary))]" />
                  Account Settings
                </div>
                <div className='text-sm text-[rgb(var(--muted-foreground))]'>
                  Manage your account security and email preferences.
                </div>
              </div>
              <div className="p-6 pt-0 space-y-6">
                <div className="space-y-2">
                  <label className='text-sm font-medium leading-none'>Email Address</label>

                  <input className="flex h-10 w-full rounded-md border border-[rgb(var(--input))] bg-[rgb(var(--muted))] px-3 py-2 text-sm ring-offset-background placeholder:text-[rgb(var(--muted-foreground))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--ring))] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={user?.email || ""}
                    disabled
                  />

                  <p className="text-sm text-muted-foreground">
                    Contact support to change your email address.
                  </p>
                </div>

                <div className="space-y-2">
                  <label className='text-sm font-medium leading-none'>Account Created</label>
                  <input className="flex h-10 w-full rounded-md border border-[rgb(var(--input))] bg-[rgb(var(--muted))] px-3 py-2 text-sm ring-offset-background placeholder:text-[rgb(var(--muted-foreground))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--ring))] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={user?.created_at ? new Date(user.created_at).toLocaleDateString() : ""}
                    disabled
                  />
                </div>
              </div>
            </div>
          )
          }

          {activeTab === "vendor" && (
            <div className="rounded-lg border bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))] shadow-sm card-elegant">
              <div className='flex flex-col space-y-1.5 p-6'>
                <div className="text-2xl font-semibold leading-none tracking-tight flex items-center gap-2">
                  <Settings className="h-5 w-5 text-[rgb(var(--primary))]" />
                  Vendor Settings
                </div>
                <div className='text-sm text-[rgb(var(--muted-foreground))]'>
                  Configure your vendor account to offer services on EventBuddy.
                </div>
              </div>
              <div className="p-6 pt-0 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className='text-base font-medium leading-none' >Enable Vendor Account</label>
                    <p className="text-sm text-[rgb(var(--muted-foreground))]">
                      Allow others to book your services for their events.
                    </p>
                  </div>
                  <input type='checkbox'
                    checked={profile?.is_vendor || false}
                    onCheckedChange={(checked) => updateProfile("is_vendor", checked)}
                  />
                </div>

                {profile?.is_vendor && (
                  <div className="p-4 bg-[rgba(var(--primary),0.1)] rounded-lg border border-[rgba(var(--primary),0.2)]">
                    <p className="text-sm text-[rgb(var(--primary))]">
                      <strong>Vendor account enabled!</strong> You can now create your vendor profile
                      and start receiving bookings from the Vendors page.
                    </p>

                    <button className="inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-300 h-11 px-6 py-3 cursor-pointer border-2 border-[rgb(var(--primary))] text-[rgb(var(--primary))] bg-transparent hover:bg-[rgb(var(--primary))] hover:text-[rgb(var(--primary-foreground))] hover:shadow-[rgb(var(--shadow-soft))] hover:scale-105 active:scale-95 mt-2"
                      onClick={() => navigate("/vendors")}
                    >
                      Manage Vendor Profile
                    </button>
                  </div>
                )}

                <button className="inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-300 h-11 px-6 py-3 cursor-pointer bg-gradient-to-r from-[rgb(var(--primary))] to-[rgb(var(--primary-glow))] text-[rgb(var(--primary-foreground))] hover:shadow-[rgb(var(--shadow-glow))] hover:scale-105 active:scale-95" onClick={handleSave} disabled={saving}>
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          )
          }

        </div>
      </div>
    </div>
  )
}

export default Profile