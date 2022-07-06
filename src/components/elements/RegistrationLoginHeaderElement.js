import arc_logo from "../../assets/arc_logo.png";
export default function RegistrationLoginHeaderElement() {
  /* Import logo from folder, place into reg/login element as {arc_logo} */
  return (
    <div className="registration_login_header_container">
      <div className="arc_logo">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path
            fill="#FFFFFF"
            d="M199.1 272C199.1 263.2 207.2 256 215.1 256C224.8 256 231.1 263.2 231.1 272C231.1 280.8 224.8 288 215.1 288C207.2 288 199.1 280.8 199.1 272zM312 272C312 280.8 304.8 288 296 288C287.2 288 280 280.8 280 272C280 263.2 287.2 256 296 256C304.8 256 312 263.2 312 272zM256.3-.0068C261.9-.0507 267.3 1.386 272.1 4.066L476.5 90.53C487.7 95.27 495.2 105.1 495.9 118.1C501.6 213.6 466.7 421.9 272.5 507.7C267.6 510.5 261.1 512.1 256.3 512C250.5 512.1 244.9 510.5 239.1 507.7C45.8 421.9 10.95 213.6 16.57 118.1C17.28 105.1 24.83 95.27 36.04 90.53L240.4 4.066C245.2 1.386 250.7-.0507 256.3-.0068H256.3zM223.1 208L159.1 144V272C159.1 325 202.1 368 255.1 368C309 368 352 325 352 272V144L288 208H223.1z"
          />
        </svg>
      </div>
      <div className="arc_header_knightcat">Knight Cat</div>
      <div className="arc_subheader">- Keep your home safe -</div>
    </div>
  );
}
