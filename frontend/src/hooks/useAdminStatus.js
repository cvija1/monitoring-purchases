import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export const useAdminStatus = () => {
  const [admin, setAdmin] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    if (user?.isAdmin) {
      setAdmin(true);
    } else {
      setAdmin(false);
    }
    setCheckingStatus(false);
  }, [user]);

  return { admin, checkingStatus };
};
