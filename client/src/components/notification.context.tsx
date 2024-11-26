import React, {createContext, useState, useContext, useCallback} from 'react';
import ApiManager from "../services/api-manager.tsx";

export interface FileNotification {
    id: string;
    fileName?: string;
    file?: Uint8Array;
    sender: string;
    receivedAt: Date;
    groupId?: number;
    byteLength?: number;
}

interface FileNotificationContextType {
    notifications: FileNotification[];
    addNotification: (notification: FileNotification) => void;
    removeNotification: (notificationId: string) => void;
    downloadFile: (notification: FileNotification) => Promise<void>;
}

const FileNotificationContext = createContext<FileNotificationContextType | undefined>(undefined);

export const FileNotificationProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [notifications, setNotifications] = useState<FileNotification[]>([]);

    const addNotification = useCallback((notification: FileNotification) => {
        setNotifications((prev) => [...prev, notification]);
    }, []);

    const removeNotification = useCallback((notificationId: string) => {
        setNotifications(prev => prev.filter(notif => notif.id !== notificationId));
    }, []);

    const downloadFile = useCallback(async (notification: FileNotification) => {
        const blob = new Blob([notification.file]);
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = notification.fileName as string;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        removeNotification(notification.id);

        try {
            const peerId: string = sessionStorage.getItem('peerId');
            const fileDto = {
                name: notification.fileName,
                size: notification.file.byteLength,
                id: undefined,
            };
            await ApiManager.createFileAvailabilityIndexByPeerId(peerId, fileDto, notification.groupId);
            console.log("File availability index updated successfully");
        } catch (error) {
            console.error("Error updating file availability index:", error);
        }
    }, [removeNotification]);

    return (
        <FileNotificationContext.Provider
            value={{
                notifications,
                addNotification,
                removeNotification,
                downloadFile
            }}
        >
            {children}
        </FileNotificationContext.Provider>
    );
};

export const useFileNotifications = () => {
    const context = useContext(FileNotificationContext);
    if (context === undefined) {
        throw new Error('useFileNotifications must be used within a FileNotificationProvider');
    }
    return context;
};