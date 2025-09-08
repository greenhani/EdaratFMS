import React from 'react';
import { Eye, Download, Upload, CheckCircle, XCircle, Clock } from 'lucide-react';
import { AuditLog } from '../types';

interface AuditTrailProps {
  auditLogs: AuditLog[];
}

export default function AuditTrail({ auditLogs }: AuditTrailProps) {
  const getActionIcon = (action: string) => {
    switch (action) {
      case 'view':
        return <Eye className="w-5 h-5 text-blue-500" />;
      case 'download':
        return <Download className="w-5 h-5 text-green-500" />;
      case 'upload':
        return <Upload className="w-5 h-5 text-purple-500" />;
      case 'approve':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'reject':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'view':
        return 'text-blue-700 bg-blue-50';
      case 'download':
        return 'text-green-700 bg-green-50';
      case 'upload':
        return 'text-purple-700 bg-purple-50';
      case 'approve':
        return 'text-green-700 bg-green-50';
      case 'reject':
        return 'text-red-700 bg-red-50';
      default:
        return 'text-gray-700 bg-gray-50';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">Audit Trail</h2>
        <p className="text-sm text-gray-500 mt-1">Complete log of document activities</p>
      </div>

      <div className="divide-y divide-gray-100">
        {auditLogs.length === 0 ? (
          <div className="p-8 text-center">
            <Clock className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No audit logs available</p>
          </div>
        ) : (
          auditLogs.map((log) => (
            <div key={log.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  {getActionIcon(log.action)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-gray-900">{log.userName}</span>
                      <span
                        className={`px-2 py-1 rounded-md text-xs font-medium capitalize ${getActionColor(log.action)}`}
                      >
                        {log.action}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(log.timestamp).toLocaleDateString()} at{' '}
                      {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  
                  <p className="text-gray-700">
                    <span className="capitalize">{log.action}ed</span> document:{' '}
                    <span className="font-medium text-gray-900">{log.documentTitle}</span>
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      
      {auditLogs.length > 0 && (
        <div className="p-4 border-t border-gray-200 text-center">
          <button className="text-teal-600 hover:text-teal-700 font-medium text-sm">
            Load More
          </button>
        </div>
      )}
    </div>
  );
}