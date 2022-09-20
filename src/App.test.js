import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RegistrationProvider } from "./components/context/RegistrationContext.context.js";
import TermsAndConditionsView from "./components/pages/TermsAndConditionsView.js";
import App from "./containers/App.js";

test("Landing Page Assertions", () => {
  render(
    <RegistrationProvider>
      <App />
    </RegistrationProvider>
  );
  const registerButton = screen.getByText("Register");
  expect(screen.getByText("Knight Cat")).toHaveClass("arc_header_knightcat");
  expect(screen.getByText("Register")).not.toBeDisabled();
  userEvent.click(registerButton);
  expect(screen.getByText("Disclaimer.")).toBeInTheDocument();
});

test("Terms and Conditions Page Assertions", () => {
  render(
    <RegistrationProvider>
      <App />
    </RegistrationProvider>
  );
  const registerButton = screen.getByText("Register");
  userEvent.click(registerButton);
  expect(
    screen.getByText(
      /We highly advise you read our Terms and Conditions and Privacy Policy before continuing./
    )
  ).toHaveClass("arc_t_c_h5");
  expect(screen.getByText("Back")).not.toBeDisabled();
  expect(screen.getByText("Agree")).not.toBeDisabled();
  const agreeButton = screen.getByText("Agree");
  userEvent.click(agreeButton);
  const selectOption = screen.getByLabelText("Commercial");
  expect(screen.getByLabelText("Commercial")).toBeInTheDocument();
  expect(screen.getByLabelText("Homeowner")).toBeInTheDocument();
  expect(screen.getByText("continue")).toBeDisabled();
  userEvent.click(selectOption);
  expect(screen.getByText("continue")).not.toBeDisabled();
  const continueButton = screen.getByText("continue");
  userEvent.click(continueButton);
  expect(
    screen.getByText(/A few more steps to secure priority access to /)
  ).toBeInTheDocument();
});

test("Input assertions", () => {
  render(
    <RegistrationProvider>
      <App />
    </RegistrationProvider>
  );
  const registerButton = screen.getByText("Register");
  userEvent.click(registerButton);
  const agreeButton = screen.getByText("Agree");
  userEvent.click(agreeButton);
  const selectOption = screen.getByLabelText("Commercial");
  userEvent.click(selectOption);
  const continueButton = screen.getByText("continue");
  userEvent.click(continueButton);

  expect(screen.getByLabelText("Organisation Name")).toHaveClass(
    "arc_generic_input Organisation Name"
  );

  expect(screen.getByLabelText("Email")).toHaveClass("arc_generic_input Email");
});

// add a reverse of traversing the back buttons
// set up buttons with like a beforeeach?
// loops or length checks to avoid repetition of expects?
// utilise Jest and react testing library in tandem?
