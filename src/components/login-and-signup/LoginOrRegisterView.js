import React from "react";
import RegistrationLoginHeaderElement from "../elements/RegistrationLoginHeaderElement.js";
import TermsAndConditionsElement from "../elements/TermsAndConditionsElement.js";
import NextElement from "../elements/NextElement.js";

export default function LoginOrRegisterView(props) {
  const { handleViewClickNext, view } = props;

  return (
    <>
      <div className="arc_container_reg">
        <RegistrationLoginHeaderElement />
        <div className="arc_login">
          <div className="arc_t_c_view_container">
            <div className="arc_t_c_intro">
              <p>It's not 1985 anymore..</p>
              <p>The future is now.</p>
            </div>
            <div className="arc_t_c_view">
              <div className="arc_t_c_intro">
                <ul>
                  <li>Top speed of 28.6 MPH</li>
                  <li>Another feature</li>
                  <li>Prices starting from £999</li>
                  <li>Another feature </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="arc_new_account">
            <p>
              Register your interest today for exclusive pre-sale access to the
              pioneering hoverboard.
            </p>
            <NextElement
              nextCopy="Register interest"
              handleViewClickNext={handleViewClickNext}
              view={view}
            />
          </div>
          <TermsAndConditionsElement />
        </div>
      </div>
    </>
  );
}
