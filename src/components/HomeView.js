import React, { useContext } from "react";
import { RegistrationContext } from "./context/RegistrationContext.context";
import HomeHeader from "./elements/HomeHeader";
import PetCard from "./elements/pet-cards/PetCard";
import md5 from "md5";

export default function HomeView(props) {
  const context = useContext(RegistrationContext);

  console.log(context.registerAccount);
  console.log(md5("ello"));

  return (
    <>
      <div className="arc_container_homeview">
        <HomeHeader />
        <PetCard />
      </div>
    </>
  );
}
