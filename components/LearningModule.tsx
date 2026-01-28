
import React, { useState, useEffect } from 'react';
import { LearningLevel, LearningContent } from '../types';
import { generateLearningContent } from '../services/geminiService';

interface LearningModuleProps {
  subject: string;
  topic: string;
  onBack: () => void;
}

const LearningModule: React.FC<LearningModuleProps> = ({ subject, topic, onBack }) => {
  const [level, setLevel] = useState<LearningLevel>(LearningLevel.BASIC);
  const [content, setContent] = useState<LearningContent | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [level]);

  const fetchContent = async () => {
    setLoading(true);
    try {
      const data = await generateLearningContent(subject, topic, level);
      setContent(data);
    } catch (error) {
      console.error("Failed to load content:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (level === LearningLevel.BASIC) setLevel(LearningLevel.STANDARD);
    else if (level === LearningLevel.STANDARD) setLevel(LearningLevel.ADVANCED);
  };

  const handlePrev = () => {
    if (level === LearningLevel.ADVANCED) setLevel(LearningLevel.STANDARD);
    else if (level === LearningLevel.STANDARD) setLevel(LearningLevel.BASIC);
  };

  return (
    <div className="space-y-6">
      <button 
        onClick={onBack}
        className="text-indigo-600 font-semibold flex items-center hover:translate-x-[-4px] transition-transform"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Dashboard
      </button>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="bg-indigo-600 px-8 py-6 flex justify-between items-center text-white">
          <div>
            <span className="text-indigo-200 text-sm font-bold uppercase tracking-wider">{subject}</span>
            <h2 className="text-2xl font-bold">{topic}</h2>
          </div>
          <div className="flex bg-indigo-700/50 p-1 rounded-xl">
            {Object.values(LearningLevel).map((lvl) => (
              <button
                key={lvl}
                onClick={() => setLevel(lvl)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  level === lvl ? 'bg-white text-indigo-600 shadow-sm' : 'text-indigo-200 hover:text-white'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        <div className="p-8">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
              <p className="text-slate-500 font-medium">Preparing your {level.toLowerCase()} lesson...</p>
            </div>
          ) : content ? (
            <div className="space-y-10 animate-in fade-in duration-500">
              <section>
                <div className="flex items-center text-indigo-600 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center mr-3 font-bold">1</div>
                  <h3 className="text-xl font-bold text-slate-900">Explanation</h3>
                </div>
                <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
                  {content.explanation}
                </div>
              </section>

              <section>
                <div className="flex items-center text-indigo-600 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center mr-3 font-bold">2</div>
                  <h3 className="text-xl font-bold text-slate-900">Example Case</h3>
                </div>
                <div className="bg-amber-50/50 border border-amber-100 p-6 rounded-2xl text-slate-800 italic">
                  "{content.example}"
                </div>
              </section>

              <section>
                <div className="flex items-center text-indigo-600 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center mr-3 font-bold">3</div>
                  <h3 className="text-xl font-bold text-slate-900">Practice Question</h3>
                </div>
                <div className="bg-white border-2 border-indigo-50 p-6 rounded-2xl shadow-sm">
                  <p className="text-slate-700 font-medium mb-4">{content.practiceQuestion}</p>
                  <textarea 
                    className="w-full p-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 h-32"
                    placeholder="Type your answer here..."
                  ></textarea>
                </div>
              </section>

              <div className="flex justify-between items-center pt-6 border-t border-slate-100">
                <button
                  disabled={level === LearningLevel.BASIC}
                  onClick={handlePrev}
                  className="px-6 py-2 rounded-xl font-bold text-slate-400 hover:text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Previous Level
                </button>
                <button
                  disabled={level === LearningLevel.ADVANCED}
                  onClick={handleNext}
                  className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  {level === LearningLevel.ADVANCED ? 'Completed' : 'Next Level'}
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default LearningModule;
