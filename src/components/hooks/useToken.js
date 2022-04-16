import { useState } from "react";

function useToken() {
  //   debugger;
  const getToken = () => {
    // sessionStorage.removeItem("token");
    // debugger;
    const tokenString = sessionStorage.getItem("token");
    const token = JSON.parse(tokenString);
    console.log("token= ", token);
    return token;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken) => {
    //redirect to App
    sessionStorage.setItem("token", JSON.stringify(userToken));
  };

  return {
    setToken: saveToken,
    token,
  };
}

export default useToken;
