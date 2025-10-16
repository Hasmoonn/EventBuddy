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
        </div>
      </div>
    </div>
  )
}

export default Profile