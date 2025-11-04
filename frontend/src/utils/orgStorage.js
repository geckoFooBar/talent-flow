export const getCurrentOrg = () => JSON.parse(localStorage.getItem("currentOrg"));
export const setCurrentOrg = (org) => {
  localStorage.setItem("currentOrg", JSON.stringify(org));
  const all = JSON.parse(localStorage.getItem("organizations") || "[]");
  const updated = all.map((o) => (o.orgId === org.orgId ? org : o));
  localStorage.setItem("organizations", JSON.stringify(updated));
};
