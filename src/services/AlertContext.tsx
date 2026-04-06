import AlertMessage, { AlertType } from "@/Components/AlertMessage";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface AlertItem {
  message: string;
  type: AlertType;
  duration: number;
}

interface AlertContextType {
  showAlert: (message: string, type?: AlertType, duration?: number) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const useAlert = () => {
  const ctx = useContext(AlertContext);
  if (!ctx) throw new Error("useAlert must be used within AlertProvider");
  return ctx;
};

export const AlertProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [queue, setQueue] = useState<AlertItem[]>([]);
  const [current, setCurrent] = useState<AlertItem | null>(null);
  const [visible, setVisible] = useState(false);

  const showAlert = (
    message: string,
    type: AlertType = "info",
    duration = 2000
  ) => {
    setQueue((prev) => [...prev, { message, type, duration }]);
  };

  // Show next alert when idle
  React.useEffect(() => {
    if (!current && queue.length > 0) {
      const [next, ...rest] = queue;
      setCurrent(next);
      setQueue(rest);
      setVisible(true);
    }
  }, [queue, current]);

  const onDismiss = () => {
    setVisible(false);
    setCurrent(null);
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}

      {current && (
        <AlertMessage
          visible={visible}
          message={current.message}
          type={current.type}
          duration={current.duration}
          onDismiss={onDismiss}
        />
      )}
    </AlertContext.Provider>
  );
};