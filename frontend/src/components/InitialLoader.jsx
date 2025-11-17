import { useState, useEffect } from 'react';

const InitialLoader = ({ onLoadComplete }) => {
  const [messageIndex, setMessageIndex] = useState(0);
  
  const funnyMessages = [
    "🐹 Waking up the hamsters powering our server...",
    "🌱 Perfect time to touch some grass!",
    "💧 Stay hydrated! Grab some water...",
    "☕ Server's brewing its morning coffee...",
    "🐌 Loading at free-tier speed...",
    "😴 The server was napping. Almost there!",
  ];

  // Rotate messages every 3.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex(prev => (prev + 1) % funnyMessages.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading-overlay">
      <div className="loading-wrapper">
        {/* Hexagon Loader */}
        <div className="loader-container">
          <div className="socket">
            <div className="gel center-gel">
              <div className="hex-brick h1"></div>
              <div className="hex-brick h2"></div>
              <div className="hex-brick h3"></div>
            </div>
            <div className="gel c1 r1"><div className="hex-brick h1"></div><div className="hex-brick h2"></div><div className="hex-brick h3"></div></div>
            <div className="gel c2 r1"><div className="hex-brick h1"></div><div className="hex-brick h2"></div><div className="hex-brick h3"></div></div>
            <div className="gel c3 r1"><div className="hex-brick h1"></div><div className="hex-brick h2"></div><div className="hex-brick h3"></div></div>
            <div className="gel c4 r1"><div className="hex-brick h1"></div><div className="hex-brick h2"></div><div className="hex-brick h3"></div></div>
            <div className="gel c5 r1"><div className="hex-brick h1"></div><div className="hex-brick h2"></div><div className="hex-brick h3"></div></div>
            <div className="gel c6 r1"><div className="hex-brick h1"></div><div className="hex-brick h2"></div><div className="hex-brick h3"></div></div>
            <div className="gel c7 r2"><div className="hex-brick h1"></div><div className="hex-brick h2"></div><div className="hex-brick h3"></div></div>
            <div className="gel c8 r2"><div className="hex-brick h1"></div><div className="hex-brick h2"></div><div className="hex-brick h3"></div></div>
            <div className="gel c9 r2"><div className="hex-brick h1"></div><div className="hex-brick h2"></div><div className="hex-brick h3"></div></div>
            <div className="gel c10 r2"><div className="hex-brick h1"></div><div className="hex-brick h2"></div><div className="hex-brick h3"></div></div>
            <div className="gel c11 r2"><div className="hex-brick h1"></div><div className="hex-brick h2"></div><div className="hex-brick h3"></div></div>
            <div className="gel c12 r2"><div className="hex-brick h1"></div><div className="hex-brick h2"></div><div className="hex-brick h3"></div></div>
            <div className="gel c13 r2"><div className="hex-brick h1"></div><div className="hex-brick h2"></div><div className="hex-brick h3"></div></div>
            <div className="gel c14 r2"><div className="hex-brick h1"></div><div className="hex-brick h2"></div><div className="hex-brick h3"></div></div>
            <div className="gel c15 r2"><div className="hex-brick h1"></div><div className="hex-brick h2"></div><div className="hex-brick h3"></div></div>
            <div className="gel c16 r2"><div className="hex-brick h1"></div><div className="hex-brick h2"></div><div className="hex-brick h3"></div></div>
            <div className="gel c17 r2"><div className="hex-brick h1"></div><div className="hex-brick h2"></div><div className="hex-brick h3"></div></div>
            <div className="gel c18 r2"><div className="hex-brick h1"></div><div className="hex-brick h2"></div><div className="hex-brick h3"></div></div>
            <div className="gel c19 r3"><div className="hex-brick h1"></div><div className="hex-brick h2"></div><div className="hex-brick h3"></div></div>
            <div className="gel c20 r3"><div className="hex-brick h1"></div><div className="hex-brick h2"></div><div className="hex-brick h3"></div></div>
            <div className="gel c21 r3"><div className="hex-brick h1"></div><div className="hex-brick h2"></div><div className="hex-brick h3"></div></div>
            <div className="gel c22 r3"><div className="hex-brick h1"></div><div className="hex-brick h2"></div><div className="hex-brick h3"></div></div>
            <div className="gel c23 r3"><div className="hex-brick h1"></div><div className="hex-brick h2"></div><div className="hex-brick h3"></div></div>
            <div className="gel c24 r3"><div className="hex-brick h1"></div><div className="hex-brick h2"></div><div className="hex-brick h3"></div></div>
            <div className="gel c25 r3"><div className="hex-brick h1"></div><div className="hex-brick h2"></div><div className="hex-brick h3"></div></div>
            <div className="gel c26 r3"><div className="hex-brick h1"></div><div className="hex-brick h2"></div><div className="hex-brick h3"></div></div>
            <div className="gel c28 r3"><div className="hex-brick h1"></div><div className="hex-brick h2"></div><div className="hex-brick h3"></div></div>
            <div className="gel c29 r3"><div className="hex-brick h1"></div><div className="hex-brick h2"></div><div className="hex-brick h3"></div></div>
            <div className="gel c30 r3"><div className="hex-brick h1"></div><div className="hex-brick h2"></div><div className="hex-brick h3"></div></div>
            <div className="gel c31 r3"><div className="hex-brick h1"></div><div className="hex-brick h2"></div><div className="hex-brick h3"></div></div>
            <div className="gel c32 r3"><div className="hex-brick h1"></div><div className="hex-brick h2"></div><div className="hex-brick h3"></div></div>
            <div className="gel c33 r3"><div className="hex-brick h1"></div><div className="hex-brick h2"></div><div className="hex-brick h3"></div></div>
            <div className="gel c34 r3"><div className="hex-brick h1"></div><div className="hex-brick h2"></div><div className="hex-brick h3"></div></div>
            <div className="gel c35 r3"><div className="hex-brick h1"></div><div className="hex-brick h2"></div><div className="hex-brick h3"></div></div>
            <div className="gel c36 r3"><div className="hex-brick h1"></div><div className="hex-brick h2"></div><div className="hex-brick h3"></div></div>
            <div className="gel c37 r3"><div className="hex-brick h1"></div><div className="hex-brick h2"></div><div className="hex-brick h3"></div></div>
          </div>
        </div>

        {/* Message */}
        <div className="message-box">
          <p className="message-text" key={messageIndex}>
            {funnyMessages[messageIndex]}
          </p>
        </div>

        {/* Info Badge */}
        <div className="info-badge">
          <span className="info-emoji">⏱️</span>
          <span className="info-text">
            Free servers sleep when idle · First load: ~60s · Then ⚡ fast!
          </span>
        </div>

        {/* Progress Bar */}
        <div className="progress-track">
          <div className="progress-glow"></div>
        </div>
      </div>

      <style jsx>{`
        .loading-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 50%, #ff4757 100%);
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        .loading-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
          padding: 2rem;
          max-width: 500px;
          width: 100%;
        }

        .loader-container {
          position: relative;
          width: 100%;
          height: 250px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Hexagon Loader Styles */
        .socket {
          width: 200px;
          height: 200px;
          position: relative;
        }

        .hex-brick {
          background: #FFE66D;
          width: 30px;
          height: 17px;
          position: absolute;
          top: 5px;
          animation: fade 2s infinite;
          border-radius: 2px;
        }

        .h2 {
          transform: rotate(60deg);
        }

        .h3 {
          transform: rotate(-60deg);
        }

        .gel {
          height: 30px;
          width: 30px;
          transition: all 0.3s;
          position: absolute;
          top: 50%;
          left: 50%;
        }

        .center-gel {
          margin-left: -15px;
          margin-top: -15px;
          animation: pulse 2s infinite;
        }

        .c1 { margin-left: -47px; margin-top: -15px; }
        .c2 { margin-left: -31px; margin-top: -43px; }
        .c3 { margin-left: 1px; margin-top: -43px; }
        .c4 { margin-left: 17px; margin-top: -15px; }
        .c5 { margin-left: -31px; margin-top: 13px; }
        .c6 { margin-left: 1px; margin-top: 13px; }
        .c7 { margin-left: -63px; margin-top: -43px; }
        .c8 { margin-left: 33px; margin-top: -43px; }
        .c9 { margin-left: -15px; margin-top: 41px; }
        .c10 { margin-left: -63px; margin-top: 13px; }
        .c11 { margin-left: 33px; margin-top: 13px; }
        .c12 { margin-left: -15px; margin-top: -71px; }
        .c13 { margin-left: -47px; margin-top: -71px; }
        .c14 { margin-left: 17px; margin-top: -71px; }
        .c15 { margin-left: -47px; margin-top: 41px; }
        .c16 { margin-left: 17px; margin-top: 41px; }
        .c17 { margin-left: -79px; margin-top: -15px; }
        .c18 { margin-left: 49px; margin-top: -15px; }
        .c19 { margin-left: -63px; margin-top: -99px; }
        .c20 { margin-left: 33px; margin-top: -99px; }
        .c21 { margin-left: 1px; margin-top: -99px; }
        .c22 { margin-left: -31px; margin-top: -99px; }
        .c23 { margin-left: -63px; margin-top: 69px; }
        .c24 { margin-left: 33px; margin-top: 69px; }
        .c25 { margin-left: 1px; margin-top: 69px; }
        .c26 { margin-left: -31px; margin-top: 69px; }
        .c28 { margin-left: -95px; margin-top: -43px; }
        .c29 { margin-left: -95px; margin-top: 13px; }
        .c30 { margin-left: 49px; margin-top: 41px; }
        .c31 { margin-left: -79px; margin-top: -71px; }
        .c32 { margin-left: -111px; margin-top: -15px; }
        .c33 { margin-left: 65px; margin-top: -43px; }
        .c34 { margin-left: 65px; margin-top: 13px; }
        .c35 { margin-left: -79px; margin-top: 41px; }
        .c36 { margin-left: 49px; margin-top: -71px; }
        .c37 { margin-left: 81px; margin-top: -15px; }

        .r1 {
          animation: pulse 2s infinite;
          animation-delay: 0.2s;
        }

        .r2 {
          animation: pulse 2s infinite;
          animation-delay: 0.4s;
        }

        .r3 {
          animation: pulse 2s infinite;
          animation-delay: 0.6s;
        }

        .r1 > .hex-brick {
          animation: fade 2s infinite;
          animation-delay: 0.2s;
        }

        .r2 > .hex-brick {
          animation: fade 2s infinite;
          animation-delay: 0.4s;
        }

        .r3 > .hex-brick {
          animation: fade 2s infinite;
          animation-delay: 0.6s;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(0.01); }
        }

        @keyframes fade {
          0%, 100% { background: #FFE66D; }
          50% { background: #FFA500; }
        }

        /* Message Styles */
        .message-box {
          min-height: 70px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .message-text {
          font-size: 1.25rem;
          font-weight: 600;
          color: #fff;
          text-align: center;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
          animation: fadeInUp 0.6s ease-out;
          margin: 0;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Info Badge */
        .info-badge {
          display: flex;
          align-items: center;
          gap: 0.625rem;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          padding: 0.75rem 1.25rem;
          border-radius: 50px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .info-emoji {
          font-size: 1.125rem;
          flex-shrink: 0;
        }

        .info-text {
          font-size: 0.8125rem;
          color: #4a5568;
          line-height: 1.3;
          font-weight: 500;
        }

        /* Progress Bar */
        .progress-track {
          width: 100%;
          max-width: 320px;
          height: 4px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 10px;
          overflow: hidden;
          position: relative;
        }

        .progress-glow {
          position: absolute;
          height: 100%;
          width: 80px;
          background: linear-gradient(90deg, 
            transparent, 
            rgba(255, 255, 255, 0.8), 
            rgba(255, 255, 255, 1),
            rgba(255, 255, 255, 0.8),
            transparent
          );
          animation: slide 1.5s ease-in-out infinite;
        }

        @keyframes slide {
          0% { left: -80px; }
          100% { left: 100%; }
        }

        /* Responsive */
        @media (max-width: 640px) {
          .loading-wrapper {
            gap: 1.5rem;
            padding: 1.5rem;
          }

          .loader-container {
            height: 200px;
          }

          .socket {
            width: 160px;
            height: 160px;
          }

          .message-text {
            font-size: 1.0625rem;
          }

          .info-badge {
            padding: 0.625rem 1rem;
          }

          .info-text {
            font-size: 0.75rem;
          }
        }
      `}</style>
    </div>
  );
};

// Example App Usage
export default function App() {
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    const checkBackend = async () => {
      try {
        // Replace with your actual Render backend URL
        const response = await fetch('YOUR_BACKEND_URL/api/health', {
          method: 'GET',
          signal: AbortSignal.timeout(90000),
        });
        
        if (response.ok) {
          await new Promise(resolve => setTimeout(resolve, 1000));
          setIsInitialLoading(false);
        } else {
          throw new Error('Backend not ready');
        }
      } catch (error) {
        console.error('Health check failed:', error);
        setTimeout(checkBackend, 3000);
      }
    };

    checkBackend();
  }, []);

  if (isInitialLoading) {
    return <InitialLoader />;
  }

  return (
    <div style={{ minHeight: '100vh', padding: '2rem', background: '#f7fafc' }}>
      <h1 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '1rem' }}>
        🍳 Food Recipe App
      </h1>
      <p style={{ textAlign: 'center', color: '#718096', fontSize: '1.125rem' }}>
        Your app is ready! The backend is awake now. 🚀
      </p>
    </div>
  );
}