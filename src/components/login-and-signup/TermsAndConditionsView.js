import React from "react";
import RegistrationLoginHeaderElement from "../elements/RegistrationLoginHeaderElement.js";
import TermsAndConditionsElement from "../elements/TermsAndConditionsElement.js";

import NextElement from "../elements/NextElement.js";
import BackElement from "../elements/BackElement.js";
export default function TermsAndConditionsView(props) {
  const { handleViewClickNext, handleViewClickBack, view } = props;
  return (
    <>
      <RegistrationLoginHeaderElement />

      <div className="arc_t_c_intro">1 2 3</div>

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
