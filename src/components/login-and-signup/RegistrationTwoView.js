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
    handleViewTwo,
    view,
  } = props;

  const context = useContext(RegistrationContext);
  return (
    <>
      <RegistrationLoginHeaderElement />
      <div className="arc_container_reg">
        <ProgressBarElement stage="2" />
        <div className="arc_registration_two_container">
          <div className="arc_registration_two_heading">Great to have you!</div>
          <div className="arc_registration_two_subheading">
            We can't wait to help you
            {context.registerAccount.user_type === "user"
              ? " find your new companion!"
              : " give pets their forever home!"}
          </div>
          <GenericInput
            inputCategory={
              context.registerAccount.user_type === "user"
                ? "Name"
                : "Organisation Name"
            }
            inputType="text"
            labelName="arc_name_label"
            onGenericInputChange={onGenericInputChange}
            input={input}
            inputTypeScrape={inputTypeScrape}
            view={view}
          />
          <div className="arc_form_validation">
            {!validateUserName ? (
              "Name"
            ) : (
              <FontAwesomeIcon icon={faCheckCircle} className="arc_fa_color" />
            )}
          </div>
          <GenericInput
            inputCategory="Email"
            inputType="email"
            labelName="arc_email_label"
            onGenericInputChange={onGenericInputChange}
            input={input}
            inputTypeScrape={inputTypeScrape}
            view={view}
          />
          <div className="arc_form_validation">
            {!validateUserEmail ? (
              "Not a valid email "
            ) : (
              <FontAwesomeIcon icon={faCheckCircle} className="arc_fa_color" />
            )}
          </div>
          <GenericInput
            inputCategory="Confirm Email"
            inputType="email"
            labelName="arc_confirm_email_label"
            inputTypeScrape={inputTypeScrape}
            onGenericInputChange={onGenericInputChange}
            input={input}
            view={view}
          />
          <div className="arc_form_validation">
            {!validateUserEmailConfirm ? (
              "Matching Email"
            ) : (
              <FontAwesomeIcon icon={faCheckCircle} className="arc_fa_color" />
            )}
          </div>
          <GenericInput
            inputCategory="Password"
            inputType="password"
            labelName="arc_password_label"
            inputTypeScrape={inputTypeScrape}
            onGenericInputChange={onGenericInputChange}
            input={input}
            view={view}
          />
          <div className="arc_form_validation">
            {!validateUserPassword ? (
              "Minimum of 8 characters of uppercase, lowercase, digits and special characters"
            ) : (
              <FontAwesomeIcon icon={faCheckCircle} className="arc_fa_color" />
            )}
          </div>
          <GenericInput
            inputCategory="Confirm Password"
            inputType="password"
            labelName="arc_confirm_password_label"
            onGenericInputChange={onGenericInputChange}
            input={input}
            inputTypeScrape={inputTypeScrape}
            view={view}
          />
          <div className="arc_form_validation">
            {!validateUserPasswordConfirm ? (
              "Matching password"
            ) : (
              <FontAwesomeIcon icon={faCheckCircle} className="arc_fa_color" />
            )}
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
            handleViewTwo={handleViewTwo}
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
      </div>
    </>
  );
}
