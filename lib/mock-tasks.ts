// Mock data for demonstration purposes
// Replace with real API calls in production

export const mockTasks = [
  {
    _id: '1',
    title: 'Design Login Page UI',
    description: 'Create a beautiful and responsive login page with dark mode support',
    priority: 'high' as const,
    status: 'todo' as const,
    assignedTo: '',
    createdBy: { name: 'Admin', email: 'admin@example.com' },
    rewardCoins: 50,
  },
  {
    _id: '2',
    title: 'Setup Database Schema',
    description: 'Configure MongoDB schema for users, tasks, and comments',
    priority: 'high' as const,
    status: 'todo' as const,
    assignedTo: '',
    createdBy: { name: 'Admin', email: 'admin@example.com' },
    rewardCoins: 75,
  },
  {
    _id: '3',
    title: 'Fix API Validation',
    description: 'Add proper input validation to all API endpoints',
    priority: 'medium' as const,
    status: 'todo' as const,
    assignedTo: '',
    createdBy: { name: 'Admin', email: 'admin@example.com' },
    rewardCoins: 30,
  },
  {
    _id: '4',
    title: 'Implement Real-time Notifications',
    description: 'Add WebSocket support for real-time task updates',
    priority: 'low' as const,
    status: 'inprogress' as const,
    assignedTo: 'dev@example.com',
    createdBy: { name: 'Admin', email: 'admin@example.com' },
    rewardCoins: 60,
  },
  {
    _id: '5',
    title: 'Test Payment Integration',
    description: 'Verify Stripe payment gateway integration end-to-end',
    priority: 'high' as const,
    status: 'inprogress' as const,
    assignedTo: 'qa@example.com',
    createdBy: { name: 'Admin', email: 'admin@example.com' },
    rewardCoins: 80,
  },
  {
    _id: '6',
    title: 'Documentation Update',
    description: 'Update API documentation with new endpoints',
    priority: 'medium' as const,
    status: 'inprogress' as const,
    assignedTo: 'doc@example.com',
    createdBy: { name: 'Admin', email: 'admin@example.com' },
    rewardCoins: 25,
  },
  {
    _id: '7',
    title: 'Deploy to Production',
    description: 'Release v1.0 to production environment',
    priority: 'high' as const,
    status: 'done' as const,
    assignedTo: 'deploy@example.com',
    createdBy: { name: 'Admin', email: 'admin@example.com' },
    rewardCoins: 100,
  },
  {
    _id: '8',
    title: 'User Feedback Collection',
    description: 'Gather feedback from initial users on the platform',
    priority: 'medium' as const,
    status: 'done' as const,
    assignedTo: 'feedback@example.com',
    createdBy: { name: 'Admin', email: 'admin@example.com' },
    rewardCoins: 40,
  },
  {
    _id: '9',
    title: 'Performance Optimization',
    description: 'Optimize database queries and API response times',
    priority: 'medium' as const,
    status: 'done' as const,
    assignedTo: 'perf@example.com',
    createdBy: { name: 'Admin', email: 'admin@example.com' },
    rewardCoins: 45,
  },
];

export function getMockTasks() {
  return mockTasks;
}

export function getMockTaskById(id: string) {
  return mockTasks.find((task) => task._id === id);
}
