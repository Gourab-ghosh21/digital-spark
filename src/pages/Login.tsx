import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, Lock, ArrowRight, AlertTriangle, Zap, Mail, Wifi, Activity, Database, Terminal } from 'lucide-react';
import { CyberButton } from '@/components/ui/cyber-button';
import { CyberInput } from '@/components/ui/cyber-input';
import { CyberCard } from '@/components/ui/cyber-card';
import MatrixRain from '@/components/MatrixRain';
import HexagonPattern from '@/components/HexagonPattern';
import { useAuth } from '@/contexts/AuthContext';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { signIn, user } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [terminalLines, setTerminalLines] = useState<string[]>([]);

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  // Terminal boot sequence animation
  useEffect(() => {
    const lines = [
      '> Initializing security protocols...',
      '> Loading neural network modules...',
      '> Connecting to threat database...',
      '> System ready for authentication',
    ];
    
    let index = 0;
    const interval = setInterval(() => {
      if (index < lines.length) {
        setTerminalLines(prev => [...prev, lines[index]]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 600);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = await signIn(formData.email, formData.password);
    
    if (error) {
      setError(error.message);
    } else {
      navigate('/dashboard');
    }
    setLoading(false);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Background Effects */}
      <MatrixRain opacity={0.04} />
      <HexagonPattern />
      
      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background pointer-events-none" />
      <div className="absolute inset-0 matrix-bg pointer-events-none" />
      
      {/* Circuit pattern overlay */}
      <div className="absolute inset-0 circuit-lines opacity-30 pointer-events-none" />
      
      {/* Animated grid */}
      <div className="absolute inset-0 cyber-grid pointer-events-none" />

      {/* Holographic accent orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      {/* Left side decorative panel */}
      <div className="hidden lg:flex absolute left-0 top-0 bottom-0 w-80 flex-col justify-center pl-12 pointer-events-none">
        <div className="space-y-8 opacity-60">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center">
              <Database className="w-6 h-6 text-primary" />
            </div>
            <div>
              <div className="font-orbitron text-sm text-primary">THREAT DB</div>
              <div className="font-mono text-xs text-muted-foreground">2.4M entries</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-success/10 border border-success/30 flex items-center justify-center">
              <Wifi className="w-6 h-6 text-success" />
            </div>
            <div>
              <div className="font-orbitron text-sm text-success">NETWORK</div>
              <div className="font-mono text-xs text-muted-foreground">Secure tunnel</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-accent/10 border border-accent/30 flex items-center justify-center">
              <Activity className="w-6 h-6 text-accent" />
            </div>
            <div>
              <div className="font-orbitron text-sm text-accent">AI ENGINE</div>
              <div className="font-mono text-xs text-muted-foreground">Active</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side terminal */}
      <div className="hidden xl:block absolute right-12 top-1/2 -translate-y-1/2 w-80 pointer-events-none">
        <div className="bg-background/80 backdrop-blur-sm border border-border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-border">
            <Terminal className="w-4 h-4 text-primary" />
            <span className="font-mono text-xs text-muted-foreground">system_log.sh</span>
          </div>
          <div className="space-y-2 font-mono text-xs">
            {terminalLines.map((line, i) => (
              <div key={i} className="text-success/80 leading-relaxed">
                {line}
              </div>
            ))}
            <div className="text-primary typing-cursor">&gt; _</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-md px-6">
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/10 border-2 border-primary/30 mb-6 pulse-glow float">
            <Shield className="w-12 h-12 text-primary" />
          </div>
          
          <h1 className="font-orbitron text-4xl md:text-5xl font-bold text-glow-primary mb-3 glitch">
            HONEYPOT
          </h1>
          <p className="font-orbitron text-sm uppercase tracking-[0.3em] text-muted-foreground">
            AI Scam Detection System
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-xs font-mono text-muted-foreground">
            <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
            NEURAL NET v3.2.1 ONLINE
          </div>
        </div>

        {/* Login Card */}
        <CyberCard variant="glass" withCorners withScanline className="p-8 holographic">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Status indicator */}
            <div className="flex items-center justify-center gap-2 py-2.5 px-4 bg-success/10 rounded-full border border-success/30">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-success" />
              </span>
              <span className="font-mono text-xs text-success uppercase tracking-wider">
                Secure Connection Established
              </span>
            </div>

            {error && (
              <div className="flex items-center gap-3 p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0" />
                <p className="text-sm text-destructive font-mono">{error}</p>
              </div>
            )}

            <CyberInput
              label="Email Address"
              type="email"
              placeholder="operator@honeypot.ai"
              icon={<Mail className="w-5 h-5" />}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />

            <CyberInput
              label="Access Code"
              type="password"
              placeholder="••••••••••••"
              icon={<Lock className="w-5 h-5" />}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />

            <CyberButton type="submit" variant="glow" size="lg" className="w-full group" loading={loading}>
              <Zap className="w-5 h-5 group-hover:animate-pulse" />
              Initialize Session
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </CyberButton>
          </form>

          {/* Footer info */}
          <div className="mt-6 pt-6 border-t border-border/50">
            <p className="text-sm text-muted-foreground font-mono text-center mb-4">
              New operator?{' '}
              <Link to="/signup" className="text-primary hover:text-primary/80 transition-colors underline underline-offset-4">
                Request access credentials
              </Link>
            </p>
            <div className="text-xs font-mono text-muted-foreground flex items-center justify-between">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                v2.4.1
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                256-BIT ENCRYPTED
              </span>
            </div>
          </div>
        </CyberCard>

        {/* Bottom info */}
        <p className="text-center mt-6 text-xs text-muted-foreground font-mono flex items-center justify-center gap-2">
          <Shield className="w-3 h-3" />
          Authorized personnel only • All activities monitored
          <Shield className="w-3 h-3" />
        </p>
      </div>

      {/* Decorative floating elements */}
      <div className="absolute top-10 left-10 w-32 h-32 border border-primary/10 rounded-full animate-pulse opacity-20" />
      <div className="absolute bottom-10 right-10 w-48 h-48 border border-accent/10 rounded-full animate-pulse opacity-20" />
      <div className="absolute top-1/4 right-20 w-2 h-2 bg-primary rounded-full animate-ping opacity-50" />
      <div className="absolute bottom-1/3 left-20 w-2 h-2 bg-accent rounded-full animate-ping opacity-50" />
      <div className="absolute top-1/2 left-10 w-1 h-20 bg-gradient-to-b from-primary/50 to-transparent opacity-30" />
      <div className="absolute top-1/3 right-10 w-1 h-16 bg-gradient-to-b from-accent/50 to-transparent opacity-30" />
    </div>
  );
};

export default Login;
