export const getToken = () => {
  let token = sessionStorage.getItem("jwt");
  let AuthStr = "Bearer ".concat(token);
  return AuthStr;
};
