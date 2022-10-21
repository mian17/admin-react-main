export const laravelSanctumConfig = {
  headers: {
    Accept: "application/json",
  },
};
console.log(localStorage.getItem("personalAccessToken"));
export const userToken = JSON.parse(
  localStorage.getItem("personalAccessToken")
);

export const tokenHeaderConfig = {
  headers: {
    Authorization: `Bearer ${userToken}`,
    Accept: "application/json",
  },
};
