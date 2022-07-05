import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import PetCardFullDetail from "./PetCardFullDetail";

export default function PetCard() {
  let [pet, setPet] = useState("");
  function onPetClick(e) {
    e.preventDefault();
    setPet(true);
  }
  return !pet ? (
    <>
      <div className="arc_pet_card_container">
        <div className="arc_pet_card_details">
          <div className="arc_pet_name">Shiro.</div>
          <div className="arc_pet_org">dogs trust.</div>
          <div className="arc_pet_card_img_container" onClick={onPetClick}>
            <img
              alt="pet_card"
              className="arc_pet_card_img"
              src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2874&q=80"
            ></img>
            <div className="arc_reserved">RESERVED</div>
          </div>
          <div className="arc_pet_card_likes_details">
            <span className="arc_likes">
              <span className="arc_likes_fa_icon">
                <FontAwesomeIcon icon={farHeart} />
              </span>
              <div className="arc_likes_qty">40</div>
            </span>
            <div className="arc_pet_card_detail_container">
              <span className="arc_pet_card_detail_age arc_detail_styles">
                4 yrs
              </span>
              <span className="arc_pet_card_detail_size arc_detail_styles">
                small
              </span>
              <span className="arc_pet_card_detail_gender arc_detail_styles">
                male
              </span>
            </div>
          </div>
          <div className="arc_pet_card_mini_description">
            This little boy is extremely fun to be around! Shiro was brought to
            us after
            <span className="arc_more_descriptor" onClick={onPetClick}>
              ...more
            </span>
          </div>
        </div>
      </div>
    </>
  ) : (
    <PetCardFullDetail />
  );
}
