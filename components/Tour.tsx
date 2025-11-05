import React, { useState } from 'react';
import { X } from './icons.tsx';

interface TourProps {
  onClose: () => void;
}

const Tour: React.FC<TourProps> = ({ onClose }) => {
    const [step, setStep] = useState(0);

    const steps = [
        {
            title: "Welcome to AMR-One!",
            content: "This quick tour will guide you through the key features of the dashboard.",
        },
        {
            title: "The Dashboard",
            content: "This is your main view. Here you can see a geographical heatmap of risk areas, track resistance trends, and view the latest predictions.",
        },
        {
            title: "Upload Your Data",
            content: "Navigate to 'Upload Data' in the sidebar to add your own surveillance data. Our model will analyze it and generate new risk predictions.",
        },
        {
            title: "Customize Your View",
            content: "In 'Settings', you can switch between light and dark themes to suit your preference.",
        }
    ];

    const currentStep = steps[step];

    const nextStep = () => setStep(s => Math.min(s + 1, steps.length - 1));
    const prevStep = () => setStep(s => Math.max(s - 1, 0));
    
    const handleFinish = () => {
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full max-w-md transform transition-all">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{currentStep.title}</h3>
                        <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700">
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">{currentStep.content}</p>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-b-lg">
                    <span className="text-sm text-gray-500 dark:text-gray-400">{step + 1} / {steps.length}</span>
                    <div className="space-x-2">
                        {step > 0 && <button onClick={prevStep} className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600">Previous</button>}
                        {step < steps.length - 1 ? (
                             <button onClick={nextStep} className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700">Next</button>
                        ) : (
                            <button onClick={handleFinish} className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700">Finish</button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tour;
