import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import axios from 'axios';
import jsPDF from 'jspdf';
import { useNavigate } from 'react-router-dom';
import { BarChart3, Building, Calendar, DollarSign, Search, Shield, Star, TrendingUp, Users, LogIn, LogOut } from 'lucide-react'
import { AuthContext } from '../contexts/AuthContext';

const AdminPanel = () => {

  const {user, setUser, backendUrl} = useContext(AuthContext)
  const navigate = useNavigate()

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalVendors: 0,
    totalEvents: 0,
    totalRevenue: 0,
    recentBookings: 0,
    activeEvents: 0,
    totalUsersGrowth: 0,
    totalVendorsGrowth: 0,
    totalEventsGrowth: 0,
    totalRevenueGrowth: 0
  });

  const [analytics, setAnalytics] = useState({
    userGrowthRate: 0,
    vendorConversionRate: 0,
    averageEventValue: 0,
    customerSatisfaction: 0,
    popularEventTypes: []
  });

  const [users, setUsers] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false)

  const [activeTab, setActiveTab] = useState("users");

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const adminToken = localStorage.getItem('adminToken');
      if (!adminToken) {
        toast.error('Admin authentication required');
        return;
      }

      const [statsRes, usersRes, vendorsRes, analyticsRes] = await Promise.all([
        axios.get(`${backendUrl}/api/admin/stats`, { headers: { token: adminToken } }),
        axios.get(`${backendUrl}/api/admin/users`, { headers: { token: adminToken } }),
        axios.get(`${backendUrl}/api/admin/vendors`, { headers: { token: adminToken } }),
        axios.get(`${backendUrl}/api/admin/analytics`, { headers: { token: adminToken } })
      ]);

      if (statsRes.data.success) {
        setStats(statsRes.data.stats);
      }

      if (usersRes.data.success) {
        setUsers(usersRes.data.users);
      }

      if (vendorsRes.data.success) {
        setVendors(vendorsRes.data.vendors);
      }

      if (analyticsRes.data.success) {
        setAnalytics(analyticsRes.data.analytics);
      }

    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleUserStatus = async (userId) => {
    try {
      const adminToken = localStorage.getItem('adminToken');
      if (!adminToken) {
        toast.error('Admin authentication required');
        return;
      }

      const response = await axios.post(`${backendUrl}/api/admin/toggle-user-status`, { userId }, {
        headers: { token: adminToken }
      });

      if (response.data.success) {
        toast.success(response.data.message);
        // Refresh users list
        fetchDashboardData();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const toggleVendorVerification = async (vendorId) => {
    try {
      const adminToken = localStorage.getItem('adminToken');
      if (!adminToken) {
        toast.error('Admin authentication required');
        return;
      }

      const response = await axios.post(`${backendUrl}/api/admin/toggle-vendor-verification`, { vendorId }, {
        headers: { token: adminToken }
      });

      if (response.data.success) {
        toast.success(response.data.message);
        // Refresh vendors list
        fetchDashboardData();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const generateRevenueReport = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text('Revenue Report', 20, 20);
    doc.setFontSize(12);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 35);
    doc.text(`Total Revenue: $${stats.totalRevenue.toLocaleString()}`, 20, 50);
    doc.text(`Total Events: ${stats.totalEvents.toLocaleString()}`, 20, 65);
    doc.text(`Recent Bookings: ${stats.recentBookings.toLocaleString()}`, 20, 80);
    doc.text(`Active Events: ${stats.activeEvents.toLocaleString()}`, 20, 95);
    doc.text(`Revenue Growth: +${stats.totalRevenueGrowth}% from last month`, 20, 110);
    doc.save('revenue-report.pdf');
    toast.success('Revenue report downloaded');
  };

  const generateUserActivityReport = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text('User Activity Report', 20, 20);
    doc.setFontSize(12);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 35);
    doc.text(`Total Users: ${stats.totalUsers.toLocaleString()}`, 20, 50);
    doc.text(`Total Vendors: ${stats.totalVendors.toLocaleString()}`, 20, 65);
    doc.text(`User Growth: +${stats.totalUsersGrowth}% from last month`, 20, 80);
    doc.text(`Vendor Growth: +${stats.totalVendorsGrowth}% from last month`, 20, 95);
    doc.text('User List:', 20, 110);
    let y = 125;
    users.slice(0, 20).forEach((user, index) => {
      doc.text(`${index + 1}. ${user.name} - ${user.email} (${user.is_vendor ? 'Vendor' : 'User'})`, 20, y);
      y += 10;
    });
    doc.save('user-activity-report.pdf');
    toast.success('User activity report downloaded');
  };

  const generateVendorPerformanceReport = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text('Vendor Performance Report', 20, 20);
    doc.setFontSize(12);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 35);
    doc.text(`Total Vendors: ${stats.totalVendors.toLocaleString()}`, 20, 50);
    doc.text(`Vendor Growth: +${stats.totalVendorsGrowth}% from last month`, 20, 65);
    doc.text('Vendor List:', 20, 80);
    let y = 95;
    vendors.slice(0, 20).forEach((vendor, index) => {
      doc.text(`${index + 1}. ${vendor.business_name} - ${vendor.category} (Rating: ${vendor.rating || 0}, Reviews: ${vendor.total_reviews || 0}, Verified: ${vendor.verified ? 'Yes' : 'No'})`, 20, y);
      y += 10;
    });
    doc.save('vendor-performance-report.pdf');
    toast.success('Vendor performance report downloaded');
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    setUser(null);
    toast.success('Logged out successfully');
    navigate('/auth');
  };

  const filteredUsers = users.filter(user =>
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user._id?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredVendors = vendors.filter(vendor => 
    vendor.business_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <div className='py-16 pt-12 bg-gradient-to-br from-[rgb(var(--background))] to-[rgba(var(--accent),0.4)] min-h-screen'>
      <div className="container-elegant">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gradient">
              Admin Panel
            </h1>
            <p className="text-[rgb(var(--muted-foreground))]">
              Manage platform operations and monitor performance
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-all border-transparent hover:bg-[rgba(var(--primary),0.3)] bg-[rgba(var(--primary),0.2)] text-[rgb(var(--primary))]">
              <Shield className="h-3 w-3 mr-1" />
              Administrator
            </div>
            <button onClick={logout} className='inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-300 border-2 border-[rgb(var(--primary))] text-[rgb(var(--primary))] bg-transparent hover:bg-[rgb(var(--primary))] hover:text-[rgb(var(--primary-foreground))] hover:shadow-[rgb(var(--shadow-soft))] hover:scale-105 active:scale-95 h-9 px-4 cursor-pointer'>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </button>
          </div>
        </div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className='rounded-lg border bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))] shadow-sm'>
            <div className="flex flex-row items-center justify-between space-y-0 pb-2 p-6">
              <div className="leading-none tracking-tight text-sm font-medium">Total Users</div>
              <Users className="h-4 w-4 text-[rgb(var(--muted-foreground))]" />
            </div>
            <div className='p-6 pt-0'>
              <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
              <div className="flex items-center text-xs text-[rgb(var(--muted-foreground))]">
                <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                +{stats.totalUsersGrowth}% from last month
              </div>
            </div>
          </div>

          <div className='rounded-lg border bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))] shadow-sm'>
            <div className="flex flex-row items-center justify-between space-y-0 pb-2 p-6">
              <div className="leading-none tracking-tight text-sm font-medium">Total Vendors</div>
              <Building className="h-4 w-4 text-[rgb(var(--muted-foreground))]" />
            </div>
            <div className='p-6 pt-0'>
              <div className="text-2xl font-bold">{stats.totalVendors.toLocaleString()}</div>
              <div className="flex items-center text-xs text-[rgb(var(--muted-foreground))]">
                <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                +{stats.totalVendorsGrowth}% from last month
              </div>
            </div>
          </div>

          <div className='rounded-lg border bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))] shadow-sm'>
            <div className="flex flex-row items-center justify-between space-y-0 pb-2 p-6">
              <div className="leading-none tracking-tight text-sm font-medium">Total Events</div>
              <Calendar className="h-4 w-4 text-[rgb(var(--muted-foreground))]" />
            </div>
            <div className='p-6 pt-0'>
              <div className="text-2xl font-bold">{stats.totalEvents.toLocaleString()}</div>
              <div className="flex items-center text-xs text-[rgb(var(--muted-foreground))]">
                <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                +{stats.totalEventsGrowth}% from last month
              </div>
            </div>
          </div>

          <div className='rounded-lg border bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))] shadow-sm'>
            <div className="flex flex-row items-center justify-between space-y-0 pb-2 p-6">
              <div className="leading-none tracking-tight text-sm font-medium">Platform Revenue</div>
              <DollarSign className="h-4 w-4 text-[rgb(var(--muted-foreground))]" />
            </div>
            <div className='p-6 pt-0'>
              <div className="text-2xl font-bold">LKR {stats.totalRevenue.toLocaleString()}</div>
              <div className="flex items-center text-xs text-[rgb(var(--muted-foreground))]">
                <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                +{stats.totalRevenueGrowth}% from last month
              </div>
            </div>
          </div>
        </div>


        <div className="space-y-6">
          {/* Tab List */}
          <div className="rounded-md bg-[rgba(var(--accent-foreground),0.2)] p-1 text-[rgb(var(--muted-foreground))] w-full grid grid-cols-4">
            {["users", "vendors", "analytics", "reports"].map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)}  className={`inline-flex items-center justify-center rounded-sm px-3 py-1.5 text-sm font-medium transition-all outline-none ${ activeTab === tab ? "bg-[rgb(var(--background))] text-[rgb(var(--foreground))] shadow-sm" : "text-[rgb(var(--muted-foreground))]" } cursor-pointer`} >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className='mt-2'>
            {
              activeTab === 'users' && (
                <div className='rounded-lg border bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))] shadow-sm'>
                  <div className='flex flex-col space-y-1.5 p-6'>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className='text-2xl font-semibold leading-none tracking-tight'>User Management</div>
                        <div className='text-sm text-[rgb(var(--muted-foreground))]'>Manage user accounts and permissions</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[rgb(var(--muted-foreground))]" />
                          <input className="rounded-md border border-[rgb(var(--input))] bg-[rgb(var(--background))] px-3 py-2 text-base placeholder:text-[rgb(var(--muted-foreground))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--ring))] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm pl-10 w-64" placeholder="Search users..." value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='p-6 pt-0'>
                    <div className="space-y-4">
                      {filteredUsers.map((user, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border border-[rgb(var(--border))] rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className="h-10 w-10 gradient-primary rounded-full flex items-center justify-center">
                              <span className="text-white font-medium">
                                {user.name?.[0]?.toUpperCase() || 'U'}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium">{user.name || 'Unknown User'}</p>
                              <p className="text-sm text-[rgb(var(--muted-foreground))]">{user.email}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-all border-transparent bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))] hover:bg-[rgba(var(--primary),0.8)] ${user.is_vendor ? "border-transparent bg-[rgb(var(--secondary))] text-[rgb(var(--secondary-foreground))] hover:bg-[rgba(var(--secondary),0.8)]" : "text-[rgb(var(--foreground))]"} `} >
                              {user.is_vendor ? 'Vendor' : 'User'}
                            </div>

                            <button className='inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-300 border-2 border-[rgb(var(--primary))] text-[rgb(var(--primary))] bg-transparent hover:bg-[rgb(var(--primary))] hover:text-[rgb(var(--primary-foreground))] hover:shadow-[rgb(var(--shadow-soft))] hover:scale-105 active:scale-95 h-9 px-4 cursor-pointer' onClick={() => toggleUserStatus(user._id)}  >
                              {user.is_active ? 'Deactivate' : 'Activate'}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )
            }

            {
              activeTab === "vendors" && (
                <div className='rounded-lg border bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))] shadow-sm'>
                  <div className='flex flex-col space-y-1.5 p-6'>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className='text-2xl font-semibold leading-none tracking-tight'>Vendor Management</div>
                        <div className='text-sm text-[rgb(var(--muted-foreground))]'>Manage vendor accounts and verification</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[rgb(var(--muted-foreground))]" />
                          
                          <input placeholder="Search vendors..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="rounded-md border border-[rgb(var(--input))] bg-[rgb(var(--background))] px-3 py-2 text-base placeholder:text-[rgb(var(--muted-foreground))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--ring))] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm pl-10 w-64" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='p-6 pt-0'>
                    <div className="space-y-4">
                      {filteredVendors.map((vendor) => (
                        <div key={vendor._id} className="flex items-center justify-between p-4 border border-[rgb(var(--border))] rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className="h-10 w-10 gradient-primary rounded-full flex items-center justify-center">
                              <Building className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <p className="font-medium">{vendor.business_name}</p>
                              <p className="text-sm text-[rgb(var(--muted-foreground))]">{vendor.category}</p>
                              <div className="flex items-center space-x-2 mt-1">
                                <div className="flex items-center">
                                  <Star className="h-3 w-3 text-yellow-400 mr-1" />
                                  <span className="text-xs">{vendor.rating || 0}</span>
                                </div>
                                <span className="text-xs text-[rgb(var(--muted-foreground))]">
                                  ({vendor.total_reviews || 0} reviews)
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            <div className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-all ${vendor.verified ? "border-transparent bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))] hover:bg-[rgba(var(--primary),0.8)]" : "border-transparent bg-[rgb(var(--secondary))] text-[rgb(var(--secondary-foreground))] hover:bg-[rgba(var(--secondary),0.8)]"} `} >
                              {vendor.verified ? 'Verified' : 'Pending'}
                            </div>

                            <button className='inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-300 border-2 border-[rgb(var(--primary))] text-[rgb(var(--primary))] bg-transparent hover:bg-[rgb(var(--primary))] hover:text-[rgb(var(--primary-foreground))] hover:shadow-[rgb(var(--shadow-soft))] hover:scale-105 active:scale-95 h-9 px-4 cursor-pointer' onClick={() => toggleVendorVerification(vendor._id, vendor.verified)} >
                              {vendor.verified ? 'Unverify' : 'Verify'}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )
            }

            {
              activeTab === "analytics" && (
                <div className="grid md:grid-cols-2 gap-6">
                  <div className='rounded-lg border bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))] shadow-sm'>
                    <div className='flex flex-col space-y-1.5 p-6'>
                      <div className='text-2xl font-semibold leading-none tracking-tight'>Platform Analytics</div>
                      <div className='text-sm text-[rgb(var(--muted-foreground))]'>Key performance metrics</div>
                    </div>

                    <div className='p-6 pt-0'>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">User Growth Rate</span>
                          <div className='inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-all border-transparent bg-[rgb(var(--secondary))] text-[rgb(var(--secondary-foreground))] hover:bg-[rgba(var(--secondary),0.8)]'>+{analytics.userGrowthRate}%</div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Vendor Conversion Rate</span>
                          <div className='inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-all border-transparent bg-[rgb(var(--secondary))] text-[rgb(var(--secondary-foreground))] hover:bg-[rgba(var(--secondary),0.8)]'>{analytics.vendorConversionRate}%</div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Average Event Value</span>
                          <div className='inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-all border-transparent bg-[rgb(var(--secondary))] text-[rgb(var(--secondary-foreground))] hover:bg-[rgba(var(--secondary),0.8)]'>LKR {analytics.averageEventValue.toLocaleString()}</div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Customer Satisfaction</span>
                          <div className='inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-all border-transparent bg-[rgb(var(--secondary))] text-[rgb(var(--secondary-foreground))] hover:bg-[rgba(var(--secondary),0.8)]'>{analytics.customerSatisfaction}/5</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='rounded-lg border bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))] shadow-sm'>
                    <div className='flex flex-col space-y-1.5 p-6'>
                      <div className='text-2xl font-semibold leading-none tracking-tight'>Popular Event Types</div>
                      <div className='text-sm text-[rgb(var(--muted-foreground))]'>Most booked event categories</div>
                    </div>
                    <div className='p-6 pt-0'>
                      <div className="space-y-4">
                        {analytics.popularEventTypes.map((eventType, index) => (
                          <div key={index} className="flex justify-between items-center">
                            <span className="text-sm text-black">{eventType.name}</span>
                            <div className="flex items-center space-x-2">
                              <div className="w-24 bg-[rgb(var(--muted))] rounded-full h-2">
                                <div className="bg-[rgb(var(--primary))] h-2 rounded-full" style={{ width: `${eventType.percentage}%` }} />
                              </div>
                              <span className="text-xs text-[rgb(var(--muted-foreground))]">{eventType.percentage}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )
            }

            {
              activeTab === "reports" && (
                <div className='rounded-lg border bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))] shadow-sm'>
                  <div className='flex flex-col space-y-1.5 p-6'>
                    <div className='text-2xl font-semibold leading-none tracking-tight'>System Reports</div>
                    <div className='text-sm text-[rgb(var(--muted-foreground))]'>Generate and download platform reports</div>
                  </div>

                  <div className='p-6 pt-0'>
                    <div className="grid md:grid-cols-3 gap-4">
                      <button className='inline-flex flex-col items-center justify-center rounded-lg text-sm font-medium transition-all duration-300 border-2 border-[rgb(var(--primary))] text-[rgb(var(--primary))] bg-transparent hover:bg-[rgb(var(--primary))] hover:text-[rgb(var(--primary-foreground))] hover:shadow-[rgb(var(--shadow-soft))] hover:scale-105 active:scale-95 h-20 px-4 cursor-pointer' onClick={generateRevenueReport}>
                        <BarChart3 className="h-6 w-6 mb-2" />
                        Revenue Report
                      </button>

                      <button className='inline-flex flex-col items-center justify-center rounded-lg text-sm font-medium transition-all duration-300 border-2 border-[rgb(var(--primary))] text-[rgb(var(--primary))] bg-transparent hover:bg-[rgb(var(--primary))] hover:text-[rgb(var(--primary-foreground))] hover:shadow-[rgb(var(--shadow-soft))] hover:scale-105 active:scale-95 h-20 px-4 cursor-pointer' onClick={generateUserActivityReport}>
                        <Users className="h-6 w-6 mb-2" />
                        User Activity
                      </button>

                      <button className='inline-flex flex-col items-center justify-center rounded-lg text-sm font-medium transition-all duration-300 border-2 border-[rgb(var(--primary))] text-[rgb(var(--primary))] bg-transparent hover:bg-[rgb(var(--primary))] hover:text-[rgb(var(--primary-foreground))] hover:shadow-[rgb(var(--shadow-soft))] hover:scale-105 active:scale-95 h-20 px-4 cursor-pointer' onClick={generateVendorPerformanceReport}>
                        <Building className="h-6 w-6 mb-2" />
                        Vendor Performance
                      </button>
                    </div>
                  </div>
                </div>
              )
            }
          </div>
        </div>
      </div>
    </div>
    
  )
}

export default AdminPanel