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
    activeKnightWatch,
    activeProtectionBarrier,
    validateAdoptionFoster,
    validateRehomingFee,
    handleViewClickBack,
    handleViewClickNext,
    locationOptions,
    distanceOptions,
    tierValue,
    restorePropsValues,
  } = props;

  const context = useContext(RegistrationContext);
  return (
    <>
      <RegistrationLoginHeaderElement />
      <div className="arc_container_reg">
        <ProgressBarElement stage="3" />
        <div className="arc_content_container">
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
              restorePropsValues={restorePropsValues}
            />
            <div className="arc_form_validation">
              {context.registerAccount.user_location !== null ? (
                !validateUserLocation ? (
                  "Location required"
                ) : (
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className="arc_fa_color"
                  />
                )
              ) : null}
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
              restorePropsValues={restorePropsValues}
            />
            <div className="arc_form_validation">
              {context.registerAccount.user_distance !== null ? (
                !validateUserDistance ? (
                  "Distance required"
                ) : (
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className="arc_fa_color"
                  />
                )
              ) : null}
            </div>
            <div className="arc_choice_container">
              <ButtonToggleElement
                buttonQuestion={
                  context.registerAccount.user_type === "Personal"
                    ? "What cover options would you like for your home?"
                    : "What cover options would you like for your commercial property?"
                }
                handleClickToggle={handleClickToggleAdoption}
                active={activeKnightWatch}
                idAndName="Patrol"
              />
              <ButtonToggleElement
                handleClickToggle={handleClickToggleFoster}
                active={activeProtectionBarrier}
                idAndName="Sentry"
              />
              {!validateAdoptionFoster ? (
                <div className="arc_form_validation">Select atleast one</div>
              ) : (
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className="arc_fa_color"
                />
              )}
            </div>

            <>
              <GenericInput
                inputCategory={
                  context.registerAccount.user_type === "Personal"
                    ? "What tier are you interested in for your home?"
                    : "What tier are you interested in for your commercial property?"
                }
                labelName="arc_fee_label"
                optionValue={tierValue}
                onGenericInputChange={onGenericInputChange}
                input={input}
                inputTypeScrape={inputTypeScrape}
                restorePropsValues={restorePropsValues}
              />
              {context.registerAccount.rehoming_fee !== null ? (
                !validateRehomingFee ? (
                  <div className="arc_form_validation">Select atleast one</div>
                ) : (
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className="arc_fa_color"
                  />
                )
              ) : null}
            </>
            <div className="arc_choice_container">
              <ButtonToggleElement
                buttonQuestion={
                  context.registerAccount.user_type === "Personal"
                    ? "What is more important for your house protection?"
                    : "What is more important for your commercial property?"
                }
                handleClickToggle={handleClickToggleDog}
                active={activeDog}
                idAndName="Attacc"
              />
              <ButtonToggleElement
                handleClickToggle={handleClickToggleCat}
                active={activeCat}
                idAndName="Protecc"
              />
              {!validateCatDog ? (
                <div className="arc_form_validation">Select atleast one</div>
              ) : (
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className="arc_fa_color"
                />
              )}
            </div>
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
              validateUserLocation &&
              validateUserDistance &&
              validateAdoptionFoster &&
              validateCatDog
                ? false
                : true
            }
          />
        </div>
      </div>
    </>
  );
}