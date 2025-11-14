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
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const payload = {
        ...formData,
        services: formData.services.split(",").map(item => item.trim())
      };

      const { data } = await axios.post(`${backendUrl}/api/vendors/create`, payload, { withCredentials: true } );

      if (data.success) {
        // Upload profile image if selected
        if (profileImage) {
          await uploadProfileImage(data.vendor.id);
        }

        // Upload portfolio images if selected
        if (portfolioImages.length > 0) {
          await uploadPortfolioImages(data.vendor.id);
        }
        
        toast.success("Vendor profile created successfully!");
        await getAuthState();
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header Card */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-6 text-white shadow-xl mb-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <TicketMinus className="h-8 w-8 text-purple-600" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Complete Your Vendor Profile</h1>
            <p className="text-purple-100 opacity-90">Showcase your services and connect with clients</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorProfileForm;