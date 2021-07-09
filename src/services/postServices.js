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

const deletePost = async (id) => {
  const peticion = await fetch(`${urls.post}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer " + JSON.parse(localStorage.getItem("user"))?.access_token,
    },
  });
  const response = await peticion.json();
  return { status: peticion.status, response };
};

const editPost = async ({ id, post }) => {
  const peticion = await fetch(`${urls.post}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer " + JSON.parse(localStorage.getItem("user"))?.access_token,
    },
    body: JSON.stringify(post),
  });
  const response = await peticion.json();
  return { status: peticion.status, response };
};

const getPost = async (id) => {
  const peticion = await fetch(`${urls.post}/${id}`, {
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

export const postServices = Object.freeze({
  getPosts,
  addPost,
  deletePost,
  editPost,
  getPost,
});

export default postServices;
