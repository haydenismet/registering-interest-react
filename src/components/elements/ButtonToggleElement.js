import React from "react";
export default function ButtonElement(props) {
  const { handleClickToggle, active, idAndName, buttonQuestion } = props;

  return (
    <>
      {buttonQuestion ? (
        <div className="arc_checkbox_question"> {buttonQuestion} </div>
      ) : null}
      <button
        id={idAndName}
        onClick={handleClickToggle}
        className={!active ? "arc_animal_selected_reg_3" : null}
      >
        {idAndName}
      </button>
    </>
  );
}
