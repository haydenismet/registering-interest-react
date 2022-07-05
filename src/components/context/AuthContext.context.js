import { useState, createContext } from "react";

const AuthContext = createContext();

function AuthContextProvider(props) {
  let [loggedIn, setLoggedIn] = useState(false);

  const value = {
    loggedIn: loggedIn,
    setLoggedIn: setLoggedIn,
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
}
export { AuthContextProvider, AuthContext };
