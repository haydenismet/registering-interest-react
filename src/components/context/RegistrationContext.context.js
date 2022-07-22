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
    rehoming_fee: null,
    knight_watch: false,
    protection_barrier: false,
    cat: false,
    dog: false,
  });

  const value = {
    registerAccount: registerAccount,
    setRegisterAccount: setRegisterAccount,
  };
  console.log(registerAccount);
  return (
    <RegistrationContext.Provider value={value}>
      {props.children}
    </RegistrationContext.Provider>
  );
}
export { RegistrationProvider, RegistrationContext };
