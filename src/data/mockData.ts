import { User, Document, Department, AuditLog, Notification } from '../types';
import { DocumentAcceptance } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'fms-admin@edaratgroup.com',
    role: 'admin',
    department: 'Information Technology',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
  },
  {
    id: '2', 
    name: 'Ahmed Al-Rashid',
    email: 'fms-hr@edaratgroup.com',
    role: 'manager',
    department: 'Human Resources',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
  },
  {
    id: '3',
    name: 'Fatima Al-Zahra', 
    email: 'fms-em001@edaratgroup.com',
    role: 'employee',
    department: 'Human Resources',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
  }
];

export const mockUser: User = mockUsers[0];

export const mockDocuments: Document[] = [
  {
    id: '1',
    title: 'Employee Handbook 2024',
    type: 'Manual',
    fileType: 'pdf',
    department: 'Human Resources',
    uploadedBy: 'Sarah Johnson',
    uploadedAt: new Date('2024-01-15'),
    lastModified: new Date('2024-01-15'),
    accessType: 'public',
    approvalStatus: 'approved',
    tags: ['handbook', 'policies', 'hr'],
    description: 'Comprehensive guide for all employees covering company policies, procedures, and benefits.',
    url: '/documents/employee-handbook-2024.pdf',
    expiryDate: new Date('2025-12-31'),
    requiresAcceptance: true
  },
  {
    id: '2',
    title: 'IT Security Policy',
    type: 'Policy',
    fileType: 'docx',
    department: 'Information Technology',
    uploadedBy: 'Ahmed Al-Rashid',
    uploadedAt: new Date('2024-01-20'),
    lastModified: new Date('2024-01-20'),
    accessType: 'department',
    approvalStatus: 'pending',
    tags: ['security', 'it', 'compliance'],
    description: 'Security protocols and guidelines for all IT systems and data handling.',
    url: '/documents/it-security-policy.docx',
    expiryDate: new Date('2025-06-30'),
    requiresAcceptance: true
  },
  {
    id: '3',
    title: 'Financial Report Q1 2024',
    type: 'Form',
    fileType: 'xlsx',
    department: 'Finance',
    uploadedBy: 'Fatima Al-Zahra',
    uploadedAt: new Date('2024-02-01'),
    lastModified: new Date('2024-02-01'),
    accessType: 'restricted',
    approvalStatus: 'approved',
    tags: ['financial', 'quarterly', 'report'],
    description: 'First quarter financial performance and budget analysis.',
    url: '/documents/financial-report-q1-2024.xlsx'
  },
  {
    id: '4',
    title: 'Emergency Response Procedures',
    type: 'SOP',
    fileType: 'pdf',
    department: 'Operations',
    uploadedBy: 'Sarah Johnson',
    uploadedAt: new Date('2024-01-10'),
    lastModified: new Date('2024-01-10'),
    accessType: 'public',
    approvalStatus: 'approved',
    tags: ['emergency', 'safety', 'procedures'],
    description: 'Step-by-step emergency response and evacuation procedures.',
    url: '/documents/emergency-response.pdf',
    expiryDate: new Date('2025-03-31'),
    requiresAcceptance: true
  },
  {
    id: '5',
    title: 'Marketing Strategy 2024',
    type: 'Guide',
    fileType: 'docx',
    department: 'Marketing',
    uploadedBy: 'Ahmed Al-Rashid',
    uploadedAt: new Date('2024-01-25'),
    lastModified: new Date('2024-01-25'),
    accessType: 'department',
    approvalStatus: 'pending',
    tags: ['marketing', 'strategy', '2024'],
    description: 'Comprehensive marketing strategy and campaign planning for 2024.',
    url: '/documents/marketing-strategy-2024.docx'
  },
  // Additional Human Resources Documents
  {
    id: '6',
    title: 'Performance Review Guidelines',
    type: 'Manual',
    fileType: 'pdf',
    department: 'Human Resources',
    uploadedBy: 'Ahmed Al-Rashid',
    uploadedAt: new Date('2024-01-12'),
    lastModified: new Date('2024-01-12'),
    accessType: 'department',
    approvalStatus: 'approved',
    tags: ['performance', 'review', 'hr', 'evaluation'],
    description: 'Complete guide for conducting employee performance reviews and evaluations.',
    url: '/documents/performance-review-guidelines.pdf'
  },
  {
    id: '7',
    title: 'Remote Work Policy',
    type: 'Policy',
    fileType: 'docx',
    department: 'Human Resources',
    uploadedBy: 'Sarah Johnson',
    uploadedAt: new Date('2024-01-18'),
    lastModified: new Date('2024-01-18'),
    accessType: 'public',
    approvalStatus: 'approved',
    tags: ['remote', 'work', 'policy', 'flexible'],
    description: 'Guidelines and requirements for remote work arrangements and hybrid schedules.',
    url: '/documents/remote-work-policy.docx',
    expiryDate: new Date('2025-08-31'),
    requiresAcceptance: true
  },
  {
    id: '8',
    title: 'Benefits Enrollment Guide',
    type: 'Guide',
    fileType: 'pdf',
    department: 'Human Resources',
    uploadedBy: 'Fatima Al-Zahra',
    uploadedAt: new Date('2024-01-08'),
    lastModified: new Date('2024-01-08'),
    accessType: 'public',
    approvalStatus: 'approved',
    tags: ['benefits', 'enrollment', 'health', 'insurance'],
    description: 'Step-by-step guide for employee benefits enrollment and coverage options.',
    url: '/documents/benefits-enrollment-guide.pdf',
    expiryDate: new Date('2025-11-30'),
    requiresAcceptance: true,
    notifyAllAfterApproval: true
  },
  {
    id: '9',
    title: 'Onboarding Checklist Template',
    type: 'Form',
    fileType: 'xlsx',
    department: 'Human Resources',
    uploadedBy: 'Ahmed Al-Rashid',
    uploadedAt: new Date('2024-01-22'),
    lastModified: new Date('2024-01-22'),
    accessType: 'department',
    approvalStatus: 'pending',
    tags: ['onboarding', 'checklist', 'new hire'],
    description: 'Template checklist for new employee onboarding process and documentation.',
    url: '/documents/onboarding-checklist.xlsx'
  },
  // Additional Information Technology Documents
  {
    id: '10',
    title: 'Software Installation Guidelines',
    type: 'SOP',
    fileType: 'pdf',
    department: 'Information Technology',
    uploadedBy: 'Sarah Johnson',
    uploadedAt: new Date('2024-01-14'),
    lastModified: new Date('2024-01-14'),
    accessType: 'department',
    approvalStatus: 'approved',
    tags: ['software', 'installation', 'procedures', 'it'],
    description: 'Standard procedures for software installation and approval process.',
    url: '/documents/software-installation-guidelines.pdf'
  },
  {
    id: '11',
    title: 'Network Access Procedures',
    type: 'SOP',
    fileType: 'docx',
    department: 'Information Technology',
    uploadedBy: 'Ahmed Al-Rashid',
    uploadedAt: new Date('2024-01-16'),
    lastModified: new Date('2024-01-16'),
    accessType: 'restricted',
    approvalStatus: 'approved',
    tags: ['network', 'access', 'security', 'vpn'],
    description: 'Procedures for network access requests, VPN setup, and security protocols.',
    url: '/documents/network-access-procedures.docx'
  },
  {
    id: '12',
    title: 'Data Backup Protocol',
    type: 'Manual',
    fileType: 'pdf',
    department: 'Information Technology',
    uploadedBy: 'Sarah Johnson',
    uploadedAt: new Date('2024-01-11'),
    lastModified: new Date('2024-01-11'),
    accessType: 'department',
    approvalStatus: 'approved',
    tags: ['backup', 'data', 'recovery', 'protocol'],
    description: 'Comprehensive data backup and disaster recovery protocols.',
    url: '/documents/data-backup-protocol.pdf'
  },
  {
    id: '13',
    title: 'IT Help Desk Manual',
    type: 'Manual',
    fileType: 'docx',
    department: 'Information Technology',
    uploadedBy: 'Fatima Al-Zahra',
    uploadedAt: new Date('2024-01-19'),
    lastModified: new Date('2024-01-19'),
    accessType: 'department',
    approvalStatus: 'pending',
    tags: ['helpdesk', 'support', 'troubleshooting'],
    description: 'Complete manual for IT help desk operations and troubleshooting procedures.',
    url: '/documents/it-helpdesk-manual.docx'
  },
  // Additional Finance Documents
  {
    id: '14',
    title: 'Expense Reimbursement Policy',
    type: 'Policy',
    fileType: 'pdf',
    department: 'Finance',
    uploadedBy: 'Ahmed Al-Rashid',
    uploadedAt: new Date('2024-01-13'),
    lastModified: new Date('2024-01-13'),
    accessType: 'public',
    approvalStatus: 'approved',
    tags: ['expense', 'reimbursement', 'policy', 'finance'],
    description: 'Policy and procedures for employee expense reimbursement and approvals.',
    url: '/documents/expense-reimbursement-policy.pdf'
  },
  {
    id: '15',
    title: 'Budget Planning Template',
    type: 'Form',
    fileType: 'xlsx',
    department: 'Finance',
    uploadedBy: 'Sarah Johnson',
    uploadedAt: new Date('2024-01-17'),
    lastModified: new Date('2024-01-17'),
    accessType: 'department',
    approvalStatus: 'approved',
    tags: ['budget', 'planning', 'template', 'finance'],
    description: 'Template for annual budget planning and departmental expense forecasting.',
    url: '/documents/budget-planning-template.xlsx'
  },
  {
    id: '16',
    title: 'Quarterly Tax Guidelines',
    type: 'Guide',
    fileType: 'docx',
    department: 'Finance',
    uploadedBy: 'Fatima Al-Zahra',
    uploadedAt: new Date('2024-01-21'),
    lastModified: new Date('2024-01-21'),
    accessType: 'restricted',
    approvalStatus: 'pending',
    tags: ['tax', 'quarterly', 'guidelines', 'compliance'],
    description: 'Guidelines for quarterly tax reporting and compliance requirements.',
    url: '/documents/quarterly-tax-guidelines.docx'
  },
  {
    id: '17',
    title: 'Financial Audit Checklist',
    type: 'Form',
    fileType: 'xlsx',
    department: 'Finance',
    uploadedBy: 'Ahmed Al-Rashid',
    uploadedAt: new Date('2024-01-24'),
    lastModified: new Date('2024-01-24'),
    accessType: 'restricted',
    approvalStatus: 'approved',
    tags: ['audit', 'checklist', 'compliance', 'finance'],
    description: 'Comprehensive checklist for internal and external financial audits.',
    url: '/documents/financial-audit-checklist.xlsx'
  },
  // Additional Operations Documents
  {
    id: '18',
    title: 'Quality Control Manual',
    type: 'Manual',
    fileType: 'pdf',
    department: 'Operations',
    uploadedBy: 'Sarah Johnson',
    uploadedAt: new Date('2024-01-09'),
    lastModified: new Date('2024-01-09'),
    accessType: 'department',
    approvalStatus: 'approved',
    tags: ['quality', 'control', 'manual', 'operations'],
    description: 'Complete quality control procedures and standards for operations.',
    url: '/documents/quality-control-manual.pdf'
  },
  {
    id: '19',
    title: 'Supply Chain Management SOP',
    type: 'SOP',
    fileType: 'docx',
    department: 'Operations',
    uploadedBy: 'Ahmed Al-Rashid',
    uploadedAt: new Date('2024-01-15'),
    lastModified: new Date('2024-01-15'),
    accessType: 'department',
    approvalStatus: 'approved',
    tags: ['supply chain', 'management', 'procurement'],
    description: 'Standard operating procedures for supply chain and procurement management.',
    url: '/documents/supply-chain-sop.docx'
  },
  {
    id: '20',
    title: 'Equipment Maintenance Schedule',
    type: 'Form',
    fileType: 'xlsx',
    department: 'Operations',
    uploadedBy: 'Fatima Al-Zahra',
    uploadedAt: new Date('2024-01-23'),
    lastModified: new Date('2024-01-23'),
    accessType: 'department',
    approvalStatus: 'pending',
    tags: ['equipment', 'maintenance', 'schedule', 'operations'],
    description: 'Scheduled maintenance calendar and procedures for all operational equipment.',
    url: '/documents/equipment-maintenance-schedule.xlsx'
  },
  {
    id: '21',
    title: 'Safety Training Manual',
    type: 'Manual',
    fileType: 'pdf',
    department: 'Operations',
    uploadedBy: 'Sarah Johnson',
    uploadedAt: new Date('2024-01-26'),
    lastModified: new Date('2024-01-26'),
    accessType: 'public',
    approvalStatus: 'approved',
    tags: ['safety', 'training', 'manual', 'workplace'],
    description: 'Comprehensive workplace safety training manual and procedures.',
    url: '/documents/safety-training-manual.pdf'
  },
  // Additional Marketing Documents
  {
    id: '22',
    title: 'Brand Guidelines Document',
    type: 'Guide',
    fileType: 'pdf',
    department: 'Marketing',
    uploadedBy: 'Fatima Al-Zahra',
    uploadedAt: new Date('2024-01-12'),
    lastModified: new Date('2024-01-12'),
    accessType: 'department',
    approvalStatus: 'approved',
    tags: ['brand', 'guidelines', 'marketing', 'design'],
    description: 'Official brand guidelines including logos, colors, fonts, and usage rules.',
    url: '/documents/brand-guidelines.pdf'
  },
  {
    id: '23',
    title: 'Social Media Content Calendar',
    type: 'Form',
    fileType: 'xlsx',
    department: 'Marketing',
    uploadedBy: 'Ahmed Al-Rashid',
    uploadedAt: new Date('2024-01-18'),
    lastModified: new Date('2024-01-18'),
    accessType: 'department',
    approvalStatus: 'pending',
    tags: ['social media', 'content', 'calendar', 'marketing'],
    description: 'Monthly content calendar for social media posts and campaigns.',
    url: '/documents/social-media-calendar.xlsx'
  },
  {
    id: '24',
    title: 'Campaign Performance Report',
    type: 'Form',
    fileType: 'xlsx',
    department: 'Marketing',
    uploadedBy: 'Sarah Johnson',
    uploadedAt: new Date('2024-01-20'),
    lastModified: new Date('2024-01-20'),
    accessType: 'department',
    approvalStatus: 'approved',
    tags: ['campaign', 'performance', 'report', 'analytics'],
    description: 'Quarterly marketing campaign performance analysis and metrics.',
    url: '/documents/campaign-performance-report.xlsx'
  },
  {
    id: '25',
    title: 'Customer Segmentation Analysis',
    type: 'Guide',
    fileType: 'docx',
    department: 'Marketing',
    uploadedBy: 'Fatima Al-Zahra',
    uploadedAt: new Date('2024-01-27'),
    lastModified: new Date('2024-01-27'),
    accessType: 'restricted',
    approvalStatus: 'approved',
    tags: ['customer', 'segmentation', 'analysis', 'marketing'],
    description: 'Detailed customer segmentation analysis and targeting strategies.',
    url: '/documents/customer-segmentation.docx'
  },
  // Additional Legal Documents
  {
    id: '26',
    title: 'Contract Review Checklist',
    type: 'Form',
    fileType: 'pdf',
    department: 'Legal',
    uploadedBy: 'Ahmed Al-Rashid',
    uploadedAt: new Date('2024-01-11'),
    lastModified: new Date('2024-01-11'),
    accessType: 'department',
    approvalStatus: 'approved',
    tags: ['contract', 'review', 'checklist', 'legal'],
    description: 'Comprehensive checklist for contract review and approval process.',
    url: '/documents/contract-review-checklist.pdf'
  },
  {
    id: '27',
    title: 'Compliance Training Manual',
    type: 'Manual',
    fileType: 'docx',
    department: 'Legal',
    uploadedBy: 'Sarah Johnson',
    uploadedAt: new Date('2024-01-16'),
    lastModified: new Date('2024-01-16'),
    accessType: 'public',
    approvalStatus: 'approved',
    tags: ['compliance', 'training', 'legal', 'regulations'],
    description: 'Training manual for regulatory compliance and legal requirements.',
    url: '/documents/compliance-training-manual.docx'
  },
  {
    id: '28',
    title: 'Privacy Policy Updates',
    type: 'Policy',
    fileType: 'pdf',
    department: 'Legal',
    uploadedBy: 'Fatima Al-Zahra',
    uploadedAt: new Date('2024-01-19'),
    lastModified: new Date('2024-01-19'),
    accessType: 'public',
    approvalStatus: 'pending',
    tags: ['privacy', 'policy', 'updates', 'gdpr'],
    description: 'Updated privacy policy reflecting new data protection regulations.',
    url: '/documents/privacy-policy-updates.pdf'
  },
  {
    id: '29',
    title: 'Intellectual Property Guide',
    type: 'Guide',
    fileType: 'docx',
    department: 'Legal',
    uploadedBy: 'Ahmed Al-Rashid',
    uploadedAt: new Date('2024-01-25'),
    lastModified: new Date('2024-01-25'),
    accessType: 'department',
    approvalStatus: 'approved',
    tags: ['intellectual property', 'ip', 'guide', 'legal'],
    description: 'Guide to intellectual property protection and trademark procedures.',
    url: '/documents/ip-guide.docx'
  },
  // Web Privacy Policy Document
  {
    id: '30',
    title: 'Web Privacy Policy',
    type: 'Policy',
    fileType: 'pdf',
    department: 'Legal',
    uploadedBy: 'Sarah Johnson',
    uploadedAt: new Date('2024-01-28'),
    lastModified: new Date('2024-01-28'),
    accessType: 'public',
    approvalStatus: 'approved',
    tags: ['privacy', 'policy', 'web', 'gdpr', 'compliance'],
    description: 'Comprehensive web privacy policy outlining data collection, usage, and user rights.',
    url: '/Web-Privacy-Policy.pdf',
    htmlPreviewUrl: '/Web-Privacy-Policy.html',
    expiryDate: new Date('2026-01-28'),
    requiresAcceptance: true
  }
];

export const mockDocumentAcceptances: DocumentAcceptance[] = [
  {
    id: '1',
    documentId: '1', // Employee Handbook 2024
    userId: '2',
    userName: 'Ahmed Al-Rashid',
    userEmail: 'fms-hr@edaratgroup.com',
    acceptedAt: new Date('2024-01-16T10:30:00'),
    acceptanceType: 'signed'
  },
  {
    id: '2',
    documentId: '7', // Remote Work Policy
    userId: '3',
    userName: 'Fatima Al-Zahra',
    userEmail: 'fms-em001@edaratgroup.com',
    acceptedAt: new Date('2024-01-19T14:20:00'),
    acceptanceType: 'acknowledged'
  },
  {
    id: '3',
    documentId: '1', // Employee Handbook 2024
    userId: '1',
    userName: 'Sarah Johnson',
    userEmail: 'fms-admin@edaratgroup.com',
    acceptedAt: new Date('2024-01-15T11:45:00'),
    acceptanceType: 'signed'
  }
];

export const mockDepartments: Department[] = [
  {
    id: '1',
    name: 'Human Resources',
    color: '#3B82F6',
    documentCount: 5
  },
  {
    id: '2',
    name: 'Information Technology',
    color: '#10B981',
    documentCount: 4
  },
  {
    id: '3',
    name: 'Finance',
    color: '#F59E0B',
    documentCount: 4
  },
  {
    id: '4',
    name: 'Operations',
    color: '#EF4444',
    documentCount: 4
  },
  {
    id: '5',
    name: 'Marketing',
    color: '#8B5CF6',
    documentCount: 4
  },
  {
    id: '6',
    name: 'Legal',
    color: '#06B6D4',
    documentCount: 5
  }
];

export const mockAuditLogs: AuditLog[] = [
  {
    id: '1',
    userId: '1',
    userName: 'Sarah Johnson',
    documentId: '1',
    documentTitle: 'Employee Handbook 2024',
    action: 'approve',
    timestamp: new Date('2024-01-15T10:30:00')
  },
  {
    id: '2',
    userId: '2',
    userName: 'Ahmed Al-Rashid',
    documentId: '2',
    documentTitle: 'IT Security Policy',
    action: 'upload',
    timestamp: new Date('2024-01-20T14:20:00')
  },
  {
    id: '3',
    userId: '3',
    userName: 'Fatima Al-Zahra',
    documentId: '1',
    documentTitle: 'Employee Handbook 2024',
    action: 'view',
    timestamp: new Date('2024-01-21T09:15:00')
  },
  {
    id: '4',
    userId: '1',
    userName: 'Sarah Johnson',
    documentId: '3',
    documentTitle: 'Financial Report Q1 2024',
    action: 'approve',
    timestamp: new Date('2024-02-01T11:00:00')
  },
  {
    id: '5',
    userId: '2',
    userName: 'Ahmed Al-Rashid',
    documentId: '1',
    documentTitle: 'Employee Handbook 2024',
    action: 'download',
    timestamp: new Date('2024-01-22T16:45:00')
  }
];

export const mockNotifications: Record<string, Notification[]> = {
  admin: [
    {
      id: '1',
      title: 'New Documents Need Review',
      message: '3 documents uploaded and pending approval workflow setup',
      type: 'info',
      timestamp: new Date('2024-01-20T15:00:00'),
      read: false,
      actionUrl: '/documents',
      userId: '1'
    },
    {
      id: '2',
      title: 'System Backup Completed',
      message: 'Daily backup completed successfully',
      type: 'success',
      timestamp: new Date('2024-01-21T02:00:00'),
      read: true,
      userId: '1'
    },
    {
      id: '3',
      title: 'Storage Warning',
      message: 'Document storage is 85% full',
      type: 'warning',
      timestamp: new Date('2024-01-21T09:30:00'),
      read: false,
      userId: '1'
    },
    {
      id: '4',
      title: 'New User Registration',
      message: 'New employee account requires approval',
      type: 'info',
      timestamp: new Date('2024-01-21T11:20:00'),
      read: false,
      userId: '1'
    },
    {
      id: '5',
      title: 'Security Update',
      message: 'Critical security patch available',
      type: 'error',
      timestamp: new Date('2024-01-21T13:15:00'),
      read: false,
      userId: '1'
    }
  ],
  manager: [
    {
      id: '6',
      title: 'Document Approval Required',
      message: 'IT Security Policy requires your approval',
      type: 'warning',
      timestamp: new Date('2024-01-25T10:30:00'),
      read: false,
      actionUrl: '/documents/2',
      userId: '2'
    },
    {
      id: '7',
      title: 'Marketing Strategy Approval',
      message: 'Marketing Strategy 2024 awaits your approval',
      type: 'warning',
      timestamp: new Date('2024-01-24T14:20:00'),
      read: false,
      actionUrl: '/documents/5',
      userId: '2'
    },
    {
      id: '8',
      title: 'Department Report Due',
      message: 'Monthly HR report due in 3 days',
      type: 'info',
      timestamp: new Date('2024-01-21T08:00:00'),
      read: true,
      userId: '2'
    },
    {
      id: '9',
      title: 'New Policy Published',
      message: 'Emergency Response Procedures updated',
      type: 'info',
      timestamp: new Date('2024-01-10T14:45:00'),
      read: true,
      userId: '2'
    },
    {
      id: '10',
      title: 'Team Training Reminder',
      message: 'Security training scheduled for next week',
      type: 'info',
      timestamp: new Date('2024-01-21T16:20:00'),
      read: false,
      userId: '2'
    }
  ],
  employee: [
    {
      id: '10',
      title: 'New Document Available',
      message: 'Employee Handbook 2024 has been published',
      type: 'info',
      timestamp: new Date('2024-01-15T11:00:00'),
      read: true,
      userId: '3'
    },
    {
      id: '11',
      title: 'Training Reminder',
      message: 'Complete mandatory security training by Friday',
      type: 'warning',
      timestamp: new Date('2024-01-21T09:00:00'),
      read: false,
      userId: '3'
    },
    {
      id: '12',
      title: 'System Maintenance',
      message: 'Document system will be offline Sunday 2-4 AM',
      type: 'info',
      timestamp: new Date('2024-01-19T17:30:00'),
      read: true,
      userId: '3'
    },
    {
      id: '13',
      title: 'Document Updated',
      message: 'Emergency Response Procedures updated',
      type: 'info',
      timestamp: new Date('2024-01-10T15:00:00'),
      read: true,
      userId: '3'
    }
  ]
};

export const getUserNotifications = (userRole: 'admin' | 'manager' | 'employee'): Notification[] => {
  return mockNotifications[userRole] || [];
};