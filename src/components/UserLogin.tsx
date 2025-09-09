import React, { useState } from 'react';
import { Building2 } from 'lucide-react';
import { motion } from 'framer-motion';
import LoginModal from './LoginModal';
import { User } from '../types';
import { ThemeProvider } from '../contexts/ThemeContext';
import ThemeToggle from './ThemeToggle';

interface UserLoginProps {
  onLogin: (user: User) => void;
}

export default function UserLogin({ onLogin }: UserLoginProps) {
  const [loginModalOpen, setLoginModalOpen] = useState(true);

  const handleLogin = (user: User) => {
    onLogin(user);
    setLoginModalOpen(false);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center relative overflow-hidden">
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-r from-edarat-light/20 to-edarat-dark/20 animate-gradient-x"></div>
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-edarat-light/60 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-xl opacity-70 animate-float"></div>
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-edarat-dark/60 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-xl opacity-70 animate-float" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Main Content */}
        <motion.div 
          className="relative z-10 text-center max-w-md mx-auto px-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Logo and Branding */}
          <motion.div 
            className="mb-8"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="w-24 h-24 mx-auto mb-6 rounded-3xl overflow-hidden shadow-2xl bg-white dark:bg-gray-800 p-4">
              <img 
                src="/fsm-icon.png" 
                alt="Edarat FMS" 
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              EDARAT FMS
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-1">
              Filing Management System
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Secure document management for modern organizations
            </p>
          </motion.div>

          {/* Features */}
          <motion.div 
            className="grid grid-cols-1 gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="glass-panel rounded-2xl p-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center">
                  <Building2 className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                    Microsoft Teams SSO
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Single sign-on with your corporate account
                  </p>
                </div>
              </div>
            </div>

            <div className="glass-panel rounded-2xl p-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold text-sm">🔒</span>
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                    Secure & Compliant
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Enterprise-grade security and compliance
                  </p>
                </div>
              </div>
            </div>

            <div className="glass-panel rounded-2xl p-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <span className="text-blue-600 dark:text-blue-400 font-bold text-sm">⚡</span>
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                    Fast & Intuitive
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Modern interface with powerful search
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <motion.button
              onClick={() => setLoginModalOpen(true)}
              className="glass-button-primary px-8 py-3 text-lg font-semibold rounded-2xl shadow-lg"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign In to Continue
            </motion.button>
          </motion.div>

          {/* Footer */}
          <motion.div 
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Powered by Edarat Group • Version 2024.1.0
            </p>
          </motion.div>
        </motion.div>

        {/* Theme Toggle */}
        <div className="absolute top-4 right-4 z-20">
          <ThemeToggle />
        </div>

        {/* Login Modal */}
        <LoginModal
          isOpen={loginModalOpen}
          onLogin={handleLogin}
          onClose={() => setLoginModalOpen(false)}
        />
      </div>
    </ThemeProvider>
  );
}