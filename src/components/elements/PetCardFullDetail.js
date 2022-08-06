import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
export default function PetCardFullDetail() {
  return (
    <>
      <div className="arc_pet_card_container">
        <div className="arc_pet_card_nav">
          <button>All Pets</button> <button>Back</button>
          <button>Next</button>
        </div>
        <div className="arc_pet_card_details">
          <div className="arc_pet_name">Shiro.</div>
          <div className="arc_pet_org">dogs trust.</div>
          <div className="arc_pet_card_img_container">
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
          <div className="arc_pet_card_full_description">
            <p>
              Bella loves a good fuss, and like any greyhound she will lean into
              your legs. Unless you throw a toy, then the fun begins!
            </p>

            <p>
              Bella will need some help building up her confidence around other
              dogs as she has shown to be initially worried around them.
            </p>

            <p>
              She can be a typical Greyhound and get focused on the fluffy
              wildlife in the park but he can be easily distracted by food.
            </p>
          </div>
          <div className="arc_pet_card_full_points">
            <h4>Organisation</h4>
            <p>Retired Greyhound Trust</p>
            <h4>Location</h4>
            <p>Birmingham</p>
            <h4>Living with children</h4>
            <p>I can only live with adults</p>
            <h4>Living with dogs</h4>
            <p>I can live with bigger dogs</p>
            <h4>Living with cats</h4>
            <p>I can't live with cats</p>
          </div>
        </div>
        <button>Adopt</button>
        <button>Foster</button>
      </div>
    </>
  );
}
