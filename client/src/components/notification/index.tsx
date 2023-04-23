import React, { createContext, useContext, useEffect, useRef, useState } from "react";

interface NotificationContextData {
    showNotification: (message: string, isError: boolean, time: number) => void;
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
    const [notification, setNotification] = useState<{
        message: string;
        visible: boolean;
        leaving: boolean;
        isError: boolean;
    }>({
        message: "",
        visible: false,
        leaving: false,
        isError: false,
    });

    const notificationRef = useRef<HTMLDivElement>(null);

    const showNotification = (message: string, isError: boolean, time = 3000) => {
        setNotification({ message, visible: true, leaving: false, isError });
        setTimeout(() => setNotification((prev) => ({ ...prev, leaving: true })), time);
    };

    useEffect(() => {
        if (notification.leaving && notificationRef.current) {
            const handleAnimationEnd = () => {
                setNotification({ message: "", visible: false, leaving: false, isError: false });
            };
            notificationRef.current.addEventListener("animationend", handleAnimationEnd);
            return () => {
                notificationRef.current?.removeEventListener("animationend", handleAnimationEnd);
            };
        }
    }, [notification.leaving]);

    return (
        <NotificationContext.Provider value={{ showNotification }}>
            {children}
            {notification.visible && (
                <div
                    ref={notificationRef}
                    className={`fixed bottom-4 right-4 text-white py-2 px-4 rounded ${
                        notification.leaving ? "animate-slide-out" : "animate-slide-in"
                    } ${notification.isError ? "bg-red-500" : "bg-green-500"}`}
                >
                    {notification.message}
                </div>
            )}
        </NotificationContext.Provider>
    );
};
