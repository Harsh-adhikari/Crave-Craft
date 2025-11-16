import React, { useState, useEffect } from 'react';

const TypingEffect = () => {
  const texts = [
    "Share your favorite recipes, discover new ideas, and connect with people who enjoy cooking just like you. Upload the dishes you love to make, explore creative meals from others, and get inspired to try something new in your kitchen. Every recipe adds flavor to the community — let yours be one of them.",
    "Discover culinary adventures from around the world. Connect with passionate home chefs and food enthusiasts. Share your kitchen masterpieces and inspire others to create delicious memories.",
    "Transform your cooking journey into an exciting adventure. Explore diverse recipes, learn new techniques, and build connections with fellow food lovers who share your passion for creating amazing dishes.",
    "Join a vibrant community of food creators. Upload your signature dishes, discover innovative recipes, and connect with people who celebrate the art of cooking every single day."
  ];

  const [textIndex, setTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const currentText = texts[textIndex];
    const typingSpeed = isDeleting ? 15 : 30;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < currentText.length) {
          setDisplayedText(currentText.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (charIndex > 0) {
          setDisplayedText(currentText.substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        } else {
          setIsDeleting(false);
          setTextIndex((textIndex + 1) % texts.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, textIndex, texts]);

  return (
    <div style={{ minHeight: '150px' }}>
      <p style={{
        fontSize: '1.2rem',
        color: '#666',
        marginBottom: '1.3rem',
        lineHeight: '1.7'
      }}>
        {displayedText}
        <span style={{
          borderRight: '2px solid #ff6b35',
          animation: 'blink 0.7s infinite',
          marginLeft: '2px'
        }}>‎</span>
      </p>
      <style>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default TypingEffect;