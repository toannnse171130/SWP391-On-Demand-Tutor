import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const AuthContext = createContext({
  roleId: "",
  userId: "",
  fullName: "",
  checkUserId: () => null,
});

function AuthProvider({ children }) {
  const [roleId, setRoleId] = useState("");
  const [userId, setUserId] = useState("");
  const [fullName, setFullName] = useState("");

  const checkUserId = () => {
    const userId = localStorage?.getItem("userId");
    const fullName = localStorage?.getItem("fullName");
    const roleId = localStorage?.getItem("roleId");
    setRoleId(roleId);
    setFullName(fullName);
    setUserId(userId);
  };

  useEffect(() => {
    checkUserId();
  }, []);

  const contextValue = useMemo(
    () => ({
      roleId,
      userId,
      fullName,
      checkUserId,
    }),
    [roleId, userId, fullName]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

const useAuthContext = () => useContext(AuthContext);

export { AuthContext, AuthProvider, useAuthContext };
