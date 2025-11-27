import api from '@/api/api';
import { useState, type ChangeEvent, type FormEvent } from 'react';
import { Navigate } from 'react-router-dom';

type LoginForm = {
  emailOrUsername: string;
  password: string;
};

export default function LoginPage() {
  const [form, setForm] = useState<LoginForm>({
    emailOrUsername: '',
    password: ''
  });
  
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [step, setStep] = useState<'login' | 'otp'>('login');
  const [otp, setOtp] = useState('');

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    try {
      const res = await api.post('auth/login', {
        emailOrUsername: form.emailOrUsername,
        password: form.password
      });

      const id = res?.data?.sessionId;
      if (!id) {
        console.error('No sessionId returned from server');
        return;
      }

      setSessionId(id);
      setStep('otp');
    } catch (err) {
      console.error(err);
    }
  }

  async function handleOtpSubmit(e: FormEvent) {
    e.preventDefault();

    if (!sessionId) return;

    try {
      const res = await api.post('auth/otp-verify', {
        sessionId,
        otp
      });

      console.log('OTP verified:', res.data);
      <Navigate to={'/auth/login'} replace />
      // Continue your flow here — dashboard, redirect, confetti, etc.
    } catch (err) {
      console.error('OTP verification failed:', err);
    }
  }

  if (step === 'otp') {
    return (
      <div style={{ padding: '1rem' }}>
        <h2>OTP Verification</h2>
        <form onSubmit={handleOtpSubmit}>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={e => setOtp(e.target.value)}
            style={{ display: 'block', width: '100%', marginBottom: '1rem' }}
          />

          <button type="submit" style={{ padding: '0.5rem', width: '100%' }}>
            Verify OTP
          </button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 300, margin: '2rem auto' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="emailOrUsername"
          value={form.emailOrUsername}
          onChange={handleChange}
          placeholder="email or username"
          style={{ display: 'block', width: '100%', marginBottom: '1rem' }}
        />

        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="password"
          style={{ display: 'block', width: '100%', marginBottom: '1rem' }}
        />

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '0.5rem',
            cursor: 'pointer'
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}
