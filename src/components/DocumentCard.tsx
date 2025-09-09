import React, { useState } from 'react';
import { FileText, Eye, Download, Clock, CheckCircle, XCircle, AlertCircle, File, FileImage, FileSpreadsheet, Calendar, CalendarX } from 'lucide-react';
import { motion } from 'framer-motion';
import { Document } from '../types';

interface DocumentCardProps {
  document: Document;
  onClick: () => void;
  showApprovalStatus?: boolean;
  compact?: boolean;
  minimal?: boolean;
  bulkMode?: boolean;
  selected?: boolean;
  onSelect?: (selected: boolean) => void;
}

export default function DocumentCard({ 
  document, 
  onClick, 
  showApprovalStatus = false, 
  compact = false,
  minimal = false,
  bulkMode = false,
  selected = false,
  onSelect
}: DocumentCardProps) {

  const getStatusIcon = () => {
    switch (document.approvalStatus) {
      case 'approved':
        return <CheckCircle className="w-3 h-3 text-green-500" />;
      case 'rejected':
        return <XCircle className="w-3 h-3 text-red-500" />;
      case 'pending':
        return <AlertCircle className="w-3 h-3 text-yellow-500" />;
      default:
        return null;
    }
  };

  const getFileIcon = () => {
    switch (document.fileType) {
      case 'pdf':
        return <File className="w-4 h-4 text-red-600" />;
      case 'doc':
      case 'docx':
        return <FileText className="w-4 h-4 text-blue-600" />;
      case 'xls':
      case 'xlsx':
        return <FileSpreadsheet className="w-4 h-4 text-green-600" />;
      case 'image':
        return <FileImage className="w-4 h-4 text-purple-600" />;
      default:
        return <FileText className="w-4 h-4 text-gray-500" />;
    }
  };

  if (minimal) {
    return (
      <div 
        className="relative border-b border-gray-100 dark:border-gray-700 last:border-b-0 z-10"
      >
        <div className="flex items-center">
          {bulkMode && onSelect && (
            <div className="px-2">
              <input
                type="checkbox"
                checked={selected}
                onChange={(e) => {
                  e.stopPropagation();
                  onSelect(e.target.checked);
                }}
                className="rounded border-gray-300 dark:border-gray-600 text-teal-600 focus:ring-teal-500"
              />
            </div>
          )}
          <button
            onClick={onClick}
            className="flex-1 text-left px-2 py-2 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all group ripple"
          >
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                {getFileIcon()}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-xs font-medium text-gray-900 dark:text-white truncate leading-tight">
                  {document.title}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  {document.type}
                </p>
              </div>
              {showApprovalStatus && getStatusIcon()}
            </div>
          </button>
          </button>
      </div>
    );
  }

  if (compact) {
    return (
      <motion.div 
        className={`flex items-center w-full text-left p-3 document-card ${
          selected ? 'border-teal-400/50 bg-teal-500/10 shadow-glass-lg' : ''
        }`}
        whileHover={{ scale: 1.02, x: 5 }}
        whileTap={{ scale: 0.98 }}
      >
        {bulkMode && onSelect && (
          <div className="px-2">
            <input
              type="checkbox"
              checked={selected}
              onChange={(e) => {
                e.stopPropagation();
                onSelect(e.target.checked);
              }}
              className="rounded border-gray-300 dark:border-gray-600 text-teal-600 focus:ring-teal-500"
              className="rounded border-white/20 bg-white/10 text-neon-blue focus:ring-neon-blue/50"
            />
          </div>
        )}
        <button
          onClick={onClick}
          className="flex-1 text-left ripple"
        >
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              {getFileIcon()}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-gray-800 dark:text-white truncate">
                {document.title}
              </h3>
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                <div className="flex items-center space-x-2">
                  <span>{document.type}</span>
                  <span>•</span>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>Updated: {new Date(document.lastModified).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              {document.expiryDate && (
                <div className={`flex items-center space-x-1 mt-1 ${
                  new Date(document.expiryDate) < new Date() ? 'text-red-500' : 'text-orange-500'
                }`}>
                  <CalendarX className="w-3 h-3" />
                  <span>Expires: {new Date(document.expiryDate).toLocaleDateString()}</span>
                </div>
              )}
            </div>
                <span>•</span>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-3 h-3" />
                  <span>{new Date(document.lastModified).toLocaleDateString()}</span>
                </div>