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
    handleClickToggleDefenseMode,
    defenseMode,
    handleClickToggleAttackMode,
    attackMode,
    validateAttackDefense,
    handleClickToggleKnightWatch,
    handleClickToggleProtectionBarrier,
    activeKnightWatch,
    activeProtectionBarrier,
    validateWatchBarrier,
    validateUserTier,
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
                handleClickToggle={handleClickToggleKnightWatch}
                active={activeKnightWatch}
                idAndName="Patrol"
              />
              <ButtonToggleElement
                handleClickToggle={handleClickToggleProtectionBarrier}
                active={activeProtectionBarrier}
                idAndName="Sentry"
              />
              {!validateWatchBarrier ? (
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
              {context.registerAccount.user_tier !== null ? (
                !validateUserTier ? (
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
                handleClickToggle={handleClickToggleAttackMode}
                active={attackMode}
                idAndName="Attacc"
              />
              <ButtonToggleElement
                handleClickToggle={handleClickToggleDefenseMode}
                active={defenseMode}
                idAndName="Protecc"
              />
              {!validateAttackDefense ? (
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
              validateUserTier &&
              validateWatchBarrier &&
              validateAttackDefense
                ? false
                : true
            }
          />
        </div>
      </div>
    </>
  );
}
