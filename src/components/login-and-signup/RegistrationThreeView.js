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
      value: "London",
    },
    {
      value: "North East",
    },
    {
      value: "North West",
    },
    {
      value: "Yorkshire",
    },
    {
      value: "East Midlands",
    },
    {
      value: "West Midlands",
    },
    {
      value: "South East",
    },
    {
      value: "South West",
    },
    {
      value: "East of England",
    },
    {
      value: "Wales",
    },
    {
      value: "Scotland",
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
                context.registerAccount.user_type === "Personal"
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
                context.registerAccount.user_type === "Personal"
                  ? "What distance perimeter should Knight Cat safeguard your home?"
                  : "What distance perimeter should Knight Cat safeguard your business property?"
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

            <>
              {context.registerAccount.user_type === "Commercial" ? (
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
                context.registerAccount.user_type === "Personal"
                  ? "What cover options would you like for your home?"
                  : "What cover options would you like for your commercial property?"
              }
              handleClickToggle={handleClickToggleAdoption}
              active={activeAdoption}
              idAndName="Knight Watch"
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

            {context.registerAccount.user_type === "Commercial" ? (
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
                context.registerAccount.user_type === "Personal"
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
              context.registerAccount.user_type === "Personal"
                ? validateUserLocation &&
                  validateUserDistance &&
                  validateAdoptionFoster &&
                  validateCatDog
                  ? false
                  : true
                : context.registerAccount.user_type === "Commercial"
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
