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
    <div>Profile</div>
  )
}

export default Profile