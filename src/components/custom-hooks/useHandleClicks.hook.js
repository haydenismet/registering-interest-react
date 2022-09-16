import { useState, useContext } from "react";
import { RegistrationContext } from "../context/RegistrationContext.context";
export default function useHandleClicks() {
  const context = useContext(RegistrationContext);
  let [view, setView] = useState(1);
  let [defenseMode, setDefenseMode] = useState(true);
  let [attackMode, setAttackMode] = useState(true);
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

  function handleClickToggleDefenseMode() {
    setDefenseMode(!defenseMode);
    context.setRegisterAccount({
      ...context.registerAccount,
      defense_mode: defenseMode,
    });
  }

  function handleClickToggleCat() {
    setAttackMode(!attackMode);
    context.setRegisterAccount({
      ...context.registerAccount,
      attack_mode: attackMode,
    });
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
    handleClickToggleDefenseMode,
    defenseMode,
    attackMode,
    handleClickToggleCat,
    handleClickToggleAdoption,
    handleClickToggleFoster,
    activeKnightWatch,
    activeProtectionBarrier,
  };
}
