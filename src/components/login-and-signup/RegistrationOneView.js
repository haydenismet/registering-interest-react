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
      <RegistrationLoginHeaderElement />

      <ProgressBarElement stage="1" />
      <div className="arc_content_container">
        <div className="arc_registration_org_container">
          <RadioButtonElement
            onGenericInputChange={onGenericInputChange}
            radioName="arc_user_type_radio"
            radioValue="Commercial"
            radioLabel="arc_org_id"
            radioId="arc_org_id"
            radioCopy="Commercial"
          />

          <div className="arc_registration_one_org_desc">
            Including but not limited to offices, restaurants, late night
            venues, etc.
          </div>
        </div>
        <div className="arc_registration_user_container">
          <RadioButtonElement
            onGenericInputChange={onGenericInputChange}
            radioName="arc_user_type_radio"
            radioValue="Personal"
            radioLabel="arc_user_id"
            radioId="arc_user_id"
            radioCopy="Homeowner"
          />

          <div className="arc_registration_one_user_desc">
            Any type of home, from apartment buildings to detached housing.
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
    </>
  );
}
