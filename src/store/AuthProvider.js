// React imports
import { useEffect, useState } from "react";

// Source imports
import AuthContext from "./auth-context";
import { useIdleTimer } from "react-idle-timer";

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
    start();
  };
  const setLoggedOutHandler = () => {
    // console.log("clicked");
    localStorage.removeItem("personalAccessToken");
    localStorage.removeItem("loggedIn");
    setAuthState({
      loggedIn: false,
      personalAccessToken: "",
    });
  };

  const onIdle = () => {
    if (authState.loggedIn) {
      console.log(getRemainingTime());
      if (getRemainingTime() === 0) {
        setLoggedOutHandler();
      }
    }
  };

  const onActive = () => {
    if (authState.loggedIn) {
      reset();
    }
  };

  const { start, reset, getRemainingTime } = useIdleTimer({
    timeout: 1000 * 60 * 30,
    onIdle,
    onActive,
    startOnMount: true,
    startManually: true,
    crossTab: true,
  });

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
