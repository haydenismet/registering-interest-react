import { useState, useContext } from "react";
import { RegistrationContext } from "../context/RegistrationContext.context";
export default function useHandleClicks() {
  const context = useContext(RegistrationContext);
  let [view, setView] = useState(1); //SET back to 1 - this is to build homeview
  let [activeDog, setActiveDog] = useState(true);
  let [activeCat, setActiveCat] = useState(true);
  let [activeAdoption, setActiveAdoption] = useState(true);
  let [activeFoster, setActiveFoster] = useState(true);
  function handleViewClickNext() {
    /* handleViewClickNext is a function to say if the (view) is ready (from useState) (we do this so that the states are ready otherwise they might error if function tries to run before react has loaded), to then setView (set the variable called view) to the 1, which according to the switch case will render the first slide (login). We then attach this function to Reacts 'onClick' functionality  for an element. That way, when that element is clicked, we're saying setView the 'view' by 1, therefore corresponding to the next switch case and subsequently the corresponding component.   */
    if (view) {
      setView(view + 1);
    }
    /* emptying pw to db
    if (view === 4) {
      context.setRegisterAccount({
        ...context.registerAccount,
        password: "",
        confirm_password: "",
      });
    }*/
  }

  function handleViewClickBack() {
    /*Same as above, except to go back provided its not past 1 (our start slide)*/
    if (view > 0) {
      setView(view - 1);
    }
    /* emptying pw to db 
    if (view === 4) {
      context.setRegisterAccount({
        ...context.registerAccount,
        password: "",
        confirm_password: "",
      });
    }*/
  }

  function handleClickToggleDog() {
    setActiveDog(!activeDog);
    context.setRegisterAccount({ ...context.registerAccount, dog: activeDog });
  }

  function handleClickToggleCat() {
    setActiveCat(!activeCat);
    context.setRegisterAccount({ ...context.registerAccount, cat: activeCat });
  }

  function handleClickToggleAdoption() {
    setActiveAdoption(!activeAdoption);
    context.setRegisterAccount({
      ...context.registerAccount,
      adoption: activeAdoption,
    });
  }

  function handleClickToggleFoster() {
    setActiveFoster(!activeFoster);
    context.setRegisterAccount({
      ...context.registerAccount,
      foster: activeFoster,
    });
  }

  return {
    view,
    setView,
    handleViewClickBack,
    handleViewClickNext,
    handleClickToggleDog,
    activeDog,
    activeCat,
    handleClickToggleCat,
    handleClickToggleAdoption,
    handleClickToggleFoster,
    activeAdoption,
    activeFoster,
  };
}
