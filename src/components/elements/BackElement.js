import React from "react";

export default function BackElement(props) {
  const { handleViewClickBack, view, backCopy } = props;
  return (
    <>
      <button
        className="arc_back_element"
        onClick={handleViewClickBack}
        data-stage={view}
      >
        {backCopy}
      </button>
    </>
  );
}
