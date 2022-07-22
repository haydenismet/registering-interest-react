import { useState, useContext } from "react";
import { RegistrationContext } from "../context/RegistrationContext.context";

export default function useFormValidations() {
  const context = useContext(RegistrationContext);

  /****************** USE STATES **************/
  /*Validation useStates for formOne*/
  let [validateUserName, setValidateUserName] = useState(false);
  let [validateUserEmail, setValidateUserEmail] = useState(false);
  let [validateUserEmailConfirm, setValidateUserEmailConfirm] = useState(false);
  let [validateUserPassword, setValidateUserPassword] = useState(false);
  let [validateUserPasswordConfirm, setValidateUserPasswordConfirm] =
    useState(false);
  let [validateUserLocation, setValidateUserLocation] = useState(false);
  let [validateUserDistance, setValidateUserDistance] = useState(false);
  let [validateRehomingFee, setValidateRehomingFee] = useState(false);
  let [validateCatDog, setValidateCatDog] = useState(false);
  let [validateAdoptionFoster, setValidateAdoptionFoster] = useState(false);
  /*********************************/

  /************** FORM VALIDATION ****************/
  /* Validating user input fields on click. These functions are passed to the handleViewTwo function to be ran onClick*/
  function validateUserNameFunction() {
    if (context.registerAccount.name !== null) {
      if (
        context.registerAccount.name !== "" &&
        context.registerAccount.name.length >= 2
      ) {
        setValidateUserName(true);
      } else {
        setValidateUserName(false);
      }
    }
  }

  function validateEmailFunction() {
    const emailRegex = new RegExp(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    if (context.registerAccount.email !== null) {
      if (
        context.registerAccount.email !== "" &&
        emailRegex.test(context.registerAccount.email)
      ) {
        setValidateUserEmail(true);
      } else {
        setValidateUserEmail(false);
      }
    }
  }

  function validateEmailConfirmFunction() {
    if (context.registerAccount.confirm_email !== null) {
      if (
        context.registerAccount.email ===
          context.registerAccount.confirm_email &&
        context.registerAccount.confirm_email !== ""
      ) {
        setValidateUserEmailConfirm(true);
      } else {
        setValidateUserEmailConfirm(false);
      }
    }
  }

  function validateUserPasswordFunction() {
    const passwordRegex = new RegExp(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/
    );
    if (context.registerAccount.password !== null) {
      if (
        context.registerAccount.password !== "" &&
        passwordRegex.test(context.registerAccount.password)
      ) {
        setValidateUserPassword(true);
      } else {
        setValidateUserPassword(false);
      }
    }
  }

  function validateUserPasswordConfirmFunction() {
    if (context.registerAccount.confirm_password !== null) {
      if (
        context.registerAccount.password ===
          context.registerAccount.confirm_password &&
        context.registerAccount.confirm_password !== ""
      ) {
        setValidateUserPasswordConfirm(true);
      } else {
        setValidateUserPasswordConfirm(false);
      }
    }
  }

  function validateUserLocationFunction() {
    if (context.registerAccount.user_location !== null) {
      if (
        context.registerAccount.user_location !== "" &&
        context.registerAccount.user_location !== "Please Select"
      ) {
        setValidateUserLocation(true);
      } else {
        setValidateUserLocation(false);
      }
    }
  }

  function validateUserDistanceFunction() {
    if (context.registerAccount.user_distance !== null) {
      if (
        context.registerAccount.user_distance !== "" &&
        context.registerAccount.user_distance !== "Please Select"
      ) {
        setValidateUserDistance(true);
      } else {
        setValidateUserDistance(false);
      }
    }
  }

  function validateRehomingFeeFunction() {
    if (context.registerAccount.rehoming_fee !== null) {
      if (
        context.registerAccount.rehoming_fee !== "" &&
        context.registerAccount.rehoming_fee !== "Please Select"
      ) {
        setValidateRehomingFee(true);
      } else {
        setValidateRehomingFee(false);
      }
    }
  }

  function validateCatDogFunction() {
    if (
      context.registerAccount.cat !== null &&
      context.registerAccount.dog !== null
    ) {
      if (
        context.registerAccount.cat === false &&
        context.registerAccount.dog === false
      ) {
        setValidateCatDog(false);
      } else {
        setValidateCatDog(true);
      }
    }
  }

  function validateAdoptFosterFunction() {
    if (
      context.registerAccount.knight_watch !== null &&
      context.registerAccount.protection_barrier !== null
    ) {
      if (
        context.registerAccount.knight_watch === false &&
        context.registerAccount.protection_barrier === false
      ) {
        setValidateAdoptionFoster(false);
      } else {
        setValidateAdoptionFoster(true);
      }
    }
  }

  /**************** MASTER VALIDATOR FUNCTION ***************/

  function handleValidations() {
    /* Function to run validating functions above */

    /* run validator functions */
    validateUserNameFunction();
    validateEmailFunction();
    validateEmailConfirmFunction();
    validateUserPasswordFunction();
    validateUserPasswordConfirmFunction();
    validateUserLocationFunction();
    validateUserDistanceFunction();
    validateCatDogFunction();
    validateAdoptFosterFunction();
    validateRehomingFeeFunction();
  }
  /**************************************************/

  return {
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
  };
}
