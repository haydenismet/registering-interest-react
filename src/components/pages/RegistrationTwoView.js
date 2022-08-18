import React, { useContext } from "react";
import NextElement from "../elements/NextElement.js";
import RegistrationLoginHeaderElement from "../elements/RegistrationLoginHeaderElement.js";
import ProgressBarElement from "../elements/ProgressBarElement.js";
import GenericInput from "../elements/GenericInput.js";
import BackElement from "../elements/BackElement.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { RegistrationContext } from "../context/RegistrationContext.context";
export default function RegistrationTwoView(props) {
  const {
    handleViewClickNext,
    handleViewClickBack,
    onGenericInputChange,
    inputTypeScrape,
    validateUserName,
    validateUserEmail,
    validateUserEmailConfirm,
    validateUserPassword,
    validateUserPasswordConfirm,
    input,
    view,
    restorePropsValues,
  } = props;

  const context = useContext(RegistrationContext);
  return (
    <>
      <RegistrationLoginHeaderElement />
      <ProgressBarElement stage="2" />
      <div className="arc_content_container">
        <div className="arc_registration_two_subheading">
          A few more steps to secure priority access to <b>Knight Cat</b> for
          {context.registerAccount.user_type === "Personal"
            ? " your home"
            : " your commercial property"}
        </div>
        <GenericInput
          inputCategory={
            context.registerAccount.user_type === "Personal"
              ? "Name"
              : "Organisation Name"
          }
          inputType="text"
          labelName="arc_name_label"
          onGenericInputChange={onGenericInputChange}
          input={input}
          inputTypeScrape={inputTypeScrape}
          view={view}
          restorePropsValues={restorePropsValues}
        />
        <div className="arc_form_validation">
          {context.registerAccount.name !== null ? (
            !validateUserName ? (
              "2 character minimum required."
            ) : (
              <FontAwesomeIcon icon={faCheckCircle} className="arc_fa_color" />
            )
          ) : null}
        </div>
        <GenericInput
          inputCategory="Email"
          inputType="email"
          labelName="arc_email_label"
          onGenericInputChange={onGenericInputChange}
          input={input}
          inputTypeScrape={inputTypeScrape}
          view={view}
          restorePropsValues={restorePropsValues}
        />
        <div className="arc_form_validation">
          {context.registerAccount.email !== null ? (
            !validateUserEmail ? (
              "Not a valid email "
            ) : (
              <FontAwesomeIcon icon={faCheckCircle} className="arc_fa_color" />
            )
          ) : null}
        </div>
        <GenericInput
          inputCategory="Confirm Email"
          inputType="email"
          labelName="arc_confirm_email_label"
          inputTypeScrape={inputTypeScrape}
          onGenericInputChange={onGenericInputChange}
          input={input}
          view={view}
          restorePropsValues={restorePropsValues}
        />
        <div className="arc_form_validation">
          {context.registerAccount.confirm_email !== null ? (
            !validateUserEmailConfirm ? (
              "Matching Email"
            ) : (
              <FontAwesomeIcon icon={faCheckCircle} className="arc_fa_color" />
            )
          ) : null}
        </div>
        <GenericInput
          inputCategory="Password"
          inputType="password"
          labelName="arc_password_label"
          inputTypeScrape={inputTypeScrape}
          onGenericInputChange={onGenericInputChange}
          input={input}
          view={view}
          restorePropsValues={restorePropsValues}
        />
        <div className="arc_form_validation">
          {context.registerAccount.password !== null ? (
            !validateUserPassword ? (
              "Minimum of 8 characters of uppercase, lowercase, digits and special characters"
            ) : (
              <FontAwesomeIcon icon={faCheckCircle} className="arc_fa_color" />
            )
          ) : null}
        </div>
        <GenericInput
          inputCategory="Confirm Password"
          inputType="password"
          labelName="arc_confirm_password_label"
          onGenericInputChange={onGenericInputChange}
          input={input}
          inputTypeScrape={inputTypeScrape}
          view={view}
          restorePropsValues={restorePropsValues}
        />
        <div className="arc_form_validation">
          {context.registerAccount.confirm_password !== null ? (
            !validateUserPasswordConfirm ? (
              "Matching password"
            ) : (
              <FontAwesomeIcon icon={faCheckCircle} className="arc_fa_color" />
            )
          ) : null}
        </div>
      </div>

      <div className="arc_button_container_on">
        <BackElement
          backCopy="Back"
          handleViewClickBack={handleViewClickBack}
        />
        <NextElement
          nextCopy="Continue"
          handleViewClickNext={handleViewClickNext}
          isDisabled={
            validateUserName &&
            validateUserEmail &&
            validateUserEmailConfirm &&
            validateUserPassword &&
            validateUserPasswordConfirm
              ? false
              : true
          }
          view={view}
        />
      </div>
    </>
  );
}
