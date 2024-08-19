// code: https://medium.com/@abdulahad2024/real-time-network-status-detection-in-react-js-next-js-67595c4bd81c
import { useEffect, useState } from "react";

const useNetworkStatus = () => {
  const [isOnline, setOnline] = useState<boolean>(true);

  const updateNetworkStatus = () => {
    setOnline(navigator.onLine);
  };

  useEffect(() => {
    window.addEventListener("load", updateNetworkStatus);
    window.addEventListener("online", updateNetworkStatus);
    window.addEventListener("offline", updateNetworkStatus);

    return () => {
      window.removeEventListener("load", updateNetworkStatus);
      window.removeEventListener("online", updateNetworkStatus);
      window.removeEventListener("offline", updateNetworkStatus);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigator.onLine]);

  return { isOnline };
};

export default useNetworkStatus;
