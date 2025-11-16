import React, { useState } from 'react';
import axios from 'axios';

export default function InputForm({ setIsOpen }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate passwords match for registration
    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError("Passwords don't match!");
      return;
    }

    // Validate password length
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long!");
      return;
    }

    // Validate username for registration
    if (!isLogin && !formData.username.trim()) {
      setError("Username is required!");
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        // Login - Fixed endpoint from /user/login to /login
        console.log('Attempting login...');
        const response = await axios.post('http://localhost:5000/login', {
          email: formData.email,
          password: formData.password
        });

        console.log('Login response:', response.data);

        // Backend returns { token, user } directly
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
          if (response.data.user) {
            localStorage.setItem('user', JSON.stringify(response.data.user));
          }
          setIsOpen(false);
          window.location.reload();
        } else {
          setError(response.data.message || 'Login failed');
        }
      } else {
        // Register - Fixed endpoint from /user/register to /signup
        console.log('Attempting registration...');
        const response = await axios.post('http://localhost:5000/signup', {
          username: formData.username,  // Now sending username
          email: formData.email,
          password: formData.password
        });

        console.log('Register response:', response.data);

        // Backend returns { token, user } directly after signup
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
          if (response.data.user) {
            localStorage.setItem('user', JSON.stringify(response.data.user));
          }
          setIsOpen(false);
          window.location.reload();
        } else {
          setError(response.data.message || 'Registration failed');
        }
      }
    } catch (err) {
      console.error('Auth error:', err);
      console.error('Error response:', err.response?.data);
      
      // Better error handling
      if (err.response?.status === 404) {
        setError('Server endpoint not found. Please check if backend is running on port 5000.');
      } else if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.message) {
        setError(err.message);
      } else {
        setError(isLogin ? 'Login failed. Please try again.' : 'Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setFormData({ username: '', email: '', password: '', confirmPassword: '' });
  };

  return (
    <div style={{
      width: '100%',
      maxWidth: '400px',
      margin: '0 auto',
      padding: '25px 30px',
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
    }}>
      <h2 style={{
        textAlign: 'center',
        color: '#333',
        marginBottom: '5px',
        fontSize: '24px',
        fontWeight: '700'
      }}>
        {isLogin ? 'Welcome Back!' : 'Create Account'}
      </h2>
      
      <p style={{
        textAlign: 'center',
        color: '#666',
        marginBottom: '20px',
        fontSize: '14px'
      }}>
        {isLogin ? 'Login to access your recipes' : 'Join our food community'}
      </p>

      {error && (
        <div style={{
          padding: '10px 12px',
          backgroundColor: '#fee',
          color: '#c00',
          borderRadius: '6px',
          marginBottom: '15px',
          fontSize: '13px',
          border: '1px solid #fcc',
          lineHeight: '1.3'
        }}>
          ⚠️ {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <div style={{ marginBottom: '14px' }}>
            <label style={{
              display: 'block',
              marginBottom: '5px',
              color: '#333',
              fontSize: '13px',
              fontWeight: '600'
            }}>
              Username *
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required={!isLogin}
              placeholder="Choose a username"
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '2px solid #e0e0e0',
                borderRadius: '6px',
                fontSize: '14px',
                boxSizing: 'border-box',
                outline: 'none',
                transition: 'all 0.3s',
                fontFamily: 'inherit'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#ff6b35';
                e.target.style.boxShadow = '0 0 0 3px rgba(255,107,53,0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e0e0e0';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>
        )}

        <div style={{ marginBottom: '14px' }}>
          <label style={{
            display: 'block',
            marginBottom: '5px',
            color: '#333',
            fontSize: '13px',
            fontWeight: '600'
          }}>
            Email *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="your@email.com"
            style={{
              width: '100%',
              padding: '10px 12px',
              border: '2px solid #e0e0e0',
              borderRadius: '6px',
              fontSize: '14px',
              boxSizing: 'border-box',
              outline: 'none',
              transition: 'all 0.3s',
              fontFamily: 'inherit'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#ff6b35';
              e.target.style.boxShadow = '0 0 0 3px rgba(255,107,53,0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#e0e0e0';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>

        <div style={{ marginBottom: isLogin ? '18px' : '14px' }}>
          <label style={{
            display: 'block',
            marginBottom: '5px',
            color: '#333',
            fontSize: '13px',
            fontWeight: '600'
          }}>
            Password *
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength="6"
            placeholder="Min 6 characters"
            style={{
              width: '100%',
              padding: '10px 12px',
              border: '2px solid #e0e0e0',
              borderRadius: '6px',
              fontSize: '14px',
              boxSizing: 'border-box',
              outline: 'none',
              transition: 'all 0.3s',
              fontFamily: 'inherit'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#ff6b35';
              e.target.style.boxShadow = '0 0 0 3px rgba(255,107,53,0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#e0e0e0';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>

        {!isLogin && (
          <div style={{ marginBottom: '18px' }}>
            <label style={{
              display: 'block',
              marginBottom: '5px',
              color: '#333',
              fontSize: '13px',
              fontWeight: '600'
            }}>
              Confirm Password *
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required={!isLogin}
              minLength="6"
              placeholder="Re-enter your password"
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '2px solid #e0e0e0',
                borderRadius: '6px',
                fontSize: '14px',
                boxSizing: 'border-box',
                outline: 'none',
                transition: 'all 0.3s',
                fontFamily: 'inherit'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#ff6b35';
                e.target.style.boxShadow = '0 0 0 3px rgba(255,107,53,0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e0e0e0';
                e.target.style.boxShadow = 'none';
              }}
            />
            {formData.confirmPassword && formData.password !== formData.confirmPassword && (
              <span style={{
                display: 'block',
                marginTop: '4px',
                color: '#c00',
                fontSize: '12px'
              }}>
                ⚠️ Passwords don't match
              </span>
            )}
          </div>
        )}

        <button 
          type="submit"
          disabled={loading || (!isLogin && formData.password !== formData.confirmPassword)}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: loading || (!isLogin && formData.password !== formData.confirmPassword) ? '#ccc' : '#ff6b35',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '15px',
            fontWeight: '700',
            cursor: loading || (!isLogin && formData.password !== formData.confirmPassword) ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s',
            marginBottom: '15px',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}
          onMouseOver={(e) => {
            if (!loading && (isLogin || formData.password === formData.confirmPassword)) {
              e.target.style.backgroundColor = '#e55a2b';
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 4px 12px rgba(255,107,53,0.3)';
            }
          }}
          onMouseOut={(e) => {
            if (!loading && (isLogin || formData.password === formData.confirmPassword)) {
              e.target.style.backgroundColor = '#ff6b35';
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }
          }}
        >
          {loading ? '⏳ Please wait...' : (isLogin ? 'Login' : 'Create Account')}
        </button>
      </form>

      <div style={{
        textAlign: 'center',
        fontSize: '13px',
        color: '#666',
        paddingTop: '12px',
        borderTop: '1px solid #eee'
      }}>
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <span
          onClick={toggleMode}
          style={{
            color: '#ff6b35',
            fontWeight: '700',
            cursor: 'pointer',
            fontSize: '13px',
            textDecoration: 'none',
            transition: 'color 0.2s'
          }}
          onMouseOver={(e) => {
            e.target.style.textDecoration = 'underline';
            e.target.style.color = '#e55a2b';
          }}
          onMouseOut={(e) => {
            e.target.style.textDecoration = 'none';
            e.target.style.color = '#ff6b35';
          }}
        >
          {isLogin ? 'Register here' : 'Login here'}
        </span>
      </div>
    </div>
  );
}