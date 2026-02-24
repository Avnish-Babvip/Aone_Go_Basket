import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  const { isCustomerLoggedIn } = useSelector((state) => state.authentication);

  useEffect(() => {
    if (!isCustomerLoggedIn) {
      window.dispatchEvent(new Event("openLoginModal"));
    }
  }, [isCustomerLoggedIn]);

  if (!isCustomerLoggedIn) {
    return null; // ⛔ don't render protected page
  }

  return children;
}
