import React from "react";
import useOnGenericInputChange from "../custom-hooks/useOnGenericInputChange.hook";

export default function RadioButtonElement(props) {
  const {
    radioLabel,
    radioValue,
    radioName,
    radioId,
    radioCopy,
    onGenericInputChange,
  } = props;
  const { preselectedUser } = useOnGenericInputChange();
  return (
    <>
      <input
        id={radioId}
        type="radio"
        value={radioValue}
        name={radioName}
        onClick={onGenericInputChange}
        className="arc_checkbox_element"
        label={radioLabel}
        defaultChecked={preselectedUser(radioValue)}
      />
      <label htmlFor={radioLabel}>{radioCopy}</label>
    </>
  );
}
