import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { ArrowLeft, Calendar, Mail, Sparkles, User, Lock, Briefcase } from 'lucide-react'
import { AuthContext } from '../contexts/AuthContext'
import axios from 'axios'
import { HashLoader } from "react-spinners";

const Auth = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isVendor, setIsVendor] = useState(false);
  const {backendUrl, navigate, setIsAuthenticated, loading, setLoading, user, setUser} = useContext(AuthContext);

  const [activeTab, setActiveTab] = useState("signup");

  useEffect(() => {
    if (!loading) {   
      if (user) {
        navigate('/dashboard'); 
      }
    }
  }, [user, loading, navigate]);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const {data} = await axios.post(backendUrl + '/api/auth/login', {email, password})

      if (data.success) {
        setUser(data.user);
        setIsAuthenticated(true);
        navigate('/dashboard');
        toast.success(`User Logged In successfully.`)
      } else{
          toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const {data} = await axios.post(backendUrl + '/api/auth/register', {name, email, password, is_vendor: isVendor})

      if (data.success) {
        setUser(data.user);
        setIsAuthenticated(true);
        navigate('/dashboard');
        toast.success(`User Registered Successfully.`)
      } else{
          toast.error(data.message)
      }
    } catch (error) {
        toast.error(error.message)

    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <HashLoader color='#D8B4FE' />
      </div> 
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[rgb(var(--background))] to-[rgba(var(--accent-foreground),0.3)] flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <Link to="/" className="inline-flex items-center text-[rgb(var(--primary))] hover:text-[rgb(var(--primary),0.8)] transition-all duration-200">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          
          <div className="flex items-center justify-center space-x-2">
            <div className="p-2 gradient-primary rounded-lg">
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gradient">
                EventBuddy
              </h1>
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold transition-all border-transparent bg-[rgb(var(--secondary))] text-[rgb(var(--secondary-foreground))] hover:bg-[rgba(var(--secondary),0.8)] text-xs">
                Smart Planning
              </div>
            </div>
          </div>
        </div>

        {/* Auth Card */}
        <div className="rounded-lg border bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))] shadow-sm card-elevated">
          <div className="flex flex-col space-y-1.5 p-6 text-center">
            <div className="text-2xl font-semibold leading-none tracking-tight flex items-center justify-center space-x-2">
              <Sparkles className="h-5 w-5 text-[rgb(var(--primary))]" />
              <span>Join EventBuddy</span>
            </div>
            <div className='text-sm text-[rgb(var(--muted-foreground))]'>
              Access your event planning dashboard
            </div>
          </div>
          
          <div className='p-6 pt-0 space-y-6'>
            <div className="grid w-full grid-cols-2 h-10 rounded-md bg-[rgba(var(--accent-foreground),0.1)] p-1 text-[rgb(var(--muted-foreground))]">
              <button onClick={() => setActiveTab("signin")} className={`inline-flex items-center justify-center rounded-sm px-3 py-1.5 text-sm font-medium transition-all cursor-pointer w-full ${activeTab === "signin" ? "bg-[rgb(var(--background))] text-[rgb(var(--foreground))] shadow-sm"
                    : "text-[rgb(var(--muted-foreground))]"
                }`}
              >
                Sign In
              </button>

              <button onClick={() => setActiveTab("signup")} className={`inline-flex items-center justify-center rounded-sm px-3 py-1.5 text-sm font-medium transition-all cursor-pointer w-full ${activeTab === "signup"
                    ? "bg-[rgb(var(--background))] text-[rgb(var(--foreground))]"
                    : "text-[rgb(var(--muted-foreground))]"
                }`}
              >
                Sign Up
              </button>
            </div>
            
            {
              activeTab === "signin" && (
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="signin-email" className="text-sm font-medium leading-none flex items-center space-x-2">
                      <Mail className="h-4 w-4" />
                      <span>Email</span>
                    </label>
                    <input className='rounded-md border border-[rgb(var(--input))] bg-[rgb(var(--background))] px-3 py-2 text-base placeholder:text-[rgb(var(--muted-foreground))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--ring))] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm w-full'
                      id="signin-email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="signin-password" className="text-sm font-medium leading-none flex items-center space-x-2">
                      <Lock className="h-4 w-4" />
                      <span>Password</span>
                    </label>
                    <input className='rounded-md border border-[rgb(var(--input))] bg-[rgb(var(--background))] px-3 py-2 text-base placeholder:text-[rgb(var(--muted-foreground))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--ring))] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm w-full'
                      id="signin-password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  {
                    activeTab === 'signin' && (
                      <div className='mb-4 flex justify-end'>
                        <Link to='/reset-password' >
                          <p className='text-purple-500 hover:underline transition-all font-medium'>Forgot Password?</p>
                        </Link>
                      </div>
                    )
                  }
                  
                  <button type="submit" className="inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-300 w-full btn-hero" disabled={loading}
                  >
                    {loading ? "Signing In..." : "Sign In"}
                  </button>
                </form>
              )
            }

            {
              activeTab === "signup" && (
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="signup-name" className="text-sm font-medium leading-none flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>Full Name</span>
                    </label>
                    <input className='rounded-md border border-[rgb(var(--input))] bg-[rgb(var(--background))] px-3 py-2 text-base placeholder:text-[rgb(var(--muted-foreground))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--ring))] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm w-full'
                      id="signup-name"
                      type="text"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="signup-email" className="text-sm font-medium leading-none flex items-center space-x-2">
                      <Mail className="h-4 w-4" />
                      <span>Email</span>
                    </label>
                    <input className='rounded-md border border-[rgb(var(--input))] bg-[rgb(var(--background))] px-3 py-2 text-base placeholder:text-[rgb(var(--muted-foreground))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--ring))] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm w-full'
                      id="signup-email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="signup-password" className="text-sm font-medium leading-none flex items-center space-x-2">
                      <Lock className="h-4 w-4" />
                      <span>Password</span>
                    </label>
                    <input className='rounded-md border border-[rgb(var(--input))] bg-[rgb(var(--background))] px-3 py-2 text-base placeholder:text-[rgb(var(--muted-foreground))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--ring))] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm w-full'
                      id="signup-password"
                      type="password"
                      placeholder="Choose a password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      id="is-vendor"
                      type="checkbox"
                      checked={isVendor}
                      onChange={(e) => setIsVendor(e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 focus:ring-2 focus:ring-[rgb(var(--ring))]"
                    />

                    <label htmlFor="is-vendor" className="flex items-center text-sm font-medium leading-none cursor-pointer">
                      <Briefcase className="h-4 w-4 mr-2 text-[rgb(var(--primary))]" />
                      Register as Vendor
                    </label>
                  </div>
                  
                  <button type="submit" className="inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-300 w-full btn-hero" disabled={loading} >
                    {loading ? "Creating Account..." : "Create Account"}
                  </button>
                </form>
              )
            }
          </div>

          <div className='text-center mb-4'>
            <p className='text-sm text-gray-600'>
              {
                activeTab === 'signin' ? "Don't have an account?" : "Already have an account?"
              }{' '}
              <button onClick={() => {
                  if (activeTab === 'signin') {
                    setActiveTab('signup')
                  } else{
                    setActiveTab('signin')
                  }
                ; scrollTo(0,0)} } className='font-medium hover:text-purple-500 cursor-pointer hover:underline'>
                {
                  activeTab === 'signin' ? "Sign up" : "Sign in" 
                }
              </button>
            </p>
          </div>
        </div>

        <p className="text-center text-sm text-[rgb(var(--muted-foreground))]">
          By signing up, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  )
}

export default Auth