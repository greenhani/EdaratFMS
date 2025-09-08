import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Download, Share2, CheckCircle, XCircle, Eye, Calendar, User, Building2, Tag, FileText, Clock, AlertCircle } from 'lucide-react';
import { Document, User as UserType, AuditLog } from '../types';
import AuditTrail from './AuditTrail';

interface DocumentViewProps {
  document: Document;
  user: UserType;
  onBack: () => void;
  onApprove?: () => void;
  onReject?: () => void;
  auditLogs: AuditLog[];
}

export default function DocumentView({ 
  document, 
  user, 
  onBack, 
  onApprove, 
  onReject, 
  auditLogs 
}: DocumentViewProps) {
  const [activeTab, setActiveTab] = useState('info');
  
  const canApprove = user.role !== 'employee' && document.approvalStatus === 'pending';
  const showHistoryTab = user.role !== 'employee';

  const getStatusIcon = () => {
    switch (document.approvalStatus) {
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'pending':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      default:
        return null;
    }
  };

  const getFileIcon = () => {
    switch (document.fileType) {
      case 'pdf':
        return <FileText className="w-8 h-8 text-red-600" />;
      case 'doc':
      case 'docx':
        return <FileText className="w-8 h-8 text-blue-600" />;
      case 'xls':
      case 'xlsx':
        return <FileText className="w-8 h-8 text-green-600" />;
      default:
        return <FileText className="w-8 h-8 text-gray-500" />;
    }
  };

  const renderPreview = () => {
    switch (document.fileType) {
      case 'pdf':
        return (
          <div className="w-full h-full bg-gray-100 dark:bg-gray-700 relative">
            <iframe
              src={document.url}
              className="w-full h-full border-none"
              title={`Preview of ${document.title}`}
              onError={(e) => {
                console.error('PDF preview failed:', e);
                // Fallback to placeholder if PDF fails to load
                e.currentTarget.style.display = 'none';
                const fallback = e.currentTarget.parentElement?.querySelector('.pdf-fallback');
                if (fallback) {
                  (fallback as HTMLElement).style.display = 'flex';
                }
              }}
            />
            <div className="pdf-fallback w-full h-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center absolute inset-0 hidden">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-sm flex items-center justify-center mx-auto mb-3">
                  <FileText className="w-8 h-8 text-red-600 dark:text-red-400" />
                </div>
                <p className="text-gray-600 dark:text-gray-300 font-medium">PDF Document</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Click download to view full document</p>
              </div>
            </div>
          </div>
        );
      case 'doc':
      case 'docx':
        return (
          <div className="w-full h-full bg-gray-50 dark:bg-gray-700 p-6 overflow-auto">
            <div className="prose prose-sm max-w-none dark:prose-invert">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">{document.title}</h1>
              <p className="text-gray-700 dark:text-gray-300">This is a preview of the document content. In a real implementation, you would parse and display the actual document content here.</p>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Overview</h2>
              <p className="text-gray-700 dark:text-gray-300">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300">
                <li>Key point 1</li>
                <li>Key point 2</li>
                <li>Key point 3</li>
              </ul>
            </div>
          </div>
        );
      default:
        return (
          <div className="w-full h-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
            <div className="text-center">
              {getFileIcon()}
              <p className="text-gray-600 dark:text-gray-300 font-medium mt-3">Document Preview</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Click download to view full document</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* Header - No gap below */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <img 
                    src="/app_icon.png" 
                    alt="Edarat FMS" 
                    className="w-auto h-8 object-cover"
                  />
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Documents</span>
              </button>
            </div>
            
            {/* Document Title and Status */}
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <h1 className="text-lg font-bold text-gray-900 dark:text-white">{document.title}</h1>
                <div className="flex items-center justify-center space-x-2">
                  {getStatusIcon()}
                  <span className={`text-sm font-medium capitalize ${
                    document.approvalStatus === 'approved' ? 'text-green-600 dark:text-green-400' :
                    document.approvalStatus === 'rejected' ? 'text-red-600 dark:text-red-400' :
                    'text-yellow-600 dark:text-yellow-400'
                  }`}>
                    {document.approvalStatus}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>
              
              <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>
              
              {canApprove && (
                <>
                  <button
                    onClick={onReject}
                    className="px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-sm hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                  >
                    Reject
                  </button>
                  <button
                    onClick={onApprove}
                    className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-sm hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors"
                  >
                    Approve
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Layout - No gap from header */}
      <div className="flex-1 flex bg-white dark:bg-gray-800">
        {/* Left Panel - Preview */}
        <div className="flex-1 min-h-0">
          <div className="h-full">
            {renderPreview()}
          </div>
        </div>

        {/* Right Panel - Metadata and History */}
        <div className="w-96 border-l border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 flex flex-col">
          {/* Document Info Header */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                {getFileIcon()}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                  <span className="flex items-center space-x-1">
                    <User className="w-4 h-4" />
                    <span>Uploaded by {document.uploadedBy}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(document.uploadedAt).toLocaleDateString()}</span>
                  </span>
                </div>
                
                <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400 mb-3">
                  <Building2 className="w-4 h-4" />
                  <span>{document.department}</span>
                </div>
                
                {document.description && (
                  <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">{document.description}</p>
                )}
                
                {document.tags && document.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {document.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 text-xs rounded-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('info')}
                className={`flex-1 py-3 px-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'info'
                    ? 'border-teal-500 text-teal-600 dark:text-teal-400 bg-white dark:bg-gray-800'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                Information
              </button>
              
              {showHistoryTab && (
                <button
                  onClick={() => setActiveTab('history')}
                  className={`flex-1 py-3 px-4 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === 'history'
                      ? 'border-teal-500 text-teal-600 dark:text-teal-400 bg-white dark:bg-gray-800'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  History
                </button>
              )}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-auto">
            {activeTab === 'info' && (
              <div className="p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Document Details</h3>
                <dl className="space-y-3">
                  <div className="flex justify-between">
                    <dt className="text-sm text-gray-500 dark:text-gray-400">Type:</dt>
                    <dd className="text-sm text-gray-900 dark:text-white font-medium">{document.type}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm text-gray-500 dark:text-gray-400">File Type:</dt>
                    <dd className="text-sm text-gray-900 dark:text-white font-medium uppercase">{document.fileType}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm text-gray-500 dark:text-gray-400">Department:</dt>
                    <dd className="text-sm text-gray-900 dark:text-white font-medium">{document.department}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm text-gray-500 dark:text-gray-400">Access Level:</dt>
                    <dd className="text-sm text-gray-900 dark:text-white font-medium capitalize">{document.accessType}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm text-gray-500 dark:text-gray-400">Upload Date:</dt>
                    <dd className="text-sm text-gray-900 dark:text-white font-medium">
                      {new Date(document.uploadedAt).toLocaleDateString()}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm text-gray-500 dark:text-gray-400">Last Modified:</dt>
                    <dd className="text-sm text-gray-900 dark:text-white font-medium">
                      {new Date(document.lastModified).toLocaleDateString()}
                    </dd>
                  </div>
                </dl>

                <h3 className="font-semibold text-gray-900 dark:text-white mb-4 mt-6">Access & Permissions</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-sm border border-gray-200 dark:border-gray-700">
                    <span className="text-sm text-gray-700 dark:text-gray-300">Public Access</span>
                    <span className={`text-xs px-2 py-1 rounded-sm font-medium ${
                      document.accessType === 'public' 
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' 
                        : 'bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-400'
                    }`}>
                      {document.accessType === 'public' ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-sm border border-gray-200 dark:border-gray-700">
                    <span className="text-sm text-gray-700 dark:text-gray-300">Department Access</span>
                    <span className={`text-xs px-2 py-1 rounded-sm font-medium ${
                      document.accessType === 'department' || document.accessType === 'public'
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' 
                        : 'bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-400'
                    }`}>
                      {document.accessType === 'department' || document.accessType === 'public' ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-sm border border-gray-200 dark:border-gray-700">
                    <span className="text-sm text-gray-700 dark:text-gray-300">Download Allowed</span>
                    <span className="text-xs px-2 py-1 rounded-sm font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                      Yes
                    </span>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'history' && showHistoryTab && (
              <div className="p-6">
                <AuditTrail auditLogs={auditLogs} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}