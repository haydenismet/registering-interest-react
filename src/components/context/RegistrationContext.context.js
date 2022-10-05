import { useState, createContext } from "react";

/*Context for registerAccount*/
const RegistrationContext = createContext();

function RegistrationProvider(props) {
  /* Empty Object useState for use within the switch statement below, to then add the appropriate values into key/value pairs of empty object based on inputTypeScrape useState*/
  let [registerAccount, setRegisterAccount] = useState({
    user_type: null,
    name: null,
    email: null,
    confirm_email: null,
    password: null,
    confirm_password: null,
    user_location: null,
    user_distance: null,
    user_tier: null,
    knight_watch: false,
    protection_barrier: false,
    attack_mode: false,
    defense_mode: false,
  });

  const value = {
    registerAccount: registerAccount,
    setRegisterAccount: setRegisterAccount,
  };
  //console.log(registerAccount);
  return (
    <RegistrationContext.Provider value={value}>
      {props.children}
    </RegistrationContext.Provider>
  );
}
export { RegistrationProvider, RegistrationContext };
