import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, User, Lock, Mail, ArrowRight, AlertTriangle, Zap, CheckCircle } from 'lucide-react';
import { CyberButton } from '@/components/ui/cyber-button';
import { CyberInput } from '@/components/ui/cyber-input';
import { CyberCard } from '@/components/ui/cyber-card';
import MatrixRain from '@/components/MatrixRain';
import HexagonPattern from '@/components/HexagonPattern';
import { useAuth } from '@/contexts/AuthContext';

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Access codes do not match.');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Access code must be at least 6 characters.');
      setLoading(false);
      return;
    }

    const { error } = await signUp(formData.email, formData.password, formData.fullName);
    
    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
    }
    setLoading(false);
  };

  if (success) {
    return (
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
        <MatrixRain opacity={0.03} />
        <HexagonPattern />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background pointer-events-none" />
        
        <div className="relative z-10 w-full max-w-md px-6">
          <CyberCard variant="glass" withCorners className="p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-success/10 border-2 border-success/30 mb-6">
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
            <h2 className="font-orbitron text-xl font-bold text-foreground mb-2">
              Registration Complete
            </h2>
            <p className="text-muted-foreground font-mono text-sm mb-6">
              Check your email to verify your account before logging in.
            </p>
            <Link to="/login">
              <CyberButton variant="glow" className="w-full">
                Return to Login
                <ArrowRight className="w-4 h-4" />
              </CyberButton>
            </Link>
          </CyberCard>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Background Effects */}
      <MatrixRain opacity={0.03} />
      <HexagonPattern />
      
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background pointer-events-none" />
      <div className="absolute inset-0 matrix-bg pointer-events-none" />
      <div className="absolute inset-0 cyber-grid pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-md px-6">
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 border-2 border-primary/30 mb-6 pulse-glow">
            <Shield className="w-10 h-10 text-primary" />
          </div>
          
          <h1 className="font-orbitron text-3xl md:text-4xl font-bold text-glow-primary mb-2">
            REGISTER
          </h1>
          <p className="font-orbitron text-sm uppercase tracking-[0.3em] text-muted-foreground">
            Create Operator Account
          </p>
        </div>

        {/* Signup Card */}
        <CyberCard variant="glass" withCorners withScanline className="p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Status indicator */}
            <div className="flex items-center justify-center gap-2 py-2 px-4 bg-accent/10 rounded-full border border-accent/30 mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
              <span className="font-mono text-xs text-accent uppercase tracking-wider">
                New Operator Registration
              </span>
            </div>

            {error && (
              <div className="flex items-center gap-3 p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0" />
                <p className="text-sm text-destructive font-mono">{error}</p>
              </div>
            )}

            <CyberInput
              label="Full Name"
              placeholder="Enter your full name"
              icon={<User className="w-5 h-5" />}
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              required
            />

            <CyberInput
              label="Email Address"
              type="email"
              placeholder="Enter your email"
              icon={<Mail className="w-5 h-5" />}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />

            <CyberInput
              label="Access Code"
              type="password"
              placeholder="Create access code (min 6 chars)"
              icon={<Lock className="w-5 h-5" />}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />

            <CyberInput
              label="Confirm Access Code"
              type="password"
              placeholder="Confirm your access code"
              icon={<Lock className="w-5 h-5" />}
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
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
              Create Account
              <ArrowRight className="w-5 h-5" />
            </CyberButton>
          </form>

          {/* Footer */}
          <div className="mt-6 pt-6 border-t border-border text-center">
            <p className="text-sm text-muted-foreground font-mono">
              Already have an account?{' '}
              <Link to="/login" className="text-primary hover:text-primary/80 transition-colors">
                Login here
              </Link>
            </p>
          </div>
        </CyberCard>

        <p className="text-center mt-6 text-xs text-muted-foreground font-mono">
          By registering, you agree to authorized access protocols
        </p>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-32 h-32 border border-primary/10 rounded-full animate-pulse opacity-20" />
      <div className="absolute bottom-10 right-10 w-48 h-48 border border-accent/10 rounded-full animate-pulse opacity-20" />
    </div>
  );
};

export default Signup;
