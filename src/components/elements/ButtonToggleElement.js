import React from "react";
export default function ButtonElement(props) {
  const { handleClickToggle,active,idAndName,buttonQuestion } = props;

  /*ProgressBarElement takes props of the stage number. As there are 4 stages for registering, there are only 3 stages that require actual user input, and on these 3 stages there is a progress bar at the top. The progress bar takes a props for props.stage. Inputting 1, 2 or 3 will then append to the className for arc_reg_stage_1/2/3 which adjusts the length of the progress bars green fill - indiciating how near completion the user is on steps. */
  return( 
    <>
  {buttonQuestion ? <div className="arc_checkbox_question"> {buttonQuestion} </div> : null }
  <button id={idAndName} onClick={handleClickToggle} className={!active ? "arc_animal_selected_reg_3" : null}> {idAndName} </button>
  </>
  )
}
