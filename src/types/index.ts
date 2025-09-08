export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'employee';
  department: string;
  avatar?: string;
}

export interface Document {
  id: string;
  title: string;
  type: 'SOP' | 'Policy' | 'Manual' | 'Guide' | 'Form';
  fileType: 'pdf' | 'doc' | 'docx' | 'xls' | 'xlsx' | 'image';
  department: string;
  uploadedBy: string;
  uploadedAt: Date;
  lastModified: Date;
  accessType: 'public' | 'department' | 'restricted';
  approvalStatus: 'pending' | 'approved' | 'rejected';
  approvedBy?: string;
  approvedAt?: Date;
  tags: string[];
  description: string;
  url: string;
  thumbnail?: string;
}

export interface Department {
  id: string;
  name: string;
  color: string;
  documentCount: number;
}

export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  documentId: string;
  documentTitle: string;
  action: 'view' | 'download' | 'approve' | 'reject' | 'upload';
  timestamp: Date;
}

export interface NotificationSettings {
  emailOnApproval: boolean;
  emailOnNewDocument: boolean;
  emailOnDocumentUpdate: boolean;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
  userId: string;
}