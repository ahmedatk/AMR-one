import React, { useState, useEffect } from 'react';
import { Notification } from '../types.ts';
import { fetchNotifications } from '../services/api.ts';

interface NotificationsPanelProps {
    onClose: () => void;
}

const NotificationsPanel: React.FC<NotificationsPanelProps> = ({ onClose }) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadNotifications = async () => {
            const data = await fetchNotifications();
            setNotifications(data);
            setIsLoading(false);
        };
        loadNotifications();
    }, []);

    return (
        <div 
            className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 origin-top-right"
            role="menu"
            aria-orientation="vertical"
        >
            <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-gray-800 dark:text-gray-200">Notifications</h3>
            </div>
            <div className="max-h-96 overflow-y-auto">
                {isLoading ? (
                    <div className="p-4 text-center text-gray-500">Loading...</div>
                ) : notifications.length === 0 ? (
                    <div className="p-4 text-center text-gray-500">No new notifications</div>
                ) : (
                    notifications.map(notif => (
                        <div key={notif.id} className="flex items-start p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                            {!notif.read && <div className="w-2 h-2 bg-indigo-500 rounded-full mt-1.5 flex-shrink-0"></div>}
                            <div className={notif.read ? "ml-0" : "ml-3"}>
                                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{notif.title}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{notif.description}</p>
                                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{notif.time}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
            <div className="p-2 bg-gray-50 dark:bg-gray-700/50 rounded-b-lg">
                <button className="w-full text-center text-sm text-indigo-600 dark:text-indigo-400 font-medium py-1">
                    Mark all as read
                </button>
            </div>
        </div>
    );
};

export default NotificationsPanel;
