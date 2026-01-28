
import React, { useState, useEffect } from 'react';
import { AppView, UserData, LearningLevel } from './types';
import Login from './components/Login';
import Portal from './components/Portal';
import LearningModule from './components/LearningModule';
import SmartNotes from './components/SmartNotes';

const STORAGE_KEY = 'smart_classroom_user';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>(AppView.LOGIN);
  const [user, setUser] = useState<UserData | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [selectedTopic, setSelectedTopic] = useState<string>('');

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setUser(JSON.parse(saved));
      setView(AppView.PORTAL);
    }
  }, []);

  const handleLogin = (data: UserData) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    setUser(data);
    setView(AppView.PORTAL);
  };

  const handleLogout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
    setView(AppView.LOGIN);
  };

  const navigateToPortal = () => setView(AppView.PORTAL);
  
  const startLearning = (subject: string, topic: string) => {
    setSelectedSubject(subject);
    setSelectedTopic(topic);
    setView(AppView.LEARNING_MODULE);
  };

  const startNotes = (subject: string, topic: string) => {
    setSelectedSubject(subject);
    setSelectedTopic(topic);
    setView(AppView.SMART_NOTES);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {view === AppView.LOGIN && <Login onLogin={handleLogin} />}
      
      {user && (
        <div className="max-w-6xl mx-auto px-4 py-8">
          <header className="flex flex-col md:flex-row justify-between items-center mb-10 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Smart Classroom</h1>
              <p className="text-slate-500 font-medium">
                Welcome <span className="text-indigo-600 font-bold">{user.rollNumber}</span> – Class <span className="text-indigo-600 font-bold">{user.classSection}</span>
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="mt-4 md:mt-0 px-6 py-2 rounded-xl bg-rose-50 text-rose-600 font-semibold hover:bg-rose-100 transition-colors"
            >
              Logout
            </button>
          </header>

          <main>
            {view === AppView.PORTAL && (
              <Portal 
                onStartLearning={startLearning} 
                onStartNotes={startNotes} 
              />
            )}
            
            {view === AppView.LEARNING_MODULE && (
              <LearningModule 
                subject={selectedSubject} 
                topic={selectedTopic} 
                onBack={navigateToPortal}
              />
            )}
            
            {view === AppView.SMART_NOTES && (
              <SmartNotes 
                subject={selectedSubject} 
                topic={selectedTopic} 
                onBack={navigateToPortal}
              />
            )}
          </main>
        </div>
      )}
    </div>
  );
};

export default App;
