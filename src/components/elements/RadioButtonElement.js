import React from "react";

export default function RadioButtonElement(props) {
  const {
    radioLabel,
    radioValue,
    radioName,
    radioId,
    radioCopy,
    onGenericInputChange,
    preselectedUser,
  } = props;
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
