import React from 'react';
import { Shield, AlertTriangle, Users, Clock, MessageSquare, Zap, LogOut, Activity, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import StatsCard from '@/components/dashboard/StatsCard';
import ActiveSessions from '@/components/dashboard/ActiveSessions';
import IntelligencePanel from '@/components/dashboard/IntelligencePanel';
import ConversationViewer from '@/components/dashboard/ConversationViewer';
import APIStatus from '@/components/dashboard/APIStatus';
import { CyberButton } from '@/components/ui/cyber-button';
import HexagonPattern from '@/components/HexagonPattern';
import { useAuth } from '@/contexts/AuthContext';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <HexagonPattern />
      <div className="absolute inset-0 cyber-grid pointer-events-none" />
      <div className="absolute inset-0 matrix-bg pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h1 className="font-orbitron text-xl font-bold text-glow-primary">
                    HONEYPOT
                  </h1>
                  <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                    Threat Detection System
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-success/10 border border-success/30">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
                </span>
                <span className="text-sm font-mono text-success">System Active</span>
              </div>
              
              {user && (
                <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50 border border-border">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-mono text-muted-foreground truncate max-w-[150px]">
                    {user.email}
                  </span>
                </div>
              )}
              
              <CyberButton variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </CyberButton>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-6">
        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatsCard
            title="Scams Detected"
            value="1,247"
            change="+12% this week"
            trend="up"
            icon={AlertTriangle}
            variant="threat"
          />
          <StatsCard
            title="Active Sessions"
            value="4"
            change="2 engaging"
            trend="neutral"
            icon={Users}
            variant="default"
          />
          <StatsCard
            title="Avg Engagement"
            value="8m 32s"
            change="+2m 15s"
            trend="up"
            icon={Clock}
            variant="safe"
          />
          <StatsCard
            title="Intel Extracted"
            value="342"
            change="+28 today"
            trend="up"
            icon={Zap}
            variant="warning"
          />
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Sessions */}
          <div className="lg:col-span-1">
            <ActiveSessions />
          </div>

          {/* Middle Column - Conversation */}
          <div className="lg:col-span-1">
            <ConversationViewer />
          </div>

          {/* Right Column - Intelligence & Status */}
          <div className="lg:col-span-1 space-y-6">
            <IntelligencePanel />
            <APIStatus />
          </div>
        </div>

        {/* Activity Bar */}
        <div className="mt-6 p-4 rounded-lg bg-card border border-border">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-primary" />
              <span className="font-orbitron text-sm uppercase tracking-wider text-primary">
                Real-time Activity
              </span>
            </div>
            <span className="text-xs font-mono text-muted-foreground">
              Last updated: Just now
            </span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div className="h-full w-full data-stream" />
          </div>
          <div className="flex items-center justify-between mt-2 text-xs font-mono text-muted-foreground">
            <span>Processing: 847 requests/min</span>
            <span>Queue: 12 pending</span>
            <span>Memory: 68%</span>
            <span>CPU: 42%</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
