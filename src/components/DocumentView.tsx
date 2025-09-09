import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Download, Share2, CheckCircle, XCircle, Eye, Copy, Calendar, User, Building2, Tag, FileText, Clock, AlertCircle, CalendarX, Users, Send } from 'lucide-react';
import { Document, User as UserType, AuditLog } from '../types';
import { mockDocumentAcceptances, mockUsers } from '../data/mockData';
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
  const [showAcceptanceDetails, setShowAcceptanceDetails] = useState(false);
  
  const canApprove = user.role !== 'employee' && document.approvalStatus === 'pending';
  const showHistoryTab = user.role !== 'employee';
  
  // Get acceptances for this document
  const documentAcceptances = mockDocumentAcceptances.filter(
    acceptance => acceptance.documentId === document.id
  );
  
  const acceptedUserIds = documentAcceptances.map(acceptance => acceptance.userId);
  const allEmployees = mockUsers.filter(u => u.role === 'employee');
  const pendingEmployees = allEmployees.filter(emp => !acceptedUserIds.includes(emp.id));
  
  const handleSendNotifications = () => {
    console.log('Sending notifications to employees who haven\'t accepted:', pendingEmployees);
    alert(`Notifications sent to ${pendingEmployees.length} employees who haven't accepted this document.`);
  };

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
        // Use HTML preview if available, otherwise use original PDF
        const previewUrl = document.htmlPreviewUrl || document.url;
        return (
          <div className="w-full h-full bg-gray-100 dark:bg-gray-700 relative">
            <iframe
              src={previewUrl}
              className="w-full h-full border-none"
              title={document.htmlPreviewUrl ? `HTML Preview of ${document.title}` : `Preview of ${document.title}`}
              onError={(e) => {
                console.error('Preview failed to load:', e);
                // Fallback to placeholder if preview fails to load
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
                <p className="text-gray-600 dark:text-gray-300 font-medium">Document Preview</p>
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
                    src="/fsm-icon.png" 
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
              <a
                href={document.url}
                download={document.title}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Download</span>
              </a>
              
              <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                <Copy className="w-4 h-4" />
                <span>Copy Link</span>
              </button>
              
              {canApprove && (
                <>
                  <button
                    onClick={onReject}
                    className="px-4 py-2 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 rounded-sm hover:bg-orange-200 dark:hover:bg-orange-900/50 transition-colors"
                  >
                    Send Feedback
                  </button>
                  <button
                    onClick={onApprove}
                    className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-sm hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors text-sm font-medium"
                  >
                    Approve and Acknowledge
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
                  
                  {document.expiryDate && (
                    <div className="flex justify-between">
                      <dt className="text-sm text-gray-500 dark:text-gray-400">Expiry Date:</dt>
                      <dd className={`text-sm font-medium ${
                        new Date(document.expiryDate) < new Date() ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-white'
                      }`}>
                        {new Date(document.expiryDate).toLocaleDateString()}
                        {new Date(document.expiryDate) < new Date() && (
                          <span className="ml-2 px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs rounded-sm">
                            EXPIRED
                          </span>
                        )}
                      </dd>
                    </div>
                  )}
                  
                  {document.requiresAcceptance && (
                    <div className="flex justify-between">
                      <dt className="text-sm text-gray-500 dark:text-gray-400">Requires Acceptance:</dt>
                      <dd className="text-sm text-green-600 dark:text-green-400 font-medium">Yes</dd>
                    </div>
                  )}
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
                
                {/* Employee Acceptance Section */}
                {document.requiresAcceptance && user.role !== 'employee' && (
                  <>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-4 mt-6">Employee Acceptance</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-sm border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">Accepted</span>
                        </div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {documentAcceptances.length} employees
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-sm border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-orange-500" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">Pending</span>
                        </div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {pendingEmployees.length} employees
                        </span>
                      </div>
                      
                      <button
                        onClick={() => setShowAcceptanceDetails(!showAcceptanceDetails)}
                        className="w-full p-3 bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 rounded-sm hover:bg-teal-100 dark:hover:bg-teal-900/50 transition-colors text-sm font-medium"
                      >
                        {showAcceptanceDetails ? 'Hide Details' : 'View Details'}
                      </button>
                      
                      {showAcceptanceDetails && (
                        <div className="space-y-3 mt-3">
                          {/* Accepted Employees */}
                          {documentAcceptances.length > 0 && (
                            <div>
                              <h4 className="text-sm font-medium text-green-600 dark:text-green-400 mb-2">
                                ✓ Accepted ({documentAcceptances.length})
                              </h4>
                              <div className="space-y-2">
                                {documentAcceptances.map((acceptance) => (
                                  <div key={acceptance.id} className="flex items-center justify-between p-2 bg-green-50 dark:bg-green-900/20 rounded border border-green-200 dark:border-green-800">
                                    <div>
                                      <span className="text-sm font-medium text-gray-900 dark:text-white">{acceptance.userName}</span>
                                      <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">{acceptance.userEmail}</span>
                                    </div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">
                                      {new Date(acceptance.acceptedAt).toLocaleDateString()}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {/* Pending Employees */}
                          {pendingEmployees.length > 0 && (
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="text-sm font-medium text-orange-600 dark:text-orange-400">
                                  ⏳ Pending ({pendingEmployees.length})
                                </h4>
                                <button
                                  onClick={handleSendNotifications}
                                  className="flex items-center space-x-1 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded text-xs font-medium hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                                >
                                  <Send className="w-3 h-3" />
                                  <span>Send Reminders</span>
                                </button>
                              </div>
                              <div className="space-y-2">
                                {pendingEmployees.map((employee) => (
                                  <div key={employee.id} className="flex items-center justify-between p-2 bg-orange-50 dark:bg-orange-900/20 rounded border border-orange-200 dark:border-orange-800">
                                    <div>
                                      <span className="text-sm font-medium text-gray-900 dark:text-white">{employee.name}</span>
                                      <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">{employee.email}</span>
                                    </div>
                                    <span className="text-xs text-orange-600 dark:text-orange-400 font-medium">Not Signed</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </>
                )}
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