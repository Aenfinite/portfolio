import React from 'react';

const LoginScreen: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121212] text-white">
      <div className="w-full max-w-md p-8 bg-[#1A1A1A] rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 rounded bg-[#333333] text-white border border-[#444444] focus:outline-none focus:border-green-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 rounded bg-[#333333] text-white border border-[#444444] focus:outline-none focus:border-green-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-green-500 text-black rounded font-medium hover:bg-green-400 transition"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-sm text-center">
         | <a href="/forgot-password" className="text-green-400 hover:underline">Forgot Password?</a>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;