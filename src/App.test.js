import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RegistrationProvider } from "./components/context/RegistrationContext.context.js";
import App from "./containers/App.js";
import { RegistrationContext } from "./components/context/RegistrationContext.context.js";
import { useContext } from "react";

/******** AUTH CONTEXT ASSERTIONS ********/
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

test("Context Assertions", async () => {
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

/******** BUTTON INPUT SETUP ********/
//beforeeach wont work currently - need to return each func?

beforeEach(() => {
  let nameInput = (labelValue) => {
    let input = screen.getByLabelText(labelValue);
    return {
      input,
    };
  };

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
});

/************************************************/

/******** LANDING PAGE ASSERTIONS ********/
test("Landing Page Assertions", async () => {
  render(
    <RegistrationProvider>
      <App />
    </RegistrationProvider>
  );
  const { registerButton } = landingButtons();
  expect(screen.getByText("Knight Cat")).toHaveClass("arc_header_knightcat");
  expect(screen.getByText("Register")).not.toBeDisabled();
  userEvent.click(registerButton);
  await waitFor(() => {
    expect(screen.getByText("Disclaimer.")).toBeInTheDocument();
  });
});

test("Terms and Conditions Page Assertions", () => {
  render(
    <RegistrationProvider>
      <App />
    </RegistrationProvider>
  );
  const { registerButton } = landingButtons();
  userEvent.click(registerButton);
  expect(
    screen.getByText(
      /We highly advise you read our Terms and Conditions and Privacy Policy before continuing./
    )
  ).toHaveClass("arc_t_c_h5");
  expect(screen.getByText("Back")).not.toBeDisabled();
  expect(screen.getByText("Agree")).not.toBeDisabled();
  const { agreeButton } = termsAndConditionsButtons();
  userEvent.click(agreeButton);
  const { selectOption } = customerTypeButtons();
  expect(screen.getByLabelText("Commercial")).toBeInTheDocument();
  expect(screen.getByLabelText("Homeowner")).toBeInTheDocument();
  expect(screen.getByText("continue")).toBeDisabled();
  userEvent.click(selectOption);
  expect(screen.getByText("continue")).not.toBeDisabled();
  const { continueButton } = customerTypeButtons();
  userEvent.click(continueButton);
  expect(
    screen.getByText(/A few more steps to secure priority access to /)
  ).toBeInTheDocument();
});

/************************************************/

/******** INPUT ASSERTIONS ********/

test("Input Name Assertion", () => {
  render(
    <RegistrationProvider>
      <App />
    </RegistrationProvider>
  );
  const { registerButton } = landingButtons();
  userEvent.click(registerButton);
  const { agreeButton } = termsAndConditionsButtons();
  userEvent.click(agreeButton);
  const { selectOption } = customerTypeButtons();
  userEvent.click(selectOption);
  const { continueButton } = customerTypeButtons();
  userEvent.click(continueButton);

  let { input } = nameInput("Organisation Name");
  fireEvent.change(input, { target: { value: "Hayden Ismet Industries" } });
  expect(input.value).toBe("Hayden Ismet Industries");
});

test("Input Email Assertion", () => {
  render(
    <RegistrationProvider>
      <App />
    </RegistrationProvider>
  );

  const { registerButton } = landingButtons();
  userEvent.click(registerButton);
  const { agreeButton } = termsAndConditionsButtons();
  userEvent.click(agreeButton);
  const { selectOption } = customerTypeButtons();
  userEvent.click(selectOption);
  const { continueButton } = customerTypeButtons();
  userEvent.click(continueButton);

  let { input } = nameInput("Email");
  fireEvent.change(input, { target: { value: "h@h.com" } });
  expect(input.value).toBe("h@h.com");
});
/************************************************/

// add a reverse of traversing the back buttons
// set up buttons with like a beforeeach?
// validate context obj for each test
// validate overall context obj
// render specific part of the orch with the context obj pre-filled so you can do the subsequent slide, i.e the second slide of questions
