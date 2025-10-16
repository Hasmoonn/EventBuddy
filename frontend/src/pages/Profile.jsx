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
  return (
    <div>Profile</div>
  )
}

export default Profile