import { useState, useContext } from "react";
import { RegistrationContext } from "../context/RegistrationContext.context";

export default function useOnGenericInputChange() {
  const context = useContext(RegistrationContext);
  /* scraping user input*/
  let [input, setInput] = useState("");
  /* scraping input category, i.e name, to determine where to set `input` to key/value pair in context obj */
  let [inputTypeScrape, setInputType] = useState("");
  let [userEmail, setUserEmail] = useState("");
  let [userPassword, setUserPassword] = useState("");

  function onGenericInputChange(e) {
    /* Whenever there is an onChange event (keypress), to setInput to 'input', setInputType gets the ID so we can determine what field it is, i.e the name field, passed into inputTypeScrape*/
    setInput(e.target.value);
    setInputType(e.target.id);
  }

  function settingFormOneValues() {
    /* I've set up a switch state within a function that is triggered via a useEffect whenever the `input` or `inputTypeScrape` variables are changed, which are changed by the onGenericInputChange function above by useStates. Without the useEffect it doesnt save the last inputted keystroke from the onChange into the form object that gets made from the switch function. So when we know what the label is, we can then save that 'input' into the appropriate key/value pair.  */
    switch (inputTypeScrape) {
      case "arc_user_id":
        return context.setRegisterAccount({
          ...context.registerAccount,
          user_type: input,
        });
      case "arc_org_id":
        return context.setRegisterAccount({
          ...context.registerAccount,
          user_type: input,
        });
      case "arc_name_label":
        return context.setRegisterAccount({
          ...context.registerAccount,
          name: input,
        });
      case "arc_email_label":
        return context.setRegisterAccount({
          ...context.registerAccount,
          email: input,
        });
      case "arc_confirm_email_label":
        return context.setRegisterAccount({
          ...context.registerAccount,
          confirm_email: input,
        });
      case "arc_password_label":
        return context.setRegisterAccount({
          ...context.registerAccount,
          password: input,
        });
      case "arc_confirm_password_label":
        return context.setRegisterAccount({
          ...context.registerAccount,
          confirm_password: input,
        });
      case "arc_location_label":
        return context.setRegisterAccount({
          ...context.registerAccount,
          user_location: input,
        });
      case "arc_rehoming_label":
        return context.setRegisterAccount({
          ...context.registerAccount,
          user_distance: input,
        });
      case "arc_fee_label":
        return context.setRegisterAccount({
          ...context.registerAccount,
          user_tier: input,
        });
      case "arc_reg_charity":
        return context.setRegisterAccount({
          ...context.registerAccount,
          registered_charity: input,
        });
      case "arc_charity_no_label":
        return context.setRegisterAccount({
          ...context.registerAccount,
          charity_no: input,
        });
      case "arc_email_login_label":
        return setUserEmail(input);
      case "arc_password_login_label":
        return setUserPassword(input);
      default:
        return null;
    }
  }

  return {
    input,
    inputTypeScrape,
    onGenericInputChange,
    settingFormOneValues,
    userEmail,
    userPassword,
  };
}
