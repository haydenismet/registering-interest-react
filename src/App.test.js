import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RegistrationProvider } from "./components/context/RegistrationContext.context.js";
import App from "./containers/App.js";
import { RegistrationContext } from "./components/context/RegistrationContext.context.js";
import { useContext } from "react";
import TermsAndConditionsView from "./components/pages/TermsAndConditionsView.js";

/******** context validations ********/
const matchingValues = [
  {
    user_type: "Commercial",
    name: "Hayden Ismet Industries",
    email: "hayden@ismetindustries.com",
    confirm_email: "hayden@ismetindustries.com",
    password: "interestingPangolin1!",
    confirm_password: "interestingPangolin1!",
    user_location: "West Midlands",
    user_distance: "5 Miles",
    user_tier: "Platinum",
    knight_watch: "true",
    protection_barrier: "true",
    attack_mode: "true",
    defense_mode: "true",
  },
];

/* mock component for context validation */
const AuthContextAssertions = () => {
  let { registerAccount } = useContext(RegistrationContext);
  registerAccount = [
    {
      user_type: "Commercial",
      name: "Hayden Ismet Industries",
      email: "hayden@ismetindustries.com",
      confirm_email: "hayden@ismetindustries.com",
      password: "interestingPangolin1!",
      confirm_password: "interestingPangolin1!",
      user_location: "West Midlands",
      user_distance: "5 Miles",
      user_tier: "Platinum",
      knight_watch: "true",
      protection_barrier: "true",
      attack_mode: "true",
      defense_mode: "true",
    },
  ];
  if (registerAccount) {
    //console.log(registerAccount[0]);
    return registerAccount.map((item) => {
      return (
        <>
          <p>{item.user_type}</p>
          <p>{item.name}</p>
          <p>{item.email}</p>
          <p>{item.confirm_email}</p>
          <p>{item.password}</p>
          <p>{item.confirm_password}</p>
          <p>{item.user_location}</p>
          <p>{item.user_distance}</p>
          <p>{item.user_tier}</p>
          <p>{item.knight_watch}</p>
          <p>{item.protection_barrier}</p>
          <p>{item.attack_mode}</p>
          <p>{item.defense_mode}</p>
        </>
      );
    });
  }
};

/* testing context values */
test("Context Functionality", async () => {
  render(
    <RegistrationProvider>
      <AuthContextAssertions />
    </RegistrationProvider>
  );

  const getUserType = screen.getByText("Commercial").textContent;
  expect(matchingValues[0].user_type).toEqual(getUserType);

  const getName = screen.getByText("Hayden Ismet Industries").textContent;
  expect(matchingValues[0].name).toEqual(getName);

  screen.getAllByText("hayden@ismetindustries.com").forEach((element) => {
    expect(element.textContent).toEqual(
      matchingValues[0].email && matchingValues[0].confirm_email
    );
  });

  screen.getAllByText("interestingPangolin1!").forEach((element) => {
    expect(element.textContent).toEqual(
      matchingValues[0].password && matchingValues[0].confirm_password
    );
  });

  const getUserLocation = screen.getByText("West Midlands").textContent;
  expect(matchingValues[0].user_location).toEqual(getUserLocation);

  const getUserDistance = screen.getByText("5 Miles").textContent;
  expect(matchingValues[0].user_distance).toEqual(getUserDistance);

  const getUserTier = screen.getByText("Platinum").textContent;
  expect(matchingValues[0].user_tier).toEqual(getUserTier);

  screen.getAllByText("true").forEach((element) => {
    expect(element.textContent).toEqual(
      matchingValues[0].knight_watch &&
        matchingValues[0].protection_barrier &&
        matchingValues[0].attack_mode &&
        matchingValues[0].defense_mode
    );
  });
});

/************************************************/

/******** button setup ********/

const landingButtons = () => {
  const registerButton = screen.getByText("Register");
  return {
    registerButton,
  };
};

const termsAndConditionsButtons = () => {
  const agreeButton = screen.getByText("Agree");
  return {
    agreeButton,
  };
};

const customerTypeButtons = () => {
  const selectOption = screen.getByLabelText("Commercial");
  const continueButton = screen.getByText("continue");
  return {
    selectOption,
    continueButton,
  };
};

/************************************************/

/******** landing page ********/
test("Landing Page", async () => {
  render(
    <RegistrationProvider>
      <App />
    </RegistrationProvider>
  );
  const { registerButton } = landingButtons();
  expect(screen.getByText("Knight Cat")).toHaveClass("arc_header_knightcat");
  expect(screen.getByText("Register")).not.toBeDisabled();
  userEvent.click(registerButton);
  expect(screen.getByText("Disclaimer.")).toBeInTheDocument();
});

/******** terms and conditions page ********/
test("Terms and Conditions Page", () => {
  render(
    <RegistrationProvider>
      <TermsAndConditionsView />
    </RegistrationProvider>
  );

  expect(
    screen.getByText(
      /We highly advise you read our Terms and Conditions and Privacy Policy before continuing./
    )
  ).toHaveClass("arc_t_c_h5");
  expect(screen.getByText("Back")).not.toBeDisabled();
  expect(screen.getByText("Agree")).not.toBeDisabled();
  const { agreeButton } = termsAndConditionsButtons();
  userEvent.click(agreeButton);
});

/******** user registration flow ********/
test("User Registration", () => {
  render(
    <RegistrationProvider>
      <App />
    </RegistrationProvider>
  );
  //register
  const { registerButton } = landingButtons();
  userEvent.click(registerButton);

  //t&cs agree
  const { agreeButton } = termsAndConditionsButtons();
  userEvent.click(agreeButton);
  expect(screen.getByLabelText("Commercial")).toBeInTheDocument();
  expect(screen.getByLabelText("Homeowner")).toBeInTheDocument();
  expect(screen.getByText("continue")).toBeDisabled();

  //select commercial customer
  const { selectOption } = customerTypeButtons();
  userEvent.click(selectOption);

  expect(screen.getByText("continue")).not.toBeDisabled();

  const { continueButton } = customerTypeButtons();
  userEvent.click(continueButton);

  expect(
    screen.getByText(/A few more steps to secure priority access to /)
  ).toBeInTheDocument();

  //answer input questions
  let inputObjs = {
    name: screen.getByLabelText("Organisation Name"),
    email: screen.getByLabelText("Email"),
    confirmEmail: screen.getByLabelText("Confirm Email"),
    password: screen.getByLabelText("Password"),
    confirmPassword: screen.getByLabelText("Confirm Password"),
  };

  fireEvent.change(inputObjs.name, {
    target: { value: "Hayden Ismet Industries" },
  });

  expect(inputObjs.name.value).toBe("Hayden Ismet Industries");
  fireEvent.change(inputObjs.email, { target: { value: "h@h.com" } });

  expect(inputObjs.email.value).toBe("h@h.com");
  fireEvent.change(inputObjs.confirmEmail, { target: { value: "h@h.com" } });

  expect(inputObjs.confirmEmail.value).toBe("h@h.com");
  fireEvent.change(inputObjs.password, {
    target: { value: "whatAInterestingPassword1!" },
  });

  expect(inputObjs.password.value).toBe("whatAInterestingPassword1!");
  fireEvent.change(inputObjs.confirmPassword, {
    target: { value: "whatAInterestingPassword1!" },
  });

  expect(inputObjs.confirmPassword.value).toBe("whatAInterestingPassword1!");

  let submit = screen.getByText("Continue");
  userEvent.click(submit);

  expect(
    screen.getByText("Where is your organisation based?")
  ).toBeInTheDocument();

  //answer preference questions
  let orgLocation = screen.getByTestId("arc_location_label");
  fireEvent.change(orgLocation, {
    target: { value: "West Midlands" },
  });

  let orgDistance = screen.getByTestId("arc_rehoming_label");
  fireEvent.change(orgDistance, { target: { value: "2 Miles" } });

  let coverOptionOne = screen.getByTestId("Patrol");
  let coverOptionTwo = screen.getByTestId("Sentry");
  fireEvent.click(coverOptionOne);
  fireEvent.click(coverOptionTwo);

  let chosenTier = screen.getByTestId("arc_fee_label");
  fireEvent.change(chosenTier, { target: { value: "Platinum" } });

  let attacMode = screen.getByTestId("Attacc");
  let defensMode = screen.getByTestId("Protecc");
  fireEvent.click(attacMode);
  fireEvent.click(defensMode);

  let finalReg = screen.getByText("Register");
  expect(finalReg).not.toBeDisabled();
  fireEvent.click(finalReg);

  expect(screen.getByText("Hayden Ismet Industries")).toBeInTheDocument();
  expect(screen.getByText("h@h.com")).toBeInTheDocument();
  expect(screen.getByText("West Midlands")).toBeInTheDocument();
});

/************************************************/
