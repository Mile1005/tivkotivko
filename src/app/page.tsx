"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Page() {
  // Countdown logic (hydration-safe)
  const targetDate = new Date("2025-12-01T00:00:00").getTime();
  const [timeLeft, setTimeLeft] = useState(0);
  useEffect(() => {
    // Only run on client
    setTimeLeft(targetDate - Date.now());
    const timer = setInterval(() => {
      setTimeLeft(targetDate - Date.now());
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);
  const getTimeParts = (ms: number) => {
    if (ms <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));
    const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const seconds = Math.floor((ms / 1000) % 60);
    return { days, hours, minutes, seconds };
  };
  const { days, hours, minutes, seconds } = getTimeParts(timeLeft);

  // Typewriter effect for subtitle
  const subtitle = "ВИСТИНАТА ДОАЃА ПО ВАС...";
  const [typed, setTyped] = useState("");
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTyped(subtitle.slice(0, i));
      i++;
      if (i > subtitle.length) clearInterval(interval);
    }, 80);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="relative min-h-screen flex flex-col items-center justify-center bg-black overflow-hidden">
      {/* Animated background circles */}
      <motion.div className="absolute inset-0 z-0 pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <motion.div className="absolute top-1/4 left-1/3 w-[32rem] h-[32rem] bg-red-500 opacity-20 rounded-full blur-3xl" animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 4 }} />
        <motion.div className="absolute bottom-1/4 right-1/4 w-[28rem] h-[28rem] bg-black opacity-20 rounded-full blur-2xl" animate={{ scale: [1, 1.05, 1] }} transition={{ repeat: Infinity, duration: 5 }} />
        <motion.div className="absolute top-1/2 right-1/2 w-[24rem] h-[24rem] bg-yellow-400 opacity-20 rounded-full blur-2xl" animate={{ scale: [1, 1.08, 1] }} transition={{ repeat: Infinity, duration: 6 }} />
      </motion.div>

      {/* Glassmorphic Card */}
      <motion.div
        className="relative z-10 flex flex-col items-center gap-4 w-full max-w-xl px-2 py-6 sm:gap-6 sm:px-6 glass-card"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{ marginTop: '4rem' }}
      >
        <motion.h1
          className="w-full font-black text-red-600 text-center mb-2 sm:mb-4 tracking-tight drop-shadow-lg select-none"
          style={{
            textTransform: 'uppercase',
            letterSpacing: '0.07em',
            marginTop: '0.5rem',
            fontSize: 'clamp(2.2rem, 7vw, 3.5rem)',
            whiteSpace: 'nowrap'
          }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          ТИВКОТИВКО
        </motion.h1>
        <motion.p
          className="text-xs sm:text-base font-bold text-center mb-2 sm:mb-3 px-3 sm:px-6 py-1.5 rounded-full bg-black text-yellow-300 tracking-wide whitespace-normal max-w-full overflow-hidden select-none"
          style={{
            fontWeight: 900,
            fontSize: 'clamp(0.85rem, 2vw, 1.1rem)',
            letterSpacing: '0.05em',
            display: 'inline-block',
            boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
            marginTop: '0.1rem'
          }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          {typed}
          <span className="blinking-cursor">|</span>
        </motion.p>
         <motion.div className="flex flex-wrap justify-center gap-2 sm:gap-6 text-base sm:text-2xl font-mono bg-black/80 text-white rounded-xl px-4 sm:px-10 py-3 sm:py-4 shadow-lg w-full max-w-full select-none" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.6, duration: 0.8 }}>
          <span className="text-yellow-300 font-bold">{days} дена</span>
          <span>{hours} часа</span>
          <span>{minutes} минути</span>
          <span>{seconds} секунди</span>
        </motion.div>
        {/* Email Subscription Form */}
        <motion.form
          method="POST"
          className="mt-6 w-full flex flex-col items-center gap-2 sm:gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
        >
          <label htmlFor="email" className="text-base font-semibold text-yellow-300 mb-1 select-none info-label">За повеќе информации во врска со проектот:</label>
          <div className="flex w-full max-w-xs gap-2">
            <input
              id="email"
              type="email"
              name="email"
              required
              placeholder="Внеси емаил..."
              className="flex-1 px-3 py-2 rounded-lg border border-gray-300 bg-black text-yellow-300 font-medium placeholder-yellow-300 focus:outline-none focus:ring-2 focus:ring-red-400 transition-all"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-red-600 text-white font-bold hover:bg-red-700 transition-all"
            >
              Испрати
            </button>
          </div>
        </motion.form>
      </motion.div>
      <style jsx global>{`
        .glass-card {
          background: rgba(20, 20, 20, 0.65);
          box-shadow: 0 4px 24px 0 rgba(0,0,0,0.55), 0 0 2px 0.25px #ff0000;
          border: 1px solid #ff0000;
          margin-left: auto;
          margin-right: auto;
          max-width: 600px;
        }
        .info-label {
          white-space: nowrap;
          margin-top: 2rem;
        }
        @media (max-width: 640px) {
          .info-label {
            white-space: nowrap;
            margin-top: 2.5rem;
            font-size: 1rem;
          }
        }
        .blinking-cursor {
          animation: blink 1s steps(2, start) infinite;
        }
        @keyframes blink {
          to { opacity: 0; }
        }
      `}</style>
      </div>
    </>
  );
}
