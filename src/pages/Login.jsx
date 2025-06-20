// Login.jsx
import { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../store/actions/authActions'; // adjust path if needed

const Login = ({ loginUser, auth }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { loading, error, user } = auth;

const handleLogin = async (e) => {
  e.preventDefault();

  const result = await loginUser({ email, password });

  if (result?.type === 'LOGIN_SUCCESS') {
    navigate('/admin');
  } else {
    alert(error || 'Login failed');
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-100">
      <form onSubmit={handleLogin} className="bg-white p-8 shadow rounded w-full max-w-sm">
        <h2 className="text-xl font-bold mb-6 text-center text-secondary">Admin Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full border mb-4 p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border mb-4 p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-secondary text-white py-2 rounded cursor-pointer"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
      </form>
    </div>
  );
};

// Map Redux state to props
const mapStateToProps = (state) => ({
  auth: state.auth
});

// Connect component to Redux
export default connect(mapStateToProps, { loginUser })(Login);