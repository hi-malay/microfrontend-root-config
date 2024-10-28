// Determine base path dynamically
const isLocal = window.location.hostname === "localhost";
const basePath = isLocal ? "" : "/mf-root-config";

export function navbar(location) {
  return true; // The navbar is always active
}

export function employees(location) {
  console.log('location.pathname :>> ', location.pathname, `${basePath}/employees`);
  return location.pathname === `${basePath}/employees`;
}

export function employeeDetails(location) {
  const regex = new RegExp(`^${basePath}/employees/\\d+$`);
  return regex.test(location.pathname);
}
