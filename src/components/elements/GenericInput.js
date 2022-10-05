import React from "react";

export default function GenericInput(props) {
  const {
    labelName,
    inputCategory,
    inputType,
    children,
    placeholderText,
    onGenericInputChange,
    optionValue,
    view,
    restorePropsValues,
  } = props;

  return (
    <>
      <div className="arc_generic_input_container">
        <label htmlFor={`${labelName}`} className="arc_generic_label">
          {inputCategory}
        </label>
        {children}
        {inputCategory && inputType ? (
          <input
            type={`${inputType}`}
            className={`arc_generic_input ${inputCategory}`}
            id={`${labelName}`}
            placeholder={placeholderText ? placeholderText : null}
            onChange={onGenericInputChange}
            defaultValue={view !== 1 ? restorePropsValues(labelName) : null}
          />
        ) : optionValue ? (
          <>
            <select
              id={labelName}
              className="arc_option_select"
              data-testid={labelName}
              onChange={onGenericInputChange}
              defaultValue={restorePropsValues(labelName)}
            >
              {optionValue.map((locationOption, index) => {
                return (
                  <option key={index} value={locationOption.value}>
                    {locationOption.value}
                  </option>
                );
              })}
            </select>
          </>
        ) : null}
      </div>
    </>
  );
}
