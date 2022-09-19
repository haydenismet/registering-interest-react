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
        <div className="arc_content">
          <h3 className="arc_t_c_h4">Disclaimer.</h3>
          <p className="arc_t_c_p">
            <b>Knight Cat</b> is not a toy. Although based on a feline friend,
            this cat is incredibly dangerous and has teefies. He will protecc,
            he will attac, but most importantly, he will need a snacc.
          </p>
          <p className="arc_t_c_p">
            Without snacc, <b>Knight Cat</b> will lose all memory and therefore
            revert to emergency mode which is to meow consistently until snacc
            given.
          </p>
          <p className="arc_t_c_p">
            Please do not pet it's belly, and do not let it near other
            technology, plastic, or glass.
          </p>
          <h5 className="arc_t_c_h5">
            We highly advise you read our Terms and Conditions and Privacy
            Policy before continuing.
          </h5>
        </div>
        {/* if req - import and add terms and conditions component -
         <div className="arc_t_c_element_end">
          <TermsAndConditionsElement />
        </div>*/}
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
