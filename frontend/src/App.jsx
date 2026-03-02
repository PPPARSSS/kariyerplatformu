import React, { useState, useEffect } from 'react';

function App() {
  const [apiData, setApiData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/api/status')
      .then((res) => {
        if (!res.ok) throw new Error('API Request Failed: ' + res.status);
        return res.json();
      })
      .then((data) => setApiData(data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center text-white p-4 font-sans selection:bg-fuchsia-500/30">
      <div className="max-w-md w-full bg-neutral-900/40 backdrop-blur-2xl border border-white/5 rounded-3xl p-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] space-y-8 relative overflow-hidden ring-1 ring-white/10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-fuchsia-500/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />

        <div className="relative z-10 space-y-2">
          <h1 className="text-4xl font-black tracking-tight bg-gradient-to-r from-blue-400 via-indigo-400 to-fuchsia-400 bg-clip-text text-transparent pb-1">
            Kariyer Platformu
          </h1>
          <p className="text-neutral-400 text-sm font-medium tracking-wide">
            Agentic Interface Authorized
          </p>
        </div>

        <div className="relative z-10 bg-black/40 rounded-2xl border border-white/5 p-5 space-y-4 shadow-inner">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Core Services</h3>

          {error ? (
            <div className="flex items-center space-x-3 text-red-400 bg-red-950/30 p-3 rounded-xl border border-red-900/50">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <span className="font-mono text-xs">{error}</span>
            </div>
          ) : !apiData ? (
            <div className="flex items-center space-x-3 text-yellow-400 bg-yellow-950/30 p-3 rounded-xl border border-yellow-900/50">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
              </span>
              <span className="font-mono text-xs leading-none">Establishing Uplink...</span>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <span className="text-neutral-400 text-sm">API Backend</span>
                <span className="flex items-center space-x-2 text-emerald-400 font-mono text-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
                  <span className="tracking-wider">{apiData.status.toUpperCase()}</span>
                </span>
              </div>
              <div className="flex items-center justify-between pt-1">
                <span className="text-neutral-400 text-sm">Agent Skills</span>
                <span className="px-2.5 py-1 rounded-md bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-500/20 font-mono text-[10px] uppercase font-bold tracking-widest">
                  {apiData.skills}
                </span>
              </div>
            </div>
          )}
        </div>

        <button className="w-full relative z-10 group overflow-hidden rounded-xl bg-white px-6 py-3.5 font-bold text-black transition-all hover:scale-[1.02] active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
          <span className="relative z-10">Initialize Platform</span>
          <div className="absolute inset-0 h-full w-full opacity-0 group-hover:opacity-100 transition-opacity bg-[linear-gradient(45deg,transparent_25%,rgba(0,0,0,.05)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%,100%_100%] animate-shimmer" />
        </button>
      </div>
    </div>
  );
}

export default App;
