import React, { useEffect, useContext } from "react";
import "../styles/App.css";
/* Component Views */
import TermsAndConditionsView from "../components/pages/TermsAndConditionsView";
import StartRegistration from "../components/pages/StartRegistration";
import RegistrationOneView from "../components/pages/RegistrationOneView";
import RegistrationTwoView from "../components/pages/RegistrationTwoView";
import RegistrationThreeView from "../components/pages/RegistrationThreeView";
import CompleteRegistration from "../components/pages/CompleteRegistration";
/* Custom hooks -  Its then destructed so I can acquire the props from the hook function to then use as normal like props */
import useInputChanges from "../components/custom-hooks/useInputChanges.hook";
import useHandleClicks from "../components/custom-hooks/useHandleClicks.hook";
import useFormValidations from "../components/custom-hooks/useFormValidations.hook";
import useRememberValues from "../components/custom-hooks/useRememberValues.hook";
import RegistrationThreeValues from "../components/elements/RegistrationThreeValues";
/* Registration Context */
import { RegistrationContext } from "../components/context/RegistrationContext.context";

function App() {
  //Global Registration Object
  const context = useContext(RegistrationContext);

  //GenericInput customHook imports
  const { input, inputTypeScrape, onGenericInputChange, settingFormOneValues } =
    useInputChanges();

  //HandleClicks customHook imports
  const {
    view,
    handleViewClickBack,
    handleViewClickNext,
    handleClickToggleDog,
    handleClickToggleCat,
    handleClickToggleAdoption,
    handleClickToggleFoster,
    activeDog,
    activeCat,
    activeKnightWatch,
    activeProtectionBarrier,
  } = useHandleClicks();

  // handleValidations custom hook imports
  const {
    handleValidations,
    validateUserName,
    validateUserEmail,
    validateUserEmailConfirm,
    validateUserPassword,
    validateUserPasswordConfirm,
    validateUserLocation,
    validateUserDistance,
    validateCatDog,
    validateAdoptionFoster,
    validateRehomingFee,
  } = useFormValidations();

  const { restorePropsValues, preselectedUser } = useRememberValues();

  const { locationOptions, distanceOptions, tierValue } =
    RegistrationThreeValues();
  /************************************************/

  /****************** USE EFFECTS ******************/

  /* TO VALIDATE INPUTS */
  useEffect(() => {
    /* To dynamically refresh on registerAccount value change and/or if handleViewClickNext function is ran - this will re-render to validate inputs and subsequent message displays*/
    handleValidations();
  }, [context.registerAccount, handleViewClickNext, handleViewClickBack]);

  /* TO SET FORM VALUES INTO GLOBAL CONTEXT OBJ */
  useEffect(() => {
    /* useEffect to run settingFormOneValues func whenever input and inputTypeScrape changes, to determine which input belongs to which inputTypeScrape(category) to be set into the object. i.e inputTypeScrape = "name", set value into obj.name from input (this is for context.registerAccount) */
    settingFormOneValues();
  }, [input, inputTypeScrape]);

  /***********************************************/
  function returnRegistrationStage(view) {
    /* Switch case to update the useState, so when a button is clicked, the appropriate useState is set to render the required view  */
    switch (view) {
      case 1:
        return (
          <StartRegistration
            handleViewClickNext={handleViewClickNext}
            view={view}
          />
        );
      case 2:
        return (
          <TermsAndConditionsView
            handleViewClickNext={handleViewClickNext}
            handleViewClickBack={handleViewClickBack}
            view={view}
          />
        );
      case 3:
        return (
          <RegistrationOneView
            handleViewClickNext={handleViewClickNext}
            handleViewClickBack={handleViewClickBack}
            onGenericInputChange={onGenericInputChange}
            input={input}
            view={view}
            inputTypeScrape={inputTypeScrape}
            preselectedUser={preselectedUser}
          />
        );
      case 4:
        return (
          <RegistrationTwoView
            handleViewClickNext={handleViewClickNext}
            handleViewClickBack={handleViewClickBack}
            onGenericInputChange={onGenericInputChange}
            handleValidations={handleValidations}
            input={input}
            view={view}
            validateUserName={validateUserName}
            validateUserEmail={validateUserEmail}
            validateUserEmailConfirm={validateUserEmailConfirm}
            validateUserPassword={validateUserPassword}
            validateUserPasswordConfirm={validateUserPasswordConfirm}
            inputTypeScrape={inputTypeScrape}
            restorePropsValues={restorePropsValues}
          />
        );
      case 5:
        return (
          <RegistrationThreeView
            handleViewClickNext={handleViewClickNext}
            handleViewClickBack={handleViewClickBack}
            onGenericInputChange={onGenericInputChange}
            handleClickToggleDog={handleClickToggleDog}
            handleClickToggleCat={handleClickToggleCat}
            handleClickToggleAdoption={handleClickToggleAdoption}
            handleClickToggleFoster={handleClickToggleFoster}
            activeDog={activeDog}
            input={input}
            view={view}
            inputTypeScrape={inputTypeScrape}
            validateUserLocation={validateUserLocation}
            validateUserDistance={validateUserDistance}
            activeCat={activeCat}
            validateCatDog={validateCatDog}
            activeKnightWatch={activeKnightWatch}
            activeProtectionBarrier={activeProtectionBarrier}
            validateAdoptionFoster={validateAdoptionFoster}
            validateRehomingFee={validateRehomingFee}
            locationOptions={locationOptions}
            distanceOptions={distanceOptions}
            tierValue={tierValue}
            restorePropsValues={restorePropsValues}
          />
        );

      case 6:
        return <CompleteRegistration />;

      default:
        return <div className="whoops"> Darn it, something went wrong. </div>;
    }
  }

  return (
    <>
      <div id="arc_outer">
        <div className="arc_container">{returnRegistrationStage(view)}</div>
      </div>
    </>
  );
}

export default App;
