
import React, { useState } from 'react';
import { generateSmartNotes } from '../services/geminiService';
import { SmartNotesResult } from '../types';

interface SmartNotesProps {
  subject: string;
  topic: string;
  onBack: () => void;
}

const SmartNotes: React.FC<SmartNotesProps> = ({ subject, topic, onBack }) => {
  const [rawNotes, setRawNotes] = useState('');
  const [result, setResult] = useState<SmartNotesResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!rawNotes.trim()) return;
    setLoading(true);
    try {
      const data = await generateSmartNotes(rawNotes);
      setResult(data);
    } catch (error) {
      console.error("Summary generation failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <button 
        onClick={onBack}
        className="text-emerald-600 font-semibold flex items-center hover:translate-x-[-4px] transition-transform"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Dashboard
      </button>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Input Notes</h2>
          </div>
          
          <p className="text-slate-500 mb-4 text-sm">Paste your lecture notes, textbook snippets, or raw study material below.</p>
          
          <textarea
            className="w-full h-80 p-6 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-slate-700 bg-slate-50/30 font-mono text-sm leading-relaxed"
            placeholder="Paste your notes here..."
            value={rawNotes}
            onChange={(e) => setRawNotes(e.target.value)}
          ></textarea>

          <button
            disabled={loading || !rawNotes.trim()}
            onClick={handleGenerate}
            className="w-full mt-6 bg-emerald-600 text-white font-bold py-4 px-4 rounded-2xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin mr-3"></div>
                Analyzing Notes...
              </>
            ) : (
              'Generate Smart Notes'
            )}
          </button>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 min-h-[500px] flex flex-col">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-900">AI Summary</h2>
          </div>

          {!result && !loading ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center px-8 border-2 border-dashed border-slate-100 rounded-2xl">
              <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </div>
              <p className="text-slate-400 font-medium italic">Your intelligent summary will appear here after you paste your notes.</p>
            </div>
          ) : loading ? (
            <div className="flex-1 space-y-4 pt-4">
              <div className="h-4 bg-slate-100 rounded animate-pulse w-3/4"></div>
              <div className="h-4 bg-slate-100 rounded animate-pulse"></div>
              <div className="h-4 bg-slate-100 rounded animate-pulse w-5/6"></div>
              <div className="h-20 bg-slate-100 rounded animate-pulse mt-8"></div>
              <div className="h-4 bg-slate-100 rounded animate-pulse w-1/2"></div>
            </div>
          ) : result ? (
            <div className="space-y-8 animate-in slide-in-from-right duration-500">
              <div>
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">Executive Summary</h3>
                <p className="text-slate-700 leading-relaxed bg-indigo-50/30 p-5 rounded-2xl border border-indigo-50/50">
                  {result.summary}
                </p>
              </div>
              
              <div>
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Key Takeaways</h3>
                <ul className="space-y-3">
                  {result.keyPoints.map((point, idx) => (
                    <li key={idx} className="flex items-start">
                      <div className="mt-1.5 mr-3 w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0"></div>
                      <span className="text-slate-700 font-medium">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default SmartNotes;
