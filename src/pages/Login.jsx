import { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { loginUser } from '../store/actions/authActions';

const Login = ({ loginUser, auth }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sessionExpired = searchParams.get('expired') === '1';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { loading, error } = auth;

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await loginUser({ email, password });

    if (result?.type === 'LOGIN_SUCCESS') {
      try {
        const savedUser = JSON.parse(localStorage.getItem('authUser') || '{}');
        if (savedUser?.role === 'staff') {
          navigate('/staff/expenses');
        } else {
          navigate('/admin');
        }
      } catch {
        navigate('/admin');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-100 px-4">
      <div className="w-full max-w-sm">
        {/* Logo / brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-secondary text-white text-2xl font-extrabold mb-4 shadow-lg">
            G
          </div>
          <h1 className="text-2xl font-extrabold text-gray-800">Grace House</h1>
          <p className="text-sm text-gray-500 mt-1">Service Apartment Management</p>
        </div>

        <form
          onSubmit={handleLogin}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-4"
        >
          <h2 className="text-lg font-bold text-gray-800 mb-1">Sign in</h2>
          <p className="text-sm text-gray-500 -mt-1 mb-4">Enter your credentials to continue</p>

          {sessionExpired && (
            <div className="bg-amber-50 border border-amber-200 text-amber-700 text-sm px-4 py-3 rounded-xl">
              Your session has expired. Please sign in again.
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          <div className="space-y-1">
            <label className="block text-xs font-medium text-gray-600">Email address</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-medium text-gray-600">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-secondary hover:opacity-90 text-white py-2.5 rounded-lg text-sm font-semibold transition disabled:opacity-60 cursor-pointer mt-2"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Signing in...
              </span>
            ) : (
              'Sign in'
            )}
          </button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-6">
          Grace House Service Apartment &copy; {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps, { loginUser })(Login);
