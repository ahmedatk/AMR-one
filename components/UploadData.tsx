import React, { useState, useCallback } from 'react';
import { runPrediction } from '../services/api';
import { Prediction } from '../types';
import PredictionsTable from './PredictionsTable';
import { UploadCloud, FileText } from './icons';

const UploadData: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [predictions, setPredictions] = useState<Prediction[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileChange = (selectedFile: File | null) => {
    if (selectedFile) {
        if (selectedFile.type === 'text/csv') {
            setFile(selectedFile);
            setError(null);
        } else {
            setError('Invalid file type. Please upload a CSV file.');
            setFile(null);
        }
    }
  };

  const handleDragEvents = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    handleDragEvents(e);
    setIsDragOver(true);
  };
  
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    handleDragEvents(e);
    setIsDragOver(false);
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    handleDragEvents(e);
    setIsDragOver(false);
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
        handleFileChange(droppedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file to upload.');
      return;
    }
    setIsProcessing(true);
    setPredictions(null);
    try {
      const result = await runPrediction(file);
      setPredictions(result);
    } catch (err) {
      setError('An error occurred during prediction.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-gray-800 border border-gray-700 p-8 rounded-lg">
        <h2 className="text-2xl font-semibold mb-6 text-white">Upload AMR Data & Run Prediction</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div 
            onDrop={handleDrop}
            onDragOver={handleDragEvents}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            className={`relative border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
              isDragOver ? 'border-indigo-500 bg-gray-700/50' : 'border-gray-600'
            }`}
          >
            <UploadCloud className="mx-auto h-12 w-12 text-gray-500" />
            <p className="mt-4 text-sm text-gray-400">
              <span className="font-semibold text-indigo-400">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500">CSV files only</p>
            <input 
              type="file" 
              accept=".csv"
              onChange={(e) => handleFileChange(e.target.files?.[0] || null)} 
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
          
          {file && (
            <div className="flex items-center justify-center p-3 bg-gray-700 rounded-md">
                <FileText className="w-6 h-6 text-gray-400 mr-3" />
                <span className="text-sm font-medium text-white">{file.name}</span>
            </div>
          )}

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          
          <div>
            <button
              type="submit"
              disabled={!file || isProcessing}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-500 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isProcessing ? 'Processing...' : 'Run Prediction'}
            </button>
          </div>
        </form>
      </div>

      {isProcessing && (
         <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      )}

      {predictions && (
        <div className="bg-gray-800 border border-gray-700 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4 text-white">Prediction Results</h3>
          <PredictionsTable predictions={predictions} />
        </div>
      )}
    </div>
  );
};

export default UploadData;
