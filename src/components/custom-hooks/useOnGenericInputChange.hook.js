import { useState, useContext } from "react";
import { RegistrationContext } from "../context/RegistrationContext.context";

export default function useOnGenericInputChange(props) {
  const context = useContext(RegistrationContext);
  /* useState for scraping input*/
  let [input, setInput] = useState("");
  /* useState for scraping input category, i.e name, to determine where to set `input` from the useState above into in the registerAccount object, i.e registerAccount.name (context obj) */
  let [inputTypeScrape, setInputType] = useState("");

  // for login details
  let [userEmail, setUserEmail] = useState("");
  let [userPassword, setUserPassword] = useState("");

  function onGenericInputChange(e) {
    /* Set up is another useState to track the changes to the genericInput field. so onGenericInputChange func below is passed to props and subsequently the GenericInput props field within it. Inside genericInput, its applied to the actual <input> onCHange event, so we will scrape and set the typed value into the useState 'input' onChange of input from user. This function & input is passed down via props. We also add another useState to scrape and set the inputType so we can determine if it's an email, to run x checks, if name, run y checks. Whenever there is an onChange event (keypress), to setInput to 'input', setInputType gets the ID so we can determine what field it is, i.e the name field, passed into inputTypeScrape*/
    setInput(e.target.value);
    setInputType(e.target.id);
  }

  function settingFormOneValues() {
    /* I've set up a switch state within a function that is triggered via a useEffect whenever the `input` or `inputTypeScrape` variables are changed, which are changed by the onGenericInputChange function above by useStates. Without the useEffect it doesnt save the last inputted keystroke from the onChange into the form object that gets made from the swtich function. So when we know what the label is, we can then save that 'input' into the appropriate key/value pair.  */
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
          rehoming_fee: input,
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

  /* You've tidied the hell out of this now, so this function is attached to the defaultValue in GenericInput and defaultChecked in RadioButton and simply loops through the global context.registerAccount and returns the value of the key as the default value, to persist going between pages */
  function restorePropsValues(param) {
    const regTwoInputStore = context.registerAccount;
    const { password, confirm_password, ...regTwoInputNoPasswords } =
      regTwoInputStore;
    if (context.registerAccount) {
      for (const [key, value] of Object.entries(context.registerAccount)) {
        /*  if (
          key === "user_type" &&
          param === "arc_org_id" &&
          param !== "arc_user_id"
        ) {
          return value;
        }
        if (
          key === "user_type" &&
          param === "arc_user_id" &&
          param !== "arc_org_id"
        ) {
          return value;
        } */

        if (key === "name" && param === "arc_name_label") {
          return value;
        }

        if (key === "email" && param === "arc_email_label") {
          return value;
        }

        if (key === "confirm_email" && param === "arc_confirm_email_label") {
          return value;
        }

        if (key === "password" && param === "arc_password_label") {
          return value;
        }
        if (
          key === "confirm_password" &&
          param === "arc_confirm_password_label"
        ) {
          return value;
        }

        if (key === "user_location" && param === "arc_location_label") {
          return value;
        }

        if (key === "rehoming_fee" && param === "arc_fee_label") {
          return value;
        }

        if (key === "user_distance" && param === "arc_rehoming_label") {
          return value;
        }

        if (key === "charity_no" && param === "arc_charity_no_label") {
          return value;
        }
      }
    }
  }

  // for radio buttons only as need to set by boolean as opposed to value in the key/value loop above. Can see if you can sync them together but may be cleaner/clearer this way.
  function preselectedUser(param) {
    if (context.registerAccount.user_type) {
      if (
        context.registerAccount.user_type === "Commercial" &&
        param === "Commercial"
      ) {
        return true;
      } else if (
        context.registerAccount.user_type === "Personal" &&
        param === "Personal"
      ) {
        return true;
      }
    }
  }

  // POST TO DB FOR PW AND USER DETAILS ON CLICK? arc_charity_no_label

  /* returned variables that I can then use as props once the function is imported */
  return {
    input,
    inputTypeScrape,
    onGenericInputChange,
    settingFormOneValues,
    restorePropsValues,
    preselectedUser,
    userEmail,
    userPassword,
  };
}
