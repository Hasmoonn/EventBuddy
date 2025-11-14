import React from 'react'
import {Route, Routes} from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Index from './pages/Index'
import Auth from './pages/Auth'
import NotFound from './pages/NotFound'
import Dashboard from './pages/Dashboard'
import Vendors from './pages/Vendors'
import VendorProfile from './pages/VendorProfile'
import CreateEvent from './pages/CreateEvent'
import EventDetails from './pages/EventDetails'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import Messages from './pages/Messages'
import Analytics from './pages/Analytics'
import About from './pages/About'
import Help from './pages/Help'
import AdminPanel from './pages/AdminPanel'
import VendorDashboard from './pages/VendorDashboard'
import VendorProfileForm from './pages/VendorProfileForm'

const App = () => {
  return (
    <div>
      <Toaster />
      <Routes>
        <Route path='/' element={<Index />} /> 
        <Route path='/auth' element={<Auth />} /> 
        <Route path='/dashboard' element={<Dashboard />} /> 
        <Route path='/vendors' element={<Vendors />} /> 
        <Route path='/vendors/:id' element={<VendorProfile />} /> 
        <Route path='/create-event' element={<CreateEvent />} /> 
        <Route path='/events/:id' element={<EventDetails />} /> 
        <Route path='/profile' element={<Profile />} /> 
        <Route path='/settings' element={<Settings />} /> 
        <Route path='/messages' element={<Messages />} /> 
        <Route path='/analytics' element={<Analytics />} />  
        <Route path='/about' element={<About />} /> 
        <Route path='/help' element={<Help />} /> 
        <Route path='/admin' element={<AdminPanel />} /> 
        <Route path='/vendor-dashboard' element={<VendorDashboard />} /> 
        <Route path='/contact' element={<Help />} /> 
        <Route path='/community' element={<Help />} /> 
        <Route path='/blog' element={<About />} /> 
        <Route path='/careers' element={<About />} /> 
        <Route path='/press' element={<About />} /> 
        <Route path='/privacy' element={<Help />} /> 
        <Route path='/terms' element={<Help />} /> 
        <Route path='/cookies' element={<Help />} />
        <Route path='/vendor-profile-form' element={<VendorProfileForm />} /> 
        <Route path='*' element={<NotFound />} /> 
      </Routes>
    </div>
    
  )
}

export default App