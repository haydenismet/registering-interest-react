import React, { useContext } from "react";
import { RegistrationContext } from "./context/RegistrationContext.context";
import md5 from "md5";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
import { firebaseConfig } from "./firebase-credentials";

import PetCardFullDetail from "./elements/PetCardFullDetail";

export default function HomeView() {
  const context = useContext(RegistrationContext);
  const { v4: uuidv4 } = require("uuid");

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const { registerAccount } = context;

  const db = getDatabase(app);
  set(ref(db, "presale-account " + uuidv4()), {
    user_type: registerAccount.user_type,
    name: registerAccount.name,
    email: registerAccount.email,
    password: md5(registerAccount.password),
    user_location: registerAccount.user_location,
    user_distance: registerAccount.user_distance,
    rehoming_fee: registerAccount.rehoming_fee,
    knight_watch: registerAccount.knight_watch,
    protection_barrier: registerAccount.protection_barrier,
    cat: registerAccount.cat,
    dog: registerAccount.dog,
  });

  return (
    <>
      <div className="arc_container_homeview">
        <PetCardFullDetail></PetCardFullDetail>
      </div>
    </>
  );
}
