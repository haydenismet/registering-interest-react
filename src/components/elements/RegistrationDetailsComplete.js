import React from "react";
import RegistrationLoginHeaderElement from "./RegistrationLoginHeaderElement";
export default function RegistrationDetailsComplete(props) {
  const { userDetails } = props;

  return (
    <>
      <RegistrationLoginHeaderElement />
      <div className="arc_content_container_end">
        <div className="arc_complete_details">
          <div className="arc_complete_name">
            <b>Thanks, {userDetails.name}</b>
          </div>
          <div className="arc_pet_org">
            Your details have been sent to our Firebase.
          </div>
          <div className="arc_pet_completed_details">
            <div className="arc_pet_completed_detail_container">
              <span className="arc_pet_completed_detail_safe arc_detail_styles">
                Safe
              </span>
              <span className="arc_pet_completed_detail_secure arc_detail_styles">
                Secure
              </span>
              <span className="arc_pet_completed_detail_fluffy arc_detail_styles">
                Fluffy
              </span>
            </div>
          </div>
          <div className="arc_pet_completed_full_description">
            <div className="arc_pet_org">
              <b>What's next?</b>
            </div>
            <p>
              We'll be in touch when presale access is happening, and you are
              guaranteed a <b>KnightCat</b>.
            </p>

            <p>
              You will have 36 hours from delivery of our email to make your
              purchase, after which your slot will be released to those on the
              waitlist.
            </p>
          </div>
          <div className="arc_pet_org">
            <b>Your details</b>
          </div>
          <div className="arc_pet_completed_full_points">
            <div>
              <h5>Name</h5>
              <p>{userDetails.name}</p>
            </div>
            <div>
              <h5>Email</h5>
              <p>{userDetails.email}</p>
            </div>
            <h5>Location</h5>
            <p>{userDetails.user_location}</p>
          </div>
        </div>
        <div className="arc_pet_goodbye">
          <b>See meow soon.</b>
          <div>
            * Firebase read/write is disabled unless a demo is requested.
          </div>
        </div>
      </div>
    </>
  );
}
