import React, { useContext } from "react";
import { RegistrationContext } from "../context/RegistrationContext.context";
import md5 from "md5";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
import { firebaseConfig } from "../firebase-credentials";
import RegistrationDetailsComplete from "../elements/RegistrationDetailsComplete";

export default function HomeView() {
  const context = useContext(RegistrationContext);
  const { v4: uuidv4 } = require("uuid");

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const { registerAccount } = context;
  const { name, email, user_location } = registerAccount;
  const db = getDatabase(app);
  set(ref(db, "presale-account " + uuidv4()), {
    user_type: registerAccount.user_type,
    name: registerAccount.name,
    email: registerAccount.email,
    password: md5(registerAccount.password),
    user_location: registerAccount.user_location,
    user_distance: registerAccount.user_distance,
    user_tier: registerAccount.user_tier,
    knight_watch: registerAccount.knight_watch,
    protection_barrier: registerAccount.protection_barrier,
    attack_mode: registerAccount.attack_mode,
    defense_mode: registerAccount.defense_mode,
  });

  return (
    <>
      <RegistrationDetailsComplete
        userDetails={{ name, email, user_location }}
      ></RegistrationDetailsComplete>
    </>
  );
}
