import { useState } from 'react';

interface LoginProps {
  onBack: () => void;
}

export default function Login({ onBack }: LoginProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignUp) {
      alert('Sign up feature coming soon! (Preview Mode)');
    } else {
      alert('Login feature coming soon! (Preview Mode)');
    }
    onBack();
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center relative">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-40 bg-cover bg-center"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?auto=format&fit=crop&q=80&w=2000")' }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/60 to-black"></div>
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md px-4 py-8 md:px-12 md:py-16 bg-black/80 md:bg-black/75 rounded-md mx-4 mt-16 md:mt-0">
        <h2 className="text-3xl font-bold text-white mb-8">
          {isSignUp ? 'Sign Up' : 'Sign In'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {isSignUp && (
            <div>
              <input
                type="text"
                placeholder="Full Name"
                className="w-full bg-[#333] text-white px-4 py-3 rounded outline-none focus:bg-[#444] transition"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}
          <div>
            <input
              type="email"
              placeholder="Email or phone number"
              className="w-full bg-[#333] text-white px-4 py-3 rounded outline-none focus:bg-[#444] transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full bg-[#333] text-white px-4 py-3 rounded outline-none focus:bg-[#444] transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-[#E50914] text-white font-bold py-3 rounded hover:bg-red-700 transition mt-6"
          >
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
          
          <div className="flex justify-between items-center text-sm text-[#b3b3b3]">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 accent-gray-500" defaultChecked />
              <span>Remember me</span>
            </label>
            {!isSignUp && <a href="#" className="hover:underline">Need help?</a>}
          </div>
        </form>

        <div className="mt-16 text-[#b3b3b3]">
          {isSignUp ? (
            <p className="mb-2">
              Already have an account? <span onClick={() => setIsSignUp(false)} className="text-white cursor-pointer hover:underline">Sign in now.</span>
            </p>
          ) : (
            <p className="mb-2">
              New to Cinenest? <span onClick={() => setIsSignUp(true)} className="text-white cursor-pointer hover:underline">Sign up now.</span>
            </p>
          )}
          <p className="text-xs mt-4">
            This page is protected by Google reCAPTCHA to ensure you're not a bot. <a href="#" className="text-blue-500 hover:underline">Learn more.</a>
          </p>
        </div>
      </div>
    </div>
  );
}
