import React from "react";
import RegistrationLoginHeaderElement from "../elements/RegistrationLoginHeaderElement.js";
import TermsAndConditionsElement from "../elements/TermsAndConditionsElement.js";

import NextElement from "../elements/NextElement.js";
import BackElement from "../elements/BackElement.js";
export default function TermsAndConditionsView(props) {
  const { handleViewClickNext, handleViewClickBack, view } = props;
  return (
    <>
      <div className="arc_container_reg">
        <RegistrationLoginHeaderElement />
        <div className="arc_t_c_view_container">
          <div className="arc_t_c_view ts_cs">
            <div className="arc_t_c_intro">
              Animal Rescue Collective is a service platform which aims to
              support grassroots charities.
            </div>
            <div className="arc_t_c_heading">
              We noticed many local charities working hard to make sure animals
              were fostered or adopted. These charities rely on word of mouth
              and social media platforms that aren't fit for purpose.
            </div>
            <div className="arc_t_c_subheading">
              Our goal was to serve one purpose; every pet deserves a home, and
              the Animal Rescue Collective helps charities in need give their
              pets the best life.
            </div>
          </div>
          <div className="arc_t_c_element_end">
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
          </div>
        </div>
      </div>
    </>
  );
}
