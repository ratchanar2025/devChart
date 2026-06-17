'use client';

import { useEffect, useState } from 'react';
import AuthModal from '@/components/kanban/auth-modal';
import PremiumKanbanBoard from '@/components/kanban/premium-kanban';

export default function Page() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for existing token on mount (client-side only)
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  // Handle successful authentication
  const handleAuthSuccess = (token: string, email: string) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userEmail', email);
    setIsAuthenticated(true);
  };

  // If not authenticated, show auth modal
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <AuthModal onAuthSuccess={handleAuthSuccess} />
      </div>
    );
  }

  // If authenticated, show the full kanban board with analytics and announcements
  return <PremiumKanbanBoard />;
}
