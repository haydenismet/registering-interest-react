import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser } from "@fortawesome/free-solid-svg-icons";
export default function RegistrationLoginHeaderElement(props) {
  const auth = useContext(AuthContext);

  function logoutUser() {
    auth.setLoggedIn(false);
  }

  return (
    <div className="homeview_header_container">
      <div id="arc_menu">
        <FontAwesomeIcon icon={faBars} />
      </div>
      <div id="arc_logout" onClick={logoutUser}>
        Logout
      </div>
      <div className="arc_header_homeview">
        Animal Rescue <br />
        Collective
      </div>

      <div id="arc_profile">
        <FontAwesomeIcon icon={faUser} />
      </div>
    </div>
  );
}
