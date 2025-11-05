import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, FileCheck } from './icons.tsx';

interface UploadDataProps {
  onFileUpload: (file: File) => void;
}

const UploadData: React.FC<UploadDataProps> = ({ onFileUpload }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<{headers: string[], rows: string[][]}|null>(null);

  const parseCSVPreview = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
        const text = reader.result as string;
        const lines = text.split('\n').slice(0, 6); // Read header + 5 rows
        const headers = lines[0].split(',').map(h => h.trim());
        const rows = lines.slice(1).map(line => line.split(',').map(cell => cell.trim()));
        setPreview({ headers, rows });
    };
    reader.readAsText(file);
  }

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0];
      setFile(selectedFile);
      if (selectedFile.type === 'text/csv') {
        parseCSVPreview(selectedFile);
      } else {
        setPreview(null);
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
    },
    multiple: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (file) {
      setIsUploading(true);
      onFileUpload(file);
    }
  };
  
  const handleClear = () => {
    setFile(null);
    setPreview(null);
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-8 rounded-lg text-center">
            <h2 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">Upload Surveillance Data</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">Upload a CSV file to generate new risk predictions.</p>
            
            <form onSubmit={handleSubmit}>
                {!file ? (
                    <div
                        {...getRootProps()}
                        className={`p-10 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                            isDragActive
                            ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                            : 'border-gray-300 dark:border-gray-600 hover:border-indigo-400 dark:hover:border-indigo-500'
                        }`}
                    >
                        <input {...getInputProps()} />
                        <div className="flex flex-col items-center">
                            <UploadCloud className="w-12 h-12 text-gray-400 dark:text-gray-500 mb-4" />
                            <p className="text-gray-500 dark:text-gray-400">
                                {isDragActive ? 'Drop the file here ...' : 'Drag file here, or click to select'}
                            </p>
                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">CSV format only</p>
                        </div>
                    </div>
                ) : (
                    <div className="text-left p-6 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <div className="flex justify-between items-center">
                             <div className="flex items-center space-x-3">
                                <FileCheck className="w-8 h-8 text-green-500" />
                                <div>
                                    <p className="font-semibold text-gray-800 dark:text-gray-200">{file.name}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{(file.size / 1024).toFixed(2)} KB</p>
                                </div>
                             </div>
                             <button type="button" onClick={handleClear} className="text-sm text-indigo-600 hover:underline">Clear</button>
                        </div>
                    </div>
                )}
                
                {preview && (
                    <div className="mt-6 text-left">
                        <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">File Preview (First 5 Rows)</h3>
                        <div className="overflow-x-auto border border-gray-200 dark:border-gray-700 rounded-lg">
                            <table className="min-w-full text-sm">
                                <thead className="bg-gray-100 dark:bg-gray-700">
                                    <tr>{preview.headers.map(h => <th key={h} className="p-2 font-medium">{h}</th>)}</tr>
                                </thead>
                                <tbody className="bg-white dark:bg-gray-800">
                                    {preview.rows.map((row, i) => (
                                        <tr key={i} className="border-t border-gray-200 dark:border-gray-700">{row.map((cell, j) => <td key={j} className="p-2 truncate">{cell}</td>)}</tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={!file || isUploading}
                    className="mt-6 w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    {isUploading ? 'Processing...' : 'Run Prediction'}
                </button>
            </form>
        </div>
    </div>
  );
};

export default UploadData;
