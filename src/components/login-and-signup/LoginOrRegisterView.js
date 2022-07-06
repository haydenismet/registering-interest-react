import React from "react";
import RegistrationLoginHeaderElement from "../elements/RegistrationLoginHeaderElement.js";
import TermsAndConditionsElement from "../elements/TermsAndConditionsElement.js";
import GenericInput from "../elements/GenericInput.js";
import NextElement from "../elements/NextElement.js";
import LoginButton from "../elements/LoginButton.js";

export default function LoginOrRegisterView(props) {
  const {
    handleViewClickNext,
    view,
    input,
    inputTypeScrape,
    onGenericInputChange,
    userEmail,
    userPassword,
  } = props;

  return (
    <>
      <div className="arc_container_reg">
        <RegistrationLoginHeaderElement />
        <div className="arc_login">
          <div className="arc_new_account">
            <NextElement
              nextCopy="create a new account"
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
