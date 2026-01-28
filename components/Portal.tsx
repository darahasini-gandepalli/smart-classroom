
import React, { useState } from 'react';
import { SUBJECTS } from '../constants';

interface PortalProps {
  onStartLearning: (subject: string, topic: string) => void;
  onStartNotes: (subject: string, topic: string) => void;
}

const Portal: React.FC<PortalProps> = ({ onStartLearning, onStartNotes }) => {
  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');

  const canProceed = subject && topic.trim().length > 0;

  return (
    <div className="grid md:grid-cols-1 gap-8 max-w-2xl mx-auto">
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Classroom Portal</h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Select Subject</label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            >
              <option value="">-- Choose Subject --</option>
              {SUBJECTS.map((sub) => (
                <option key={sub} value={sub}>{sub}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Topic Name</label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter specific topic to study"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            <button
              disabled={!canProceed}
              onClick={() => onStartLearning(subject, topic)}
              className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all group ${
                canProceed 
                  ? 'border-indigo-100 hover:border-indigo-600 hover:bg-indigo-50 bg-indigo-50/30' 
                  : 'border-slate-100 bg-slate-50 cursor-not-allowed opacity-50'
              }`}
            >
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-3 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 19 7.5 19s3.332-.477 4.5-1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 19 16.5 19c-1.746 0-3.332-.477-4.5-1.253" />
                </svg>
              </div>
              <span className="font-bold text-indigo-900">Learning Module</span>
            </button>

            <button
              disabled={!canProceed}
              onClick={() => onStartNotes(subject, topic)}
              className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all group ${
                canProceed 
                  ? 'border-emerald-100 hover:border-emerald-600 hover:bg-emerald-50 bg-emerald-50/30' 
                  : 'border-slate-100 bg-slate-50 cursor-not-allowed opacity-50'
              }`}
            >
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-3 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <span className="font-bold text-emerald-900">AI Smart Notes</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portal;
