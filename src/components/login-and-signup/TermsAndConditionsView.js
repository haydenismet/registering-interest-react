import React from "react";
import RegistrationLoginHeaderElement from "../elements/RegistrationLoginHeaderElement.js";

import NextElement from "../elements/NextElement.js";
import BackElement from "../elements/BackElement.js";
export default function TermsAndConditionsView(props) {
  const { handleViewClickNext, handleViewClickBack, view } = props;
  return (
    <>
      <RegistrationLoginHeaderElement />
      <div className="arc_content_container">
        <div className="arc_content">.arc_content</div>
      </div>
      <div className="arc_button_container">
        <BackElement
          backCopy="Back"
          handleViewClickBack={handleViewClickBack}
        />
        <NextElement
          nextCopy="Agree"
          handleViewClickNext={handleViewClickNext}
          view={view}
        />
      </div>
    </>
  );
}
