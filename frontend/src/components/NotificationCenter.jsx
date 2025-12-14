import { Bell, Calendar, CheckCircle, DollarSign, MessageSquare, Users, X } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { mockNotifications } from '../assets/assets.js'
import { AuthContext } from '../contexts/AuthContext'
import axios from 'axios'
import { toast } from 'react-hot-toast'

const NotificationCenter = () => {

  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)
  const { backendUrl } = useContext(AuthContext)

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const { data } = await axios.get(backendUrl + '/api/notifications');

        if (data.success) {
          const list = data.notifications.map(n => ({
            id: n._id || n.id,
            type: n.type,
            message: n.message,
            read_status: !!n.read_status,
            created_at: n.createdAt || n.created_at || n.created_at
          }));

          setNotifications(list);
          setUnreadCount(list.filter(n => !n.read_status).length);
        } else {
          toast.error(data.message || 'Failed to load notifications');
        }
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to fetch notifications');
      }
    }

    fetchNotifications();
  }, [backendUrl])

  const markAsRead = async (notificationId) => {
    try {
      const { data } = await axios.put(backendUrl + '/api/notifications/mark-read', { notificationId });

      if (data.success) {
        setNotifications(prev => prev.map(n => n.id === notificationId ? { ...n, read_status: true } : n));
        setUnreadCount(prev => Math.max(0, prev - 1));
      } else {
        toast.error(data.message || 'Could not mark notification');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Server error');
    }
  }


  const markAllAsRead = async () => {
    try {
      const { data } = await axios.put(backendUrl + '/api/notifications/mark-all-read');

      if (data.success) {
        setNotifications(prev => prev.map(n => ({ ...n, read_status: true })));
        setUnreadCount(0);
      } else {
        toast.error(data.message || 'Could not mark all read');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Server error');
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'booking_confirmation':
        return CheckCircle;
      case 'payment_reminder':
        return DollarSign;
      case 'event_reminder':
        return Calendar;
      case 'message':
        return MessageSquare;
      case 'guest_update':
        return Users;
      default:
        return Bell;
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'booking_confirmation':
        return 'text-green-500';
      case 'payment_reminder':
        return 'text-yellow-500';
      case 'event_reminder':
        return 'text-blue-500';
      case 'message':
        return 'text-purple-500';
      case 'guest_update':
        return 'text-indigo-500';
      default:
        return 'text-gray-500';
    }
  };

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className='relative hover:bg-[rgb(var(--accent))] hover:text-[rgb(var(--accent-foreground))] hover:scale-105 active:scale-95 rounded-lg px-3 py-1 inline-flex items-center justify-center gap-2 text-sm font-medium transition-all duration-300 cursor-pointer'>
        <Bell className='w-3 h-3 sm:w-5 sm:h-5' />
        {unreadCount > 0 && (
          <div className="absolute -top-1 right-1 sm:-top-1 sm:-right-1 h-3 w-3 sm:h-5 sm:w-5 p-0 inline-flex items-center justify-center rounded-full border text-xs font-semibold border-transparent bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))] hover:bg-[rgba(var(--primary),0.8)]">
            {unreadCount > 99 ? '99+' : unreadCount}
          </div>
        )}
      </button>

      {
        isOpen && (
          <div className='absolute right-0 top-full mt-2 w-80 md:w-96 z-40 shadow-lg rounded-lg border bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))]'>
            <div className='flex flex-col space-y-1.5 p-6 pb-3'>
              <div className="flex items-center justify-between">
                <div>
                  <div className='font-semibold leading-none tracking-tight text-lg'>Notifications</div>
                  <div className='text-sm text-[rgb(var(--muted-foreground))]'>
                    {unreadCount > 0 ? `${unreadCount} unread` : 'All caught up!'}
                  </div>
                </div>
                <div className='flex items-center gap-2'>
                  {
                    unreadCount > 0 && (
                      <button className='rounded-lg text-sm font-medium hover:bg-[rgb(var(--accent))] hover:text-[rgb(var(--accent-foreground))] hover:scale-105 active:scale-95 py-1 px-2 cursor-pointer transition-all duration-300' onClick={markAllAsRead}>
                        Mark all read
                      </button>
                    )
                  }

                  <button onClick={() => setIsOpen(false)} className='rounded-lg text-sm font-medium hover:bg-[rgb(var(--accent))] hover:text-[rgb(var(--accent-foreground))] hover:scale-105 active:scale-95 py-1 px-2 cursor-pointer transition-all duration-300'>
                    <X className='h-4 w-4' />
                  </button>
                </div>
              </div>
            </div>

            <div className='p-0'>
              <div className='h-96 overflow-y-scroll'>
                {
                  notifications.length === 0 ? (
                    <div className="p-6 text-center text-[rgb(var(--muted-foreground))]">
                      <Bell className='h-8 w-8 mx-auto mb-2 opacity-50' />
                      <p>No notifications yet</p>
                    </div>
                  ) : (
                    <div className='space-y-1'>
                      {
                        notifications.map((notification) => {
                          const Icon = getNotificationIcon(notification.type);

                          return (
                            <div key={notification.id} className={`p-4 border-b border-[rgb(var(--border))] hover:bg-[rgba(var(--muted),0.5)] cursor-pointer transition-all ${!notification.read_status ? 'bg-[rgba(var(--primary),0.1)]' : ''}`} onClick={() => markAsRead(notification.id)}>
                              <div className="flex items-start space-x-3">
                                <Icon className={`h-5 w-5 mt-0.5 ${getNotificationColor(notification.type)}`} />
                                <div className='flex-1 min-w-0'>
                                  <p className={`text-sm ${!notification.read_status ? 'font-medium' : ''}`}>
                                    {notification.message}
                                  </p>
                                  <p className="text-xs text-[rgb(var(--muted-foreground))] mt-1">
                                    {formatTimeAgo(notification.created_at)}
                                  </p>
                                </div>

                                {
                                  !notification.read_status && (
                                    <div className="h-2 w-2 bg-[rgb(var(--primary))] rounded-full mt-2"></div>
                                  )
                                }
                              </div>
                            </div>
                          )
                        })
                      }
                    </div>
                  )
                }
              </div>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default NotificationCenter