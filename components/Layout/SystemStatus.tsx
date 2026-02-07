import React from 'react';
import { Activity, ShieldCheck, CheckCircle2 } from 'lucide-react';

const SystemStatus: React.FC = () => {
  return (
    <div className="hidden lg:flex fixed bottom-6 right-6 z-50 flex-col gap-2 font-mono text-xs">
      <div className="flex items-center gap-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-md border border-slate-200 dark:border-slate-800 shadow-lg">
        <Activity size={12} className="text-emerald-500 animate-pulse" />
        <span className="text-slate-600 dark:text-slate-400">SYSTEM:</span>
        <span className="text-emerald-600 dark:text-emerald-400 font-bold">ONLINE</span>
      </div>
      <div className="flex items-center gap-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-md border border-slate-200 dark:border-slate-800 shadow-lg">
        <ShieldCheck size={12} className="text-violet-500" />
        <span className="text-slate-600 dark:text-slate-400">SECURITY:</span>
        <span className="text-violet-600 dark:text-violet-400 font-bold">SECURE</span>
      </div>
      <div className="flex items-center gap-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-md border border-slate-200 dark:border-slate-800 shadow-lg">
        <CheckCircle2 size={12} className="text-blue-500" />
        <span className="text-slate-600 dark:text-slate-400">BUILD:</span>
        <span className="text-blue-600 dark:text-blue-400 font-bold">PASSING</span>
      </div>
    </div>
  );
};

export default SystemStatus;