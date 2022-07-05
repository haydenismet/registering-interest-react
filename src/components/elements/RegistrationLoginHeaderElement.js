import arc_logo from "../../assets/arc_logo.png";
export default function RegistrationLoginHeaderElement() {
  /* Import logo from folder, place into reg/login element as {arc_logo} */
  return (
    <div className="registration_login_header_container">
      <div className="arc_logo">
        <img src={arc_logo} alt="registration-login-header" />
      </div>
      <div className="arc_header">Animal Rescue Collective</div>
      <div className="arc_subheader">
        Working together to find homes for pets.
      </div>
    </div>
  );
}
