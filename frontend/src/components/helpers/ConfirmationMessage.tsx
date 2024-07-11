import React, { useEffect, useState } from "react";

interface ConfirmationMessageProps {
  message: string;
  show: boolean;
  duration?: number;
}

const ConfirmationMessage: React.FC<ConfirmationMessageProps> = ({
  message,
  show,
  duration = 3000,
}) => {
  const [visible, setVisible] = useState(show);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (show) {
      setVisible(true);
      setFadeOut(false);
      const hideTimer = setTimeout(() => {
        setFadeOut(true);
        const removeTimer = setTimeout(() => {
          setVisible(false);
        }, 500);
        return () => clearTimeout(removeTimer);
      }, duration);
      return () => clearTimeout(hideTimer);
    } else {
      setVisible(false);
    }
  }, [show, duration]);

  if (!visible) {
    return null;
  }

  return (
    <div className={`confirmation-message ${fadeOut ? "fade-out" : ""}`}>
      {message}
    </div>
  );
};

export default ConfirmationMessage;
