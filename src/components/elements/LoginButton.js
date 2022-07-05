import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.context";

export default function LoginButton(props) {
  const auth = useContext(AuthContext);
  function onLogin(e) {
    e.preventDefault();
    auth.setLoggedIn(true);
  }
  return (
    <>
      <div className="arc_login_button" onClick={onLogin}>
        login, woof
      </div>
    </>
  );
}
