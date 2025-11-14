import React, { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";
import { TicketMinus, Upload, X } from "lucide-react";

const VendorProfileForm = () => {
  const { backendUrl, user, navigate, getAuthState } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    business_name: "",
    category: "decoration",
    description: "",
    location: "",
    price_range_min: "",
    price_range_max: "",
    contact_email: user?.email || "",
    contact_phone: "",
    services: "",
    image: "",
    portfolio_images: []
  });

  const [profileImage, setProfileImage] = useState(null);
  const [portfolioImages, setPortfolioImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState("");

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h1>Vendor Profile Form</h1>
      </div>
    </div>
  );
};

export default VendorProfileForm;