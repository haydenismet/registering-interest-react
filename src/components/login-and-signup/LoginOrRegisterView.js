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
          <GenericInput
            inputCategory="Email"
            inputType="email"
            labelName="arc_email_login_label"
            view={view}
            inputTypeScrape={inputTypeScrape}
            onGenericInputChange={onGenericInputChange}
            input={input}
            userEmail={userEmail}
          />
          <GenericInput
            inputCategory="Password"
            inputType="password"
            labelName="arc_password_login_label"
            view={view}
            inputTypeScrape={inputTypeScrape}
            onGenericInputChange={onGenericInputChange}
            input={input}
            userPassword={userPassword}
          />
          <div className="arc_forgot_password">forgot password?</div>
          <LoginButton
            input={input}
            inputTypeScrape={inputTypeScrape}
            onGenericInputChange={onGenericInputChange}
            userEmail={userEmail}
            userPassword={userPassword}
          />
          <div className="arc_new_account">
            <div className="arc_no_account"> don't have an account?</div>
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
