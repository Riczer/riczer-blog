import urls from "../urls";

const login = async ({ ...userInfo }) => {
  const peticion = await fetch(`${urls.login}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInfo),
  });
  const response = await peticion.json();
  return { status: peticion.status, response };
};

const register = async ({ ...userInfo }) => {
  console.log({ userInfo });
  const peticion = await fetch(`${urls.user}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInfo),
  });
  const response = await peticion.json();
  return { status: peticion.status, response };
};

export const userServices = Object.freeze({
  login,
  register,
});

export default userServices;
