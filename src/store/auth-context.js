import React from "react";

const AuthContext = React.createContext({
  loggedIn: false,
  personalAccessToken: "",
  setLoggedIn: () => {},
  setLoggedOut: () => {},
});
export default AuthContext;
