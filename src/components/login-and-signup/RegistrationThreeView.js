import React, { useContext } from "react";
import NextElement from "../elements/NextElement.js";
import RegistrationLoginHeaderElement from "../elements/RegistrationLoginHeaderElement.js";
import ProgressBarElement from "../elements/ProgressBarElement.js";
import GenericInput from "../elements/GenericInput.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import BackElement from "../elements/BackElement.js";
import ButtonToggleElement from "../elements/ButtonToggleElement.js";
import { RegistrationContext } from "../context/RegistrationContext.context";
import HomeView from "../HomeView.js";
export default function RegistrationThreeView(props) {
  const {
    view,
    input,
    inputTypeScrape,
    onGenericInputChange,
    validateUserLocation,
    validateUserDistance,
    handleClickToggleDog,
    activeDog,
    handleClickToggleCat,
    activeCat,
    validateCatDog,
    handleClickToggleAdoption,
    handleClickToggleFoster,
    activeAdoption,
    activeFoster,
    validateAdoptionFoster,
    validateRehomingFee,
    handleViewClickBack,
    handleViewClickNext,
  } = props;

  const locationOptions = [
    { value: "Please Select" },
    {
      value: "West Midlands",
    },
    {
      value: "Birmingham",
    },
    {
      value: "Halesowen",
    },
    {
      value: "Quinton",
    },
    {
      value: "Selly Oak",
    },
    {
      value: "Edgbaston",
    },
    {
      value: "Moseley",
    },
    {
      value: "Kings Heath",
    },
    {
      value: "Northfield",
    },
    {
      value: "Frankley",
    },
    {
      value: "Shirley",
    },
    {
      value: "Sheldon",
    },
    {
      value: "Small Heath",
    },
  ];

  const distanceOptions = [
    { value: "Please Select" },
    {
      value: "0.5 Miles",
    },
    {
      value: "1 Miles",
    },
    {
      value: "2 Miles",
    },
    {
      value: "3 Miles",
    },
    {
      value: "4 Miles",
    },
    {
      value: "5 Miles",
    },
    {
      value: "6 Miles",
    },
    {
      value: "7 Miles",
    },
    {
      value: "8 Miles",
    },
    {
      value: "9 Miles",
    },
    {
      value: "10 Miles",
    },
    {
      value: "15 Miles",
    },
    {
      value: "20+ Miles",
    },
  ];

  const rehomingFee = [
    { value: "Please Select" },
    {
      value: "£0",
    },
    {
      value: "£10",
    },
    {
      value: "£20",
    },
    {
      value: "£30",
    },
    {
      value: "£40",
    },
    {
      value: "£50",
    },
    {
      value: "£75",
    },
    {
      value: "£100",
    },
    {
      value: "£150",
    },
    {
      value: "£200",
    },
    {
      value: "£250",
    },
    {
      value: "£300",
    },
    {
      value: "£350",
    },
    {
      value: "£400+",
    },
  ];

  const context = useContext(RegistrationContext);
  return (
    <>
      <RegistrationLoginHeaderElement />
      <div className="arc_container_reg">
        <ProgressBarElement stage="3" />
        <div className="arc_registration_three_container">
          <div className="arc_registration_three_heading">Thanks! </div>
          <div className="arc_registration_three_subheading">
            Last few questions before paws galore!
          </div>
          <div className="arc_registration_three_input_container">
            <GenericInput
              inputCategory={
                context.registerAccount.user_type === "user"
                  ? "Where are you based?"
                  : "Where is your organisation based?"
              }
              labelName="arc_location_label"
              optionValue={locationOptions}
              onGenericInputChange={onGenericInputChange}
              input={input}
              inputTypeScrape={inputTypeScrape}
            />
            <div className="arc_form_validation">
              {!validateUserLocation ? (
                "Location required"
              ) : (
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className="arc_fa_color"
                />
              )}
            </div>
            <GenericInput
              inputCategory={
                context.registerAccount.user_type === "user"
                  ? "Distance from your chosen location"
                  : "What distance do you allow potential adoptees/fosterer's?"
              }
              labelName="arc_rehoming_label"
              optionValue={distanceOptions}
              onGenericInputChange={onGenericInputChange}
              input={input}
              inputTypeScrape={inputTypeScrape}
            />
            <div className="arc_form_validation">
              {!validateUserDistance ? (
                "Distance required"
              ) : (
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className="arc_fa_color"
                />
              )}
            </div>
            <GenericInput
              inputCategory="Optional : Upload a profile picture"
              inputType="file"
              labelName="arc_image_label"
            />
            <>
              {context.registerAccount.user_type === "org" ? (
                <GenericInput
                  inputCategory="Optional : Are you a UK charity registered organisation? "
                  inputType="text"
                  labelName="arc_charity_no_label"
                  placeholderText="e.g 1234567"
                  onGenericInputChange={onGenericInputChange}
                ></GenericInput>
              ) : null}
            </>

            <ButtonToggleElement
              buttonQuestion={
                context.registerAccount.user_type === "user"
                  ? "What services are you interested in"
                  : "What services do you offer"
              }
              handleClickToggle={handleClickToggleAdoption}
              active={activeAdoption}
              idAndName="adoption"
            />
            <ButtonToggleElement
              handleClickToggle={handleClickToggleFoster}
              active={activeFoster}
              idAndName="fostering"
            />
            {!validateAdoptionFoster ? (
              <div className="arc_form_validation">Select atleast one</div>
            ) : (
              <FontAwesomeIcon icon={faCheckCircle} className="arc_fa_color" />
            )}

            {context.registerAccount.user_type === "org" ? (
              <>
                <GenericInput
                  inputCategory="Do you charge a rehoming fee?"
                  labelName="arc_fee_label"
                  optionValue={rehomingFee}
                  onGenericInputChange={onGenericInputChange}
                  input={input}
                  inputTypeScrape={inputTypeScrape}
                />

                {!validateRehomingFee ? (
                  <div className="arc_form_validation">Select atleast one</div>
                ) : (
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className="arc_fa_color"
                  />
                )}
              </>
            ) : null}

            <ButtonToggleElement
              buttonQuestion={
                context.registerAccount.user_type === "user"
                  ? "Animals I'm interested in"
                  : "Animals in your care"
              }
              handleClickToggle={handleClickToggleDog}
              active={activeDog}
              idAndName="dogs"
            />
            <ButtonToggleElement
              handleClickToggle={handleClickToggleCat}
              active={activeCat}
              idAndName="cats"
            />
            {!validateCatDog ? (
              <div className="arc_form_validation">Select atleast one</div>
            ) : (
              <FontAwesomeIcon icon={faCheckCircle} className="arc_fa_color" />
            )}
          </div>
        </div>
        <div className="arc_button_container_on">
          <BackElement
            backCopy="back"
            handleViewClickBack={handleViewClickBack}
            view={view}
          />
          <NextElement
            nextCopy="Register"
            handleViewClickNext={handleViewClickNext}
            view={view}
            isDisabled={
              context.registerAccount.user_type === "user"
                ? validateUserLocation &&
                  validateUserDistance &&
                  validateAdoptionFoster &&
                  validateCatDog
                  ? false
                  : true
                : context.registerAccount.user_type === "org"
                ? validateCatDog &&
                  validateAdoptionFoster &&
                  validateRehomingFee
                  ? false
                  : true
                : null
            }
          />
        </div>
      </div>
    </>
  );
}
