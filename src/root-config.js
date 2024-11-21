import { registerApplication, start } from "single-spa";
import * as isActive from "./activity-functions";

let state = {
  isLoggedIn: false,
};

function renderLoginButton() {
  const loginContainer = document.getElementById("mf-employees-login");
  if (state.isLoggedIn) {
    loginContainer.style.display = "none";
  } else {
    loginContainer.style.display = "block";
  }
}

function registerProtectedApplications() {
  // Register employees application
  registerApplication({
    name: "@mf-demo/employees",
    app: () => System.import("@mf-demo/employees"),
    activeWhen: isActive.employees,
    customProps: { isLoggedIn: state.isLoggedIn },
  });

  // Register employee-details application
  registerApplication({
    name: "@mf-demo/employee-details",
    app: () => System.import("@mf-demo/employee-details"),
    activeWhen: isActive.employeeDetails,
  });

  console.log("Protected applications registered.");
}

function handleLogin() {
  state.isLoggedIn = true;
  console.log("Login successful! State updated:", state);
  renderLoginButton();

  // Dynamically register the protected applications
  registerProtectedApplications();
}

const loginButton = document.getElementById("mf-employees-login");

if (loginButton) {
  loginButton.addEventListener("click", handleLogin);
}

// Always register the navbar application
registerApplication(
  "@mf-demo/navbar",
  () => System.import("@mf-demo/navbar"),
  isActive.navbar
);

// Start single-spa
start();

// Initial render of the login button
renderLoginButton();
