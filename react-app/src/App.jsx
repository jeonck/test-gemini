import { useState, useEffect } from 'react';

function App() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    // Update time every second
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  const timezones = [
    { name: 'London', tz: 'Europe/London' },
    { name: 'New York', tz: 'America/New_York' },
    { name: 'Seoul', tz: 'Asia/Seoul' },
    { name: 'Tokyo', tz: 'Asia/Tokyo' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-5xl font-bold text-white text-center mb-12 tracking-wider">
          World Clock
        </h1>

        <div className="space-y-6">
          {timezones.map(({ name, tz }) => (
            <div key={name} className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 shadow-2xl">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-white">{name}</h2>
                <p className="text-3xl font-mono text-green-400">
                  {time.toLocaleTimeString('en-US', { timeZone: tz, hour12: false })}
                </p>
              </div>
              <p className="text-right text-gray-400 mt-1">
                {time.toLocaleDateString('en-US', { timeZone: tz, weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
