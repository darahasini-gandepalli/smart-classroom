
import React, { useState } from 'react';
import { UserData } from '../types';

interface LoginProps {
  onLogin: (data: UserData) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [rollNumber, setRollNumber] = useState('');
  const [classSection, setClassSection] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rollNumber && classSection) {
      onLogin({ rollNumber, classSection });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50">
      <div className="w-full max-w-md p-8 bg-white rounded-3xl shadow-xl border border-slate-100 mx-4">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 text-white rounded-2xl mb-4 shadow-lg shadow-indigo-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M12 14l9-5-9-5-9 5 9 5z" />
              <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Smart Classroom</h1>
          <p className="text-slate-500 mt-2">Sign in to your student dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Roll Number</label>
            <input
              type="text"
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              placeholder="Enter your roll number"
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Class / Section</label>
            <input
              type="text"
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              placeholder="e.g. 10th-A"
              value={classSection}
              onChange={(e) => setClassSection(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100"
          >
            Login to Portal
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
