'use client';

import { useState } from 'react';

interface AuthModalProps {
  onAuthSuccess: (token: string, email: string) => void;
}

export default function AuthModal({ onAuthSuccess }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({ 
    email: '', 
    password: '', 
    name: '',
    role: 'member' // Default fallback role
  });

  async function handleAuth(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      
      // Auto-assign admin privilege if email contains 'admin' string as a developer convenience
      const assignedRole = formData.email.toLowerCase().includes('admin') ? 'admin' : formData.role;

      const payload = isLogin
        ? { email: formData.email, password: formData.password }
        : { ...formData, role: assignedRole };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || 'Authentication failed');
      }

      // Store token, email, and user permissions securely inside storage blocks
      localStorage.setItem('token', data.token);
      localStorage.setItem('userEmail', formData.email);
      localStorage.setItem('userName', data.user?.name || formData.name || formData.email.split('@')[0]);
      
      // Save role returned by backend database, or match assigned validation flags
      const finalRole = data.user?.role || data.role || assignedRole;
      localStorage.setItem('userRole', finalRole);

      onAuthSuccess(data.token, formData.email);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('[v0] Auth error:', err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-neutral-950 border border-neutral-900 rounded-xl shadow-2xl max-w-md w-full p-8 text-white">
      <h2 className="text-2xl font-bold text-white mb-6 text-center tracking-tight">
        {isLogin ? 'Internal System Access' : 'Register Club Account'}
      </h2>

      <form onSubmit={handleAuth} className="space-y-4">
        {!isLogin && (
          <div>
            <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Your name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2.5 bg-black border border-neutral-800 rounded-lg text-white placeholder:text-neutral-600 focus:outline-none focus:border-emerald-500 transition-all text-sm"
              required
            />
          </div>
        )}

        <div>
          <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">
            Email Address
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-2.5 bg-black border border-neutral-800 rounded-lg text-white placeholder:text-neutral-600 focus:outline-none focus:border-emerald-500 transition-all text-sm"
            required
          />
          {!isLogin && (
            <p className="text-[10px] text-neutral-500 font-mono mt-1">
              💡 Tip: Using an email with "admin" (e.g., admin@club.com) elevates access.
            </p>
          )}
        </div>

        <div>
          <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full px-4 py-2.5 bg-black border border-neutral-800 rounded-lg text-white placeholder:text-neutral-600 focus:outline-none focus:border-emerald-500 transition-all text-sm"
            required
          />
        </div>

        {/* Role Picker Selection Field (Only visible during Registration) */}
        {!isLogin && (
          <div>
            <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">
              Account Clearance Level
            </label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full px-4 py-2.5 bg-black border border-neutral-800 rounded-lg text-neutral-300 focus:outline-none focus:border-emerald-500 transition-all text-sm"
            >
              <option value="member">Club Member (Claim & Track Tasks)</option>
              <option value="admin">Club Admin (Full Board Control)</option>
            </select>
          </div>
        )}

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-red-400 font-mono text-xs">
            ⚠️ {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2.5 bg-emerald-500 text-black font-bold text-sm rounded-lg hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-mono"
        >
          {loading ? 'Processing Operations...' : isLogin ? 'Authenticate Session' : 'Generate Account Node'}
        </button>
      </form>

      <div className="mt-6 text-center text-xs font-mono">
        <span className="text-neutral-500">
          {isLogin ? "Need platform access? " : 'Possess existing keys? '}
        </span>
        <button
          type="button"
          onClick={() => {
            setIsLogin(!isLogin);
            setError('');
            setFormData({ email: '', password: '', name: '', role: 'member' });
          }}
          className="text-emerald-400 hover:underline"
        >
          {isLogin ? 'Sign Up' : 'Sign In'}
        </button>
      </div>
    </div>
  );
}