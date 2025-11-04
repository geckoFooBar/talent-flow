export const loginUserByRole = (email, password, role) => {
  const organizations = JSON.parse(localStorage.getItem("organizations") || "[]");

  let loggedInUser = null;
  let currentOrg = null;

  for (const org of organizations) {
    const user = (org.users || []).find(
      (u) => u.email === email && u.password === password && u.role === role
    );
    if (user) {
      loggedInUser = user;
      currentOrg = org;
      break;
    }
  }

  if (!loggedInUser) return null;

  localStorage.setItem("currentUser", JSON.stringify(loggedInUser));
  localStorage.setItem("currentOrg", JSON.stringify(currentOrg));
  localStorage.setItem("isLoggedIn", "true");

  return loggedInUser;
};
