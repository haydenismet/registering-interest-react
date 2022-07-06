import React from "react";
import NextElement from "../elements/NextElement.js";
import RegistrationLoginHeaderElement from "../elements/RegistrationLoginHeaderElement.js";
import ProgressBarElement from "../elements/ProgressBarElement.js";
import BackElement from "../elements/BackElement.js";
import RadioButtonElement from "../elements/RadioButtonElement.js";

export default function RegistrationOneView(props) {
  const {
    input,
    handleViewClickNext,
    handleViewClickBack,
    view,
    onGenericInputChange,
  } = props;

  return (
    <>
      <div className="arc_container_reg">
        <RegistrationLoginHeaderElement />
        <div className="arc_container_reg_flex">
          <div className="arc_container_reg_1">
            <ProgressBarElement stage="1" />
            <div className="arc_registration_one_container">
              <div className="arc_registration_one_heading">
                Select your status
              </div>
              <div className="arc_registration_org_container">
                <RadioButtonElement
                  onGenericInputChange={onGenericInputChange}
                  radioName="arc_user_type_radio"
                  radioValue="org"
                  radioLabel="arc_org_id"
                  radioId="arc_org_id"
                  radioCopy="Business"
                />

                <div className="arc_registration_one_org_desc">
                  a grassroots organisation relying heavily on donations in
                  order to keep animals cared for in your possession before
                  adoption and/or fostering.
                </div>
              </div>
              <div className="arc_registration_user_container">
                <RadioButtonElement
                  onGenericInputChange={onGenericInputChange}
                  radioName="arc_user_type_radio"
                  radioValue="user"
                  radioLabel="arc_user_id"
                  radioId="arc_user_id"
                  radioCopy="Private resident"
                />

                <div className="arc_registration_one_user_desc">
                  you're looking to help out and adopt animals in need,
                  supporting grassroots organisations in the process
                </div>
              </div>
            </div>
          </div>
          <div className="arc_button_container">
            <BackElement
              backCopy="back"
              handleViewClickBack={handleViewClickBack}
            />
            <NextElement
              nextCopy="continue"
              handleViewClickNext={handleViewClickNext}
              isDisabled={input ? false : true}
              view={view}
              /*Set to disabled on default until the user selects ORG or USER status, then set disabled to false -> this is done by a conditional within NextElement.js additionally. If there is a user value, dont set it to disabled. If there isn't, set to disabled (true).*/
            />
          </div>
        </div>
      </div>
    </>
  );
}
