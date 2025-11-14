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

  const handlePortfolioImagesChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setPortfolioImages(prev => [...prev, ...files]);
    }
  };

  const removePortfolioImage = (index) => {
    setPortfolioImages(prev => prev.filter((_, i) => i !== index));
  };

  const uploadProfileImage = async (vendorId) => {
    if (!profileImage) 
      return null;

    const formData = new FormData();
    formData.append('image', profileImage);

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/vendors/upload-image`,
        formData,
        { 
          withCredentials: true,
          headers: { 'Content-Type': 'multipart/form-data' }
        }
      );
      return data.data.image;
    } catch (error) {
      console.error("Profile image upload failed:", error);
      return null;
    }
  };

  const uploadPortfolioImages = async (vendorId) => {
    if (portfolioImages.length === 0) 
      return;

    const formData = new FormData();
    portfolioImages.forEach(file => {
      formData.append('portfolio', file);
    });

    try {
      await axios.post(
        `${backendUrl}/api/vendors/upload-portfolio`,
        formData,
        { 
          withCredentials: true,
          headers: { 'Content-Type': 'multipart/form-data' }
        }
      );
    } catch (error) {
      console.error("Portfolio images upload failed:", error);
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