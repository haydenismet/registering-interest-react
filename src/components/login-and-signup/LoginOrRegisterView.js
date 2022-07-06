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
              <p>The hero your home needs.</p>
            </div>
            <div className="arc_t_c_view">
              <div className="arc_t_c_intro">
                <div>24/7 SecureTech</div>
                <div>Organic Charge Source</div>
                <div>Range lock</div>
                <div>Target Identifiers</div>
                <div>Ultimate Protector Mode</div>
                <div>Alarm and Assist</div>
                <div>Encrypted to biofeedback scan</div>
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
