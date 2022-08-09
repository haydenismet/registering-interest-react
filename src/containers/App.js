import React, { useEffect, useContext } from "react";
import "../styles/App.css";
/* Component Views */
import TermsAndConditionsView from "../components/login-and-signup/TermsAndConditionsView";
import LoginOrRegisterView from "../components/login-and-signup/LoginOrRegisterView";
import RegistrationOneView from "../components/login-and-signup/RegistrationOneView";
import RegistrationTwoView from "../components/login-and-signup/RegistrationTwoView";
import RegistrationThreeView from "../components/login-and-signup/RegistrationThreeView";
import HomeView from "../components/HomeView";
/* Custom hooks -  Its then destructed so I can acquire the props from the hook function to then use as normal like props */
import useOnGenericInputChange from "../components/custom-hooks/useOnGenericInputChange.hook";
import useHandleClicks from "../components/custom-hooks/useHandleClicks.hook";
import useFormValidations from "../components/custom-hooks/useFormValidations.hook";

// You don't import the parseSessionStorage function as  this is directly called on input elements and will set context.registerAccount to sessionStorage, and subsequently pull from it if required */
/* Context import for registerAccount and the useState set function   Its then set into context var for use, so registerAccount would be context.registerAccount here and anywhere else you use it */
import { RegistrationContext } from "../components/context/RegistrationContext.context";

function App() {
  //Global reg object input
  const context = useContext(RegistrationContext);

  //GenericInput hooks imports
  const { input, inputTypeScrape, onGenericInputChange, settingFormOneValues } =
    useOnGenericInputChange();

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
  console.log(view);
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

  /************************************************/

  /****************** USE EFFECTS ******************/

  /* TO VALIDATE INPUTS */
  useEffect(() => {
    /* To dynamically refresh on registerAccount change and/or if handleViewClickNext function is ran - this will re-run the handleTwoView() to validate inputs and subsequent message displays*/
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
    /* The returnRegistrationStage function is taking the view variable from the useState declared at the top of the doc, and assessing what is within the view variable. If the view variable contains "1", return the loginRegister component, and same for the other cases. This is done through a switch case. In order for the view variable to actually change however, this happens within the NextElement and BackElement.js as view + 1 / - 1 respectively. */
    switch (view) {
      case 1:
        return (
          <LoginOrRegisterView
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
          />
        );

      case 6:
        return <HomeView />;

      default:
        return <div className="whoops"> Whoops. </div>;
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
