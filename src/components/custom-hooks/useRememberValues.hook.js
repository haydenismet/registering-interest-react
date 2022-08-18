import { useContext } from "react";
import { RegistrationContext } from "../context/RegistrationContext.context";

export default function useRememberValues(props) {
  const context = useContext(RegistrationContext);

  /* This function is attached to the defaultValue in GenericInput and defaultChecked in RadioButton and simply loops through the global context.registerAccount and returns the value of the key as the default value, to persist going between pages */
  function restorePropsValues(param) {
    if (context.registerAccount) {
      for (const [key, value] of Object.entries(context.registerAccount)) {
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

  return {
    restorePropsValues,
    preselectedUser,
  };
}
