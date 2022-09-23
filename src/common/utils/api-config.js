export const laravelSanctumConfig = {
  headers: {
    Accept: "application/json",
  },
};

export const userToken = JSON.parse(
  localStorage.getItem("personalAccessToken")
);

export const tokenHeaderConfig = {
  headers: {
    Authorization: `Bearer ${userToken}`,
    Accept: "application/json",
  },
};
