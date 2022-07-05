import React, { useContext } from "react";
import { RegistrationContext } from "./context/RegistrationContext.context";
import HomeHeader from "./elements/HomeHeader";
import PetCard from "./elements/pet-cards/PetCard";

export default function HomeView(props) {
  const context = useContext(RegistrationContext);

  console.log(context.registerAccount);

  return (
    <>
      <div className="arc_container_homeview">
        <HomeHeader />
        <PetCard />
      </div>
    </>
  );
}
