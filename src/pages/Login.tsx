import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, User, Lock, ArrowRight, AlertTriangle, Zap } from 'lucide-react';
import { CyberButton } from '@/components/ui/cyber-button';
import { CyberInput } from '@/components/ui/cyber-input';
import { CyberCard } from '@/components/ui/cyber-card';
import MatrixRain from '@/components/MatrixRain';
import HexagonPattern from '@/components/HexagonPattern';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Simulate authentication
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (formData.username && formData.password) {
      navigate('/dashboard');
    } else {
      setError('Invalid credentials. Access denied.');
    }
    setLoading(false);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Background Effects */}
      <MatrixRain opacity={0.03} />
      <HexagonPattern />
      
      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background pointer-events-none" />
      <div className="absolute inset-0 matrix-bg pointer-events-none" />
      
      {/* Animated grid */}
      <div className="absolute inset-0 cyber-grid pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-md px-6">
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 border-2 border-primary/30 mb-6 pulse-glow">
            <Shield className="w-10 h-10 text-primary" />
          </div>
          
          <h1 className="font-orbitron text-3xl md:text-4xl font-bold text-glow-primary mb-2">
            HONEYPOT
          </h1>
          <p className="font-orbitron text-sm uppercase tracking-[0.3em] text-muted-foreground">
            AI Scam Detection System
          </p>
        </div>

        {/* Login Card */}
        <CyberCard variant="glass" withCorners withScanline className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Status indicator */}
            <div className="flex items-center justify-center gap-2 py-2 px-4 bg-success/10 rounded-full border border-success/30 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
              </span>
              <span className="font-mono text-xs text-success uppercase tracking-wider">
                System Online
              </span>
            </div>

            {error && (
              <div className="flex items-center gap-3 p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0" />
                <p className="text-sm text-destructive font-mono">{error}</p>
              </div>
            )}

            <CyberInput
              label="Operator ID"
              placeholder="Enter your operator ID"
              icon={<User className="w-5 h-5" />}
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              required
            />

            <CyberInput
              label="Access Code"
              type="password"
              placeholder="Enter your access code"
              icon={<Lock className="w-5 h-5" />}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />

            <CyberButton
              type="submit"
              variant="glow"
              size="lg"
              className="w-full"
              loading={loading}
            >
              <Zap className="w-5 h-5" />
              Initialize Session
              <ArrowRight className="w-5 h-5" />
            </CyberButton>
          </form>

          {/* Footer info */}
          <div className="mt-6 pt-6 border-t border-border">
            <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
              <span>v2.4.1</span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                SECURE CONNECTION
              </span>
            </div>
          </div>
        </CyberCard>

        {/* Bottom info */}
        <p className="text-center mt-6 text-xs text-muted-foreground font-mono">
          Authorized personnel only • All activities monitored
        </p>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-32 h-32 border border-primary/10 rounded-full animate-pulse opacity-20" />
      <div className="absolute bottom-10 right-10 w-48 h-48 border border-accent/10 rounded-full animate-pulse opacity-20" />
      <div className="absolute top-1/4 right-20 w-2 h-2 bg-primary rounded-full animate-ping opacity-50" />
      <div className="absolute bottom-1/3 left-20 w-2 h-2 bg-accent rounded-full animate-ping opacity-50" />
    </div>
  );
};

export default Login;
