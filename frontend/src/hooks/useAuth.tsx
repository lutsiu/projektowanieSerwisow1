export const useAuth = (): {isAuthenticated: boolean} => {
  const token = localStorage.getItem("token"); // Get JWT
  return { isAuthenticated: !token ? true: false }; // Returns true/false
};