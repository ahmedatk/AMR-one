import React, { useState, useEffect, useContext } from 'react';
import Sidebar from './components/Sidebar.tsx';
import Header from './components/Header.tsx';
import Dashboard from './components/Dashboard.tsx';
import UploadData from './components/UploadData.tsx';
import Settings from './components/Settings.tsx';
import Profile from './components/Profile.tsx';
import Tour from './components/Tour.tsx';
import HelpModal from './components/HelpModal.tsx';
import SearchModal from './components/SearchModal.tsx';
import { runPrediction } from './services/api.ts';
import { Theme, View } from './types.ts';
import { ToastProvider, ToastContext } from './contexts/ToastContext.tsx';

const AppContent: React.FC = () => {
    const [view, setView] = useState<View>('dashboard');
    const [theme, setTheme] = useState<Theme>(() => {
        const savedTheme = localStorage.getItem('theme') as Theme;
        if (savedTheme) return savedTheme;
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    });
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [showTour, setShowTour] = useState(false);
    const [isHelpOpen, setIsHelpOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const { showToast } = useContext(ToastContext);

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const handleFileUpload = async (file: File) => {
        try {
            await runPrediction(file);
            showToast(`Successfully processed ${file.name} and generated new predictions.`, 'success');
            setView('dashboard');
        } catch (error) {
            showToast('Failed to process the file. Please try again.', 'error');
            console.error(error);
        }
    };

    const handleThemeChange = (newTheme: Theme) => {
        setTheme(newTheme);
    };

    const handleTourClose = () => {
        setShowTour(false);
        localStorage.setItem('tourCompleted', 'true');
    }
    
    const handleSelectDistrict = () => {
        // This function will be passed to the search modal
        // to handle selecting a district, for now it just closes the modal
        setIsSearchOpen(false);
    }

    const renderView = () => {
        switch (view) {
            case 'dashboard':
                return <Dashboard />;
            case 'upload':
                return <UploadData onFileUpload={handleFileUpload} />;
            case 'settings':
                return <Settings currentTheme={theme} onThemeChange={handleThemeChange} />;
            case 'profile':
                return <Profile />;
            default:
                return <Dashboard />;
        }
    };

    return (
        <div className={`flex h-screen bg-gray-100 dark:bg-gray-900 font-sans text-gray-900 dark:text-gray-100`}>
            {showTour && <Tour onClose={handleTourClose} />}
            {isHelpOpen && <HelpModal onClose={() => setIsHelpOpen(false)} />}
            {isSearchOpen && <SearchModal onClose={() => setIsSearchOpen(false)} onSelectDistrict={handleSelectDistrict} />}

            <Sidebar 
                currentView={view} 
                onViewChange={setView} 
                isSidebarOpen={isSidebarOpen} 
                setIsSidebarOpen={setIsSidebarOpen} 
                onStartTour={() => setShowTour(true)}
                onHelpClick={() => setIsHelpOpen(true)}
            />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header 
                    currentView={view} 
                    onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
                    onSearchClick={() => setIsSearchOpen(true)}
                />
                <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 lg:p-8">
                    {renderView()}
                </main>
            </div>
        </div>
    );
};

const App: React.FC = () => {
    return (
        <ToastProvider>
            <AppContent />
        </ToastProvider>
    );
};

export default App;