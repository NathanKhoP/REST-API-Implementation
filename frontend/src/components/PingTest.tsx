import React, { useState, useEffect } from "react";
import axios from "axios";

interface PingStats {
  current: number | null;
  min: number;
  max: number;
  avg: number;
  samples: number[];
}

const PingTest: React.FC = () => {
  const [pingStats, setPingStats] = useState<PingStats>({
    current: null,
    min: Infinity,
    max: 0,
    avg: 0,
    samples: []
  });
  const [isPinging, setIsPinging] = useState(false);
  const [error, setError] = useState("");
  const maxSamples = 10;

  const pingServer = async () => {
    try {
      setError("");
      const start = performance.now();
      await axios.get("http://localhost:3000/ping");
      const end = performance.now();
      const latency = Math.round(end - start);
      
      setPingStats(prev => {
        // Keep only the last maxSamples
        const samples = [...prev.samples, latency].slice(-maxSamples);
        
        // Calculate stats
        const min = Math.min(...samples, prev.min === Infinity ? latency : prev.min);
        const max = Math.max(...samples, prev.max);
        const avg = Math.round(samples.reduce((a, b) => a + b, 0) / samples.length);
        
        return {
          current: latency,
          min,
          max,
          avg,
          samples
        };
      });
    } catch (err: any) {
      console.error("Ping error:", err);
      setError("Server connection failed");
      setIsPinging(false);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isPinging) {
      pingServer(); // Initial ping
      interval = setInterval(pingServer, 2000); // Ping every 2 seconds
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPinging]);

  const togglePing = () => {
    setIsPinging(!isPinging);
    if (!isPinging) {
      // Reset stats when starting
      setPingStats({
        current: null,
        min: Infinity,
        max: 0,
        avg: 0,
        samples: []
      });
    }
  };

  // Function to determine the color based on latency
  const getLatencyColor = (ms: number | null) => {
    if (ms === null) return "text-gray-400";
    if (ms < 100) return "text-green-500";
    if (ms < 300) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white shadow-md rounded-lg p-3 text-sm border border-gray-200 text-black">
      <div className="flex items-center justify-between mb-2">
        <span className="font-semibold">Server Ping</span>
        <button 
          onClick={togglePing}
          className={`px-2 py-1 rounded text-white text-xs ml-3 ${isPinging ? 'bg-red-500' : 'bg-blue-500'}`}
        >
          {isPinging ? 'Stop' : 'Start'}
        </button>
      </div>
      
      {error ? (
        <div className="text-red-500 text-xs">{error}</div>
      ) : (
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <span>Current:</span>
            <span className={getLatencyColor(pingStats.current)}>
              {pingStats.current !== null ? `${pingStats.current} ms` : "-"}
            </span>
          </div>
          {pingStats.samples.length > 1 && (
            <>
              <div className="flex justify-between items-center text-xs">
                <span>Min:</span>
                <span className={getLatencyColor(pingStats.min === Infinity ? null : pingStats.min)}>
                  {pingStats.min !== Infinity ? `${pingStats.min} ms` : "-"}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span>Avg:</span>
                <span className={getLatencyColor(pingStats.avg || null)}>
                  {pingStats.avg ? `${pingStats.avg} ms` : "-"}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span>Max:</span>
                <span className={getLatencyColor(pingStats.max || null)}>
                  {pingStats.max ? `${pingStats.max} ms` : "-"}
                </span>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default PingTest;