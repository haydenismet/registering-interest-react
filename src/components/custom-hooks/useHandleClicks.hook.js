import { useState, useContext } from "react";
import { RegistrationContext } from "../context/RegistrationContext.context";
export default function useHandleClicks() {
  const context = useContext(RegistrationContext);
  let [view, setView] = useState(1);
  let [activeDog, setActiveDog] = useState(true);
  let [activeCat, setActiveCat] = useState(true);
  let [activeKnightWatch, setActiveKnightWatch] = useState(true);
  let [activeProtectionBarrier, setActiveProtectionBarrier] = useState(true);
  function handleViewClickNext() {
    if (view) {
      setView(view + 1);
    }
  }

  function handleViewClickBack() {
    if (view > 0) {
      setView(view - 1);
    }
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
    setActiveKnightWatch(!activeKnightWatch);
    context.setRegisterAccount({
      ...context.registerAccount,
      knight_watch: activeKnightWatch,
    });
  }

  function handleClickToggleFoster() {
    setActiveProtectionBarrier(!activeProtectionBarrier);
    context.setRegisterAccount({
      ...context.registerAccount,
      protection_barrier: activeProtectionBarrier,
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
    activeKnightWatch,
    activeProtectionBarrier,
  };
}
