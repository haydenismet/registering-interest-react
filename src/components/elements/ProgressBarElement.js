/*ELEMENTS FOLDER - Generic elements that can be reusable for various parts of the app */
import React from "react";
export default function ProgressBarElement(props) {
  const { stage } = props;
  /*ProgressBarElement takes props of the stage number. As there are 4 stages for registering, there are only 3 stages that require actual user input, and on these 3 stages there is a progress bar at the top. The progress bar takes a props for props.stage. Inputting 1, 2 or 3 will then append to the className for arc_reg_stage_1/2/3 which adjusts the length of the progress bars green fill - indiciating how near completion the user is on steps. */
  return <div className={`arc_reg_stage_${stage}`}></div>;
}
