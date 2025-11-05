import React, { useState, useMemo } from 'react';
import { X, Search } from './icons.tsx';
import { MOCK_DISTRICT_DATA } from '../constants.ts';
import { DistrictData } from '../types.ts';


interface SearchModalProps {
  onClose: () => void;
  onSelectDistrict: (districtName: string) => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ onClose, onSelectDistrict }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredDistricts = useMemo(() => {
        if (!searchTerm) return MOCK_DISTRICT_DATA.slice(0, 5); // Show first 5 by default
        return MOCK_DISTRICT_DATA.filter(d => 
            d.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm]);

    const handleSelect = (districtName: string) => {
        onSelectDistrict(districtName);
        onClose();
    }

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex justify-center pt-20 p-4" onClick={onClose}>
            <div 
                className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full max-w-xl h-fit transform transition-all"
                onClick={e => e.stopPropagation()}
            >
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                         <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input 
                        type="text"
                        placeholder="Search for a district..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        autoFocus
                        className="w-full bg-transparent p-4 pl-10 text-lg border-b border-gray-200 dark:border-gray-700 focus:outline-none"
                    />
                    <button onClick={onClose} className="absolute inset-y-0 right-0 p-3 text-gray-400 hover:text-gray-600">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-4 max-h-80 overflow-y-auto">
                    {filteredDistricts.length > 0 ? (
                        <ul>
                            {filteredDistricts.map(district => (
                                <li key={district.id}>
                                    <button 
                                        onClick={() => handleSelect(district.name)}
                                        className="w-full text-left p-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                        {district.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="text-center p-8 text-gray-500">
                            <p>No districts found for "{searchTerm}"</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchModal;
