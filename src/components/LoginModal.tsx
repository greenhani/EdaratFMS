import React, { useState } from 'react';
import { X, Users, Shield, UserCheck, Building2, Mail, ChevronRight } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import AvatarImage from './AvatarImage';
import { User } from '../types';
import { mockUsers } from '../data/mockData';

interface LoginModalProps {
  isOpen: boolean;
  onLogin: (user: User) => void;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onLogin, onClose }: LoginModalProps) {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (user: User) => {
    setIsLoading(true);
    setSelectedUser(user);
    
    // Simulate Microsoft Teams authentication delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    onLogin(user);
    setIsLoading(false);
    setSelectedUser(null);
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return <Shield className="w-5 h-5 text-red-600" />;
      case 'manager':
        return <UserCheck className="w-5 h-5 text-blue-600" />;
      case 'employee':
        return <Users className="w-5 h-5 text-green-600" />;
      default:
        return <Users className="w-5 h-5 text-gray-600" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20';
      case 'manager':
        return 'border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20';
      case 'employee':
        return 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20';
      default:
        return 'border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800';
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[200] bg-black bg-opacity-60 backdrop-blur-sm animate-in fade-in duration-300" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-md w-full mx-4 overflow-hidden z-[201] animate-in fade-in zoom-in-95 slide-in-from-bottom-2 duration-500">
        {isLoading && selectedUser ? (
          // Loading State
          <div className="p-8 text-center">
            <div className={`w-16 h-16 rounded-full mx-auto mb-4 overflow-hidden animate-pulse ${getRoleColor(selectedUser.role)}`}>
             <AvatarImage
               src={selectedUser.avatar}
               alt={selectedUser.name}
               className="w-full h-full object-cover"
               fallbackClassName="w-full h-full flex items-center justify-center"
               size={64}
               role={selectedUser.role}
             />
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <div className="w-8 h-8 border-3 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Signing in with Company Portal
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Select your company account to continue
              </p>
              
              <div className="flex items-center justify-center space-x-2 text-xs text-gray-500 dark:text-gray-400 mt-4">
                <Building2 className="w-4 h-4" />
                <span>Edarat Group Portal</span>
              </div>
            </div>
          </div>
        ) : (
          // Login Selection
          <>
            {/* Header */}
            <div className={`p-6 bg-gradient-to-r from-teal-600 to-teal-700 text-white transform transition-all duration-300 delay-100 ease-out ${
              isOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-sm overflow-hidden bg-white/20">
                    <img 
                      src="/fsm-icon.png" 
                      alt="Edarat FMS" 
                      className="w-full h-full object-cover rounded-sm"
                    />
                  </div>
                  <div>
                    <Dialog.Title className="text-xl font-bold">EDARAT FMS</Dialog.Title>
                    <Dialog.Description className="text-teal-100 text-sm">Company Portal</Dialog.Description>
                  </div>
                </div>
                <Dialog.Close className="p-2 text-teal-100 hover:text-white hover:bg-white/10 rounded-sm transition-all duration-200 transform hover:scale-110 hover:rotate-90">
                  <X className="w-5 h-5" />
                </Dialog.Close>
              </div>
            </div>

            {/* Content */}
            <div className={`p-6 transform transition-all duration-400 delay-200 ease-out ${
              isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}>
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Choose Account
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Select your Edarat Group account to continue
                </p>
              </div>

              {/* User List */}
              <div className="space-y-3">
                {mockUsers.map((user, index) => (
                  <button
                    key={user.id}
                    onClick={() => handleLogin(user)}
                    className={`w-full p-4 rounded-sm border-2 hover:border-teal-300 dark:hover:border-teal-600 hover:shadow-md transition-all duration-300 ease-out text-left transform hover:scale-[1.02] hover:-translate-y-1 ${getRoleColor(user.role)}`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                            {user.avatar ? (
                              <img
                                src={user.avatar}
                                alt={user.name}
                               className="w-full h-full object-cover"
                               loading="lazy"
                               onError={(e) => {
                                 e.currentTarget.style.display = 'none';
                                 const parent = e.currentTarget.parentElement;
                                 if (parent) {
                                   parent.innerHTML = `<div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-teal-500 to-teal-600">${getRoleIcon(user.role)}</div>`;
                                 }
                               }}
                              />
                            ) : (
                             <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-teal-500 to-teal-600">
                                {getRoleIcon(user.role)}
                              </div>
                            )}
                          </div>
                          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center border border-gray-200 dark:border-gray-600">
                            {getRoleIcon(user.role)}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            {user.name}
                          </h4>
                          <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-300">
                            <Mail className="w-3 h-3" />
                            <span>{user.email}</span>
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                            {user.role} • {user.department}
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-teal-600 transition-colors" />
                    </div>
                  </button>
                ))}
              </div>

              {/* Footer */}
              <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                  <Building2 className="w-4 h-4" />
                  <span>Powered by Edarat Group Authentication</span>
                </div>
                <p className="text-center text-xs text-gray-400 dark:text-gray-500 mt-2">
                  Secure company authentication
                </p>
              </div>
            </div>
          </>
        )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}