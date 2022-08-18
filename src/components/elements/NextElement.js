import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

export default function NextElement(props) {
  let [info, setInfo] = useState(false);

  const { handleViewClickNext, view, isDisabled, nextCopy } = props;

  return (
    <>
      <button
        className="arc_next_element"
        onClick={handleViewClickNext}
        data-stage={view}
        disabled={
          isDisabled ? isDisabled : null
        } /* if isDisabled true, set true, therefore enabling disabled. If not, return null, which will remove entirely the attribute.  */
      >
        {nextCopy}
      </button>
      {/* If isDisabled is true, show the question icon, with a useState to toggle modal */}
      {isDisabled && view === 3 ? (
        <span className="arc_info" onClick={() => setInfo(true)}>
          <FontAwesomeIcon icon={faQuestionCircle} />
        </span>
      ) : null}
      {info ? (
        <div className="arc_info_popup">
          <p>Please select a property type.</p>
          <button onClick={() => setInfo(false)}>x</button>
        </div>
      ) : null}
    </>
  );
}
