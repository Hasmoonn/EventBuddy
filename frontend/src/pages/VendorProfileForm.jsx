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

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Business Name */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Business Name <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  name="business_name" 
                  onChange={handleChange} 
                  value={formData.business_name} 
                  required 
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 outline-none"
                  placeholder="Enter your business name"
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Category
                </label>
                <select 
                  name="category" 
                  onChange={handleChange} 
                  value={formData.category} 
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 outline-none appearance-none bg-white"
                >
                  <option value="decoration">🎨 Decoration</option>
                  <option value="catering">🍽️ Catering</option>
                  <option value="entertainment">🎭 Entertainment</option>
                  <option value="photography">📸 Photography</option>
                  <option value="other">✨ Other</option>
                </select>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <textarea 
                  name="description" 
                  onChange={handleChange} 
                  value={formData.description} 
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 outline-none resize-none"
                  placeholder="Tell us about your services and expertise..."
                />
              </div>

              {/* Location */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Location
                </label>
                <input 
                  name="location" 
                  type="text" 
                  onChange={handleChange} 
                  value={formData.location} 
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 outline-none"
                  placeholder="Where are you located?"
                />
              </div>

              {/* Price Range */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Price Range
                </label>
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <input 
                      name="price_range_min" 
                      type="number" 
                      onChange={handleChange} 
                      value={formData.price_range_min} 
                      placeholder="Min Price (Lkr)" 
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 outline-none"
                    />
                  </div>
                  <div className="flex items-center justify-center text-gray-400">
                    <span className="text-sm">to</span>
                  </div>
                  <div className="flex-1">
                    <input 
                      name="price_range_max" 
                      type="number" 
                      onChange={handleChange} 
                      value={formData.price_range_max} 
                      placeholder="Max Price (Lkr)" 
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Contact Email
                  </label>
                  <input 
                    name="contact_email" 
                    type="email" 
                    onChange={handleChange} 
                    value={formData.contact_email} 
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 outline-none"
                    placeholder="business@email.com"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Contact Phone
                  </label>
                  <input 
                    name="contact_phone" 
                    type="text" 
                    onChange={handleChange} 
                    value={formData.contact_phone} 
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 outline-none"
                    placeholder="Your contact number"
                  />
                </div>
              </div>

              {/* Profile Image */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Profile Image
                </label>
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleProfileImageChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 outline-none"
                    />
                  </div>
                  {imagePreview  && (
                    <div className="w-16 h-16 rounded-lg overflow-hidden border border-gray-300">
                      <img 
                        src={imagePreview} 
                        alt="Profile preview" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-500">Upload a professional profile picture for your business</p>
              </div>
              

              {/* Services */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Services <span className="text-purple-600 text-xs font-normal">(comma separated)</span>
                </label>
                <input 
                  name="services" 
                  type="text" 
                  onChange={handleChange} 
                  value={formData.services} 
                  placeholder="e.g. buffet, lighting, live music, floral arrangements" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 outline-none"
                />
              </div>

              {/* Portfolio Images */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Portfolio Images
                </label>
                <div className="space-y-4">
                  <input 
                    type="file" 
                    multiple
                    accept="image/*"
                    onChange={handlePortfolioImagesChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 outline-none"
                  />
                  <p className="text-sm text-gray-500 mt-1">Select multiple images to showcase your work</p>
                </div>
                
                {/* Portfolio Images List */}
                {portfolioImages.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600 font-medium">Selected portfolio images:</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {portfolioImages.map((file, index) => (
                          <div key={index} className="relative group">
                            <img 
                              src={URL.createObjectURL(file)} 
                              alt={`Portfolio ${index + 1}`}
                              className="w-full h-24 object-cover rounded-lg border border-gray-300"
                            />
                            <button
                              type="button"
                              onClick={() => removePortfolioImage(index)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:transform-none disabled:hover:shadow-lg cursor-pointer"
              >
                {isSubmitting ? (
                  <div className="flex justify-center">
                    Creating Profile...
                  </div>
                ) : (
                  "Save Profile & Get Started"
                )}
              </button>
            </form>
          </div>
          
          {/* Footer Note */}
          <div className="bg-purple-50 border-t border-purple-100 px-8 py-4">
            <p className="text-center text-sm text-purple-600">
              Your profile will be visible to clients looking for your services
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorProfileForm;
