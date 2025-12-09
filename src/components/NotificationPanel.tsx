import React from 'react';
import { X, Bell, Clock, CheckCircle, AlertCircle, Info, ExternalLink, Check } from 'lucide-react';
import { Notification } from '../types';

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: Notification[];
  onMarkAsRead: (notificationId: string) => void;
  onMarkAllAsRead: () => void;
  userRole: 'admin' | 'manager' | 'employee';
  onAcknowledge?: (notificationId: string) => void;
}

export default function NotificationPanel({ 
  isOpen, 
  onClose, 
  notifications, 
  onMarkAsRead, 
  onMarkAllAsRead,
  userRole,
  onAcknowledge
}: NotificationPanelProps) {
  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const getTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));
    
    if (hours > 24) {
      return `${Math.floor(hours / 24)}d ago`;
    } else if (hours > 0) {
      return `${hours}h ago`;
    } else if (minutes > 0) {
      return `${minutes}m ago`;
    } else {
      return 'Just now';
    }
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 z-[100] transition-all duration-300 ease-out ${
      isOpen ? 'bg-black bg-opacity-50' : 'bg-black bg-opacity-0 pointer-events-none'
    }`}>
      <div className={`ml-auto w-full max-w-md bg-white dark:bg-gray-800 shadow-xl h-full transform transition-all duration-500 ease-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className={`p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 transform transition-all duration-500 delay-100 ease-out ${
            isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Notifications</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {unreadCount} unread notifications
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-700 transform hover:scale-110 hover:rotate-90 transition-all duration-200 ease-out"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {unreadCount > 0 && (
              <button
                onClick={onMarkAllAsRead}
                className="mt-3 text-sm text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-medium transition-colors"
              >
                Mark all as read
              </button>
            )}
          </div>

          {/* Notifications List */}
          <div className={`flex-1 overflow-auto transform transition-all duration-500 delay-200 ease-out ${
            isOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            {notifications.length === 0 ? (
              <div className="flex items-center justify-center h-32">
                <div className="text-center">
                  <Bell className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                  <p className="text-gray-500 dark:text-gray-400">No notifications</p>
                </div>
              </div>
            ) : (
              <div className="divide-y divide-gray-100 dark:divide-gray-700">
                {notifications.map((notification, index) => (
                  <div
                    key={notification.id}
                    className={`p-4 transition-all duration-300 ease-out hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transform hover:translate-x-2 hover:shadow-sm ${
                      !notification.read ? 'bg-blue-50/50 dark:bg-blue-900/10 border-l-2 border-l-teal-500' : ''
                    }`}
                    style={{ transitionDelay: `${index * 50}ms` }}
                    onClick={() => {
                      if (!notification.read) {
                        onMarkAsRead(notification.id);
                      }
                    }}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className={`text-sm font-medium ${
                            !notification.read ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300'
                          }`}>
                            {notification.title}
                          </h3>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse" />
                          )}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                          {notification.message}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
                            <Clock className="w-3 h-3" />
                            <span>{getTimeAgo(notification.timestamp)}</span>
                          </div>
                          {notification.actionUrl && (
                            <button className="text-xs text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-medium flex items-center space-x-1 transition-colors">
                              <span>View</span>
                              <ExternalLink className="w-3 h-3" />
                            </button>
                          )}
                          {userRole === 'employee' && !notification.read && onAcknowledge && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onAcknowledge(notification.id);
                              }}
                              className="flex items-center space-x-1 px-2 py-1 bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 rounded text-xs font-medium hover:bg-teal-200 dark:hover:bg-teal-900/50 transition-colors"
                            >
                              <Check className="w-3 h-3" />
                              <span>Acknowledge</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}