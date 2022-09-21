import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RegistrationProvider } from "./components/context/RegistrationContext.context.js";
import TermsAndConditionsView from "./components/pages/TermsAndConditionsView.js";
import App from "./containers/App.js";

let nameInput = (labelValue) => {
  const input = screen.getByLabelText(labelValue);
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

test("Input Name", () => {
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

test("Input Email", () => {
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

// add a reverse of traversing the back buttons
// set up buttons with like a beforeeach?
// loops or length checks to avoid repetition of expects?
// utilise Jest and react testing library in tandem?
// utilisation of await async?
//const emailInput = screen.getByLabelText("Email");
//userEvent.click(emailInput);
