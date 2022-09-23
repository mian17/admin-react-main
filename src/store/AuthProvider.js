// React imports
import { useEffect, useState } from "react";

// Source imports
import AuthContext from "./auth-context";

const authDefaultState = {
  loggedIn: localStorage.getItem("loggedIn")
    ? localStorage.getItem("loggedIn")
    : false,
  personalAccessToken: "",
};
const AuthProvider = (props) => {
  const [authState, setAuthState] = useState(authDefaultState);

  /////////////////////////////////////////
  // HANDLERS
  const setLoggedInHandler = (loggedInState) => {
    setAuthState(loggedInState);
  };
  const setLoggedOutHandler = () => {
    localStorage.removeItem("personalAccessToken");
    localStorage.removeItem("loggedIn");
    setAuthState({
      loggedIn: false,
      personalAccessToken: "",
    });
  };

  useEffect(() => {
    if (localStorage.getItem("personalAccessToken") !== null) {
      setAuthState({
        loggedIn: true,
        personalAccessToken: JSON.parse(
          localStorage.getItem("personalAccessToken")
        ),
      });
    }
  }, []);

  /////////////////////////////////////////
  // SETTING CONTEXT'S VALUES
  const authContext = {
    loggedIn: authState.loggedIn,
    personalAccessToken: authState.personalAccessToken,
    setLoggedIn: setLoggedInHandler,
    setLoggedOut: setLoggedOutHandler,
  };

  return (
    <AuthContext.Provider value={authContext}>
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
