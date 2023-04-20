import React, { createContext, useContext, useState } from "react";

interface NotificationContextData {
    showNotification: (message: string) => void;
}

const NotificationContext = createContext<NotificationContextData>({
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    showNotification: () => {},
});

export const useNotification = (): NotificationContextData => {
    return useContext(NotificationContext);
};

interface NotificationProviderProps {
    children: React.ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
    const [notification, setNotification] = useState<{ message: string; visible: boolean }>({
        message: "",
        visible: false,
    });

    const showNotification = (message: string) => {
        setNotification({ message, visible: true });
        setTimeout(() => setNotification({ message: "", visible: false }), 1500);
    };

    return (
        <NotificationContext.Provider value={{ showNotification }}>
            {children}
            {notification.visible && (
                <div className="fixed top-0 left-0 right-0 bg-green-500 text-white py-2 px-4 text-center animate-genie">
                    {notification.message}
                </div>
            )}
        </NotificationContext.Provider>
    );
};
