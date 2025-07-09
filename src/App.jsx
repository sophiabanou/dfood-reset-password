// src/App.jsx
import { useState, useEffect } from 'react';
import { supabase } from './supabase';
import { forgotSchema } from './schema';
import PasswordInput from './PasswordInput';
import './App.css';
import Logo from './assets/logo.svg';

function App() {
  const [form, setForm] = useState({
    password: ""
  })

  const [error, setError] = useState({
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const [sessionReady, setSessionReady] = useState(false);

  useEffect(() => {
    const url = new URL(window.location.href);
    const code = url.searchParams.get("token_hash");

    if (code) {
      supabase.auth.exchangeCodeForSession({ code })
        .then(({ error }) => {
          if (error) {
            console.error("Error exchanging code:", error.message);
            setError({ password: "Invalid or expired reset link." });
          } else {
            setSessionReady(true);
          }
        });
    } else {
      setError({ password: "No reset code found in URL." });
    }
  }, []);

  const handleChange = (
    e
  ) => {
    setForm((prev) => ({
      ...prev,
      password: e.target.value,
    }));
  };

  const handleFocus = () => {
    setError((prev) => ({
      ...prev,
      password: "",
    }));
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
    setError({
      password: errors?.password || "",
    });
    if (errors) return;

    setLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: form.password,
      });

      if (error) {
        throw new Error(error)
      }

    } catch (e) {
      setError({
        password: e.message || "",
      });
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className='page-wrapper'>
      <div className='form-wrapper'>
        <div className='form-header'>
          <img src={Logo} className='logo' />
          <h1 className='heading'>Reset Password</h1>

          <form onSubmit={handleSubmit}>
            <PasswordInput onChange={handleChange} onFocus={handleFocus} value={form.password} error={error.password} />

            <button type='submit' className='primaryButton' disabled={loading || !sessionReady}>
              {
                !loading ? (
                  <p className='primaryButtonText'>RESET PASSWORD</p>
                ) : (
                  <span className='loader'></span>
                )
              }
            </button>
          </form>
        </div>


      </div>
    </div>
  );
}

export default App;
