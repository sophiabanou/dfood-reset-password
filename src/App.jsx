// src/App.jsx
import { useState, useEffect } from 'react';
import { supabase } from './supabase';
import { forgotSchema } from './schema';
import PasswordInput from './PasswordInput';
import './App.css';
import Logo from './assets/logo.svg';

function App() {
  const [form, setForm] = useState({ password: "" });

  const [error, setError] = useState({ password: "" });
  const [loading, setLoading] = useState(false);
  const [sessionReady, setSessionReady] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [globalError, setGlobalError] = useState("");

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);

    const access_token = params.get('access_token');
    const refresh_token = params.get('refresh_token');
    const type = params.get('type');

    if (type === 'recovery' && access_token && refresh_token) {
      supabase.auth
        .setSession({ access_token, refresh_token })
        .then(({ error }) => {
          if (error) {
            console.error('Session error:', error);
            setGlobalError('Session error. Please try the reset link again.');
            setSessionReady(false);
          } else {
            setSessionReady(true);
          }
          setCheckingSession(false);
        });
    } else {
      setGlobalError('Invalid or expired recovery link.');
      setSessionReady(false);
      setCheckingSession(false);
    }
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, password: e.target.value }));
  };

  const handleFocus = () => {
    setError((prev) => ({ ...prev, password: "" }));
  };

  const validateForgot = () => {
    const options = { abortEarly: false };
    const { error } = forgotSchema.validate(form, options);

    if (!error) return null;

    const errors = {};
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForgot();
    setError({ password: errors?.password || "" });
    if (errors) return;

    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: form.password,
      });

      if (error) {
        throw error;
      }

      alert("Your password was reset successfully!");
    } catch (e) {
      setError({ password: e.message || "Failed to reset password." });
    } finally {
      setLoading(false);
    }
  };

  if (checkingSession) {
    return (
      <div className='page-wrapper'>
        <div className='form-wrapper'>
          <div className='form-header'>
            <img src={Logo} className='logo' />
            <span className='loader-dark' />
          </div>
        </div>
      </div>
    );
  }

  if (!sessionReady) {
    return (
      <div className='page-wrapper'>
        <div className='form-wrapper'>
          <div className='form-header'>
            <img src={Logo} className='logo' />
            <p className='errorMessage'>{globalError || error.password}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='page-wrapper'>
      <div className='form-wrapper'>
        <div className='form-header'>
          <img src={Logo} className='logo' />
          <h1 className='heading'>Reset Password</h1>

          <form onSubmit={handleSubmit}>
            <PasswordInput
              onChange={handleChange}
              onFocus={handleFocus}
              value={form.password}
              error={error.password}
            />

            <button type='submit' className='primaryButton' disabled={loading}>
              {!loading ? (
                <p className='primaryButtonText'>RESET PASSWORD</p>
              ) : (
                <span className='loader'></span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
