import urls from "../urls";

const getPosts = async () => {
  const peticion = await fetch(`${urls.post}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer " + JSON.parse(localStorage.getItem("user"))?.access_token,
    },
  });
  const response = await peticion.json();
  return { status: peticion.status, response };
};

const addPost = async ({ ...post }) => {
  const peticion = await fetch(`${urls.post}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer " + JSON.parse(localStorage.getItem("user"))?.access_token,
    },
    body: JSON.stringify({
      user_id: JSON.parse(localStorage.getItem("user"))?.id,
      ...post,
    }),
  });
  const response = await peticion.json();
  return { status: peticion.status, response };
};

export const postServices = Object.freeze({
  getPosts,
  addPost,
});

export default postServices;
