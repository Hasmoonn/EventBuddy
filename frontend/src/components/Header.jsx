import React, { useContext, useState } from 'react'
import { Calendar, LogOut, Menu, Sparkles, User, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import NotificationCenter from './NotificationCenter'
import { AuthContext } from '../contexts/AuthContext'
import axios from 'axios'
import toast from 'react-hot-toast'
import { HashLoader } from 'react-spinners'


const Header = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const {backendUrl, navigate, isAuthenticated, setIsAuthenticated, loading, setLoading, user, setUser} = useContext(AuthContext);


  const handleLogout = async () => {
    setLoading(true)

    try {
      const {data} = await axios.post(backendUrl + "/api/auth/logout")

      if (data.success) {
        toast.success(data.message)
        setUser(null)
        setIsAuthenticated(false)
        navigate('/auth')
      } else {
        return toast.error(data.message)
      }
      
    } catch (error) {
      console.log(error.message);
      toast.error(data.message)
    } finally{
      setLoading(false)
    }   
  }

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <HashLoader color='#D8B4FE' />
      </div> 
    );
  }

  return (
    <header className="fixed top-2 left-3 right-3 z-50 glass shadow-sm">
      <div className='max-w-7xl mx-auto px-4 py-3'>
   
        <div className='flex items-center justify-between'>
          {/* logo */}
          <div onClick={() => {navigate('/'); scrollTo(0,0)}} className='flex items-center gap-x-2 cursor-pointer'>
            <div className="p-2 gradient-primary rounded-lg">
              <Calendar className='h-4 w-4 sm:h-6 sm:w-6 text-white' />
            </div>

            <div>
              <h1 className="text-md sm:text-xl font-bold text-gradient">
                EventBuddy
              </h1>
              <div className="flex justify-center rounded-full px-2 py-0.5 text-[10px] sm:text-xs border-transparent font-semibold bg-[rgb(var(--secondary))] transition-all text-[rgb(var(--secondary-foreground))] hover:bg-[rgba(var(--secondary),0.6)]">
                Smart Planning
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className='hidden md:flex items-center gap-x-8'>

            <a href="#features" className="text-[rgb(var(--foreground))] font-medium hover:text-[rgb(var(--primary))] transition-all duration-300">
              Features
              <hr className='border-none outline-none h-0.5 bg-[rgb(var(--primary))] w-3/5 mx-auto hidden'/>
            </a>

            <Link to="/vendors" className="text-[rgb(var(--foreground))] font-medium hover:text-[rgb(var(--primary))] transition-all duration-300">
              Vendors
            </Link>
            {
              user && (
                <Link to="/dashboard" className="text-[rgb(var(--foreground))] font-medium hover:text-[rgb(var(--primary))] transition-all duration-300">
                  Dashboard
                </Link>
              )
            }
            
          </nav>


          <div className='flex items-center gap-x-4'>
            {
              user && isAuthenticated ? (
                <div className='flex items-center gap-x-2 sm:gap-x-4'>
                  <NotificationCenter />

                  <div className='group relative z-50'>
                    <div className='flex items-center gap-x-1 py-1 px-3 rounded-xl bg-[rgb(var(--primary-glow),0.2)] transition-all cursor-pointer text-[rgb(var(--primary))] hover:bg-[rgb(var(--primary-glow),0.3)]'>
                      <User className='h-4 w-4 sm:h-6 sm:w-6' /> 
                      <span className='hidden sm:inline-block'>Profile</span>
                    </div>

                    <div className='absolute hidden group-hover:block right-0 dropdown-menu z-10 shadow-lg rounded-lg'>
                      <div className='flex flex-col w-48 p-2 text-[rgb(var(--foreground))] bg-[rgb(var(--popover))] transition-all duration-300 rounded-lg text-sm font-medium'>
                        <Link to="/profile" className='rounded-md w-full py-1 px-3 hover:bg-[rgb(var(--primary-glow),0.2)] hover:text-[rgb(var(--primary))] transition-all duration-300'>Profile</Link>
                        <Link to="/settings" className='rounded-md w-full py-1 px-3 hover:bg-[rgb(var(--primary-glow),0.2)] hover:text-[rgb(var(--primary))] transition-all duration-300'>Settings</Link>
                        <Link to="/dashboard" className='rounded-md w-full py-1 px-3 hover:bg-[rgb(var(--primary-glow),0.2)] hover:text-[rgb(var(--primary))] transition-all duration-300'>Dashboard</Link>
                        {user?.is_vendor && (
                          <Link to="/vendor-dashboard" className='rounded-md w-full py-1 px-3 hover:bg-[rgb(var(--primary-glow),0.2)] hover:text-[rgb(var(--primary))] transition-all duration-300'>Vendor Dashboard</Link>
                        )}

                        {localStorage.getItem('adminToken') && (
                          <Link to="/admin" className='rounded-md w-full py-1 px-3 hover:bg-[rgb(var(--primary-glow),0.2)] hover:text-[rgb(var(--primary))] transition-all duration-300'>Admin Panel</Link>
                        )}
                        <hr className='mb-1' />
                        <button className='rounded-md w-full py-1 px-3 hover:bg-[rgb(var(--primary-glow),0.2)] hover:text-[rgb(var(--primary))] transition-all duration-300 flex gap-2 items-center' onClick={handleLogout}>
                          <LogOut className='h-4 w-4' />
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="hidden md:block items-center gap-x-3">
                  <Link to="/auth">
                    <div className="btn-hero text-sm inline-flex items-center">
                      <Sparkles className="h-4 w-4 mr-2" />
                      Get Started
                    </div>
                  </Link>
                </div>
              )
            }

            <button className="md:hidden rounded-lg font-medium transition-all duration-300 hover:bg-[rgb(var(--accent))] hover:text-[rgb(var(--accent-foreground))] hover:scale-105 active:scale-95 px-2 py-1 cursor-pointer" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className='h-4 w-4 sm:h-6 sm:w-6' /> : <Menu className='h-4 w-4 sm:h-6 sm:w-6' />}
            </button>
          </div>
        </div> 

        {
          isMenuOpen && (
            <div className='md:hidden mt-4 pb-4 border-t border-[rgba(var(--border),0.5)]'>
              <nav className="flex flex-col space-y-3 pt-4">
                <Link to="#features" className="text-[rgb(var(--foreground))] hover:text-[rgb(var(--primary))] transition-all duration-300">
                  Features
                </Link>
                <Link to="/vendors" className="text-[rgb(var(--foreground))] hover:text-[rgb(var(--primary))] transition-all duration-300">
                  Vendors
                </Link>
                <Link to="/dashboard" className="text-[rgb(var(--foreground))] hover:text-[rgb(var(--primary))] transition-all duration-300">
                  Dashboard
                </Link>

                {!user && !isAuthenticated && (
                  <div className="pt-2">
                    <Link to="/auth">
                      <div className="btn-hero text-sm inline-flex items-center">
                        <Sparkles className="h-4 w-4 mr-2" />
                        Get Started
                      </div>
                    </Link>
                  </div>
                )}
              </nav>
            </div>
          )
        }            
      </div>
    </header>
  )
}

export default Header