import api from "configs/api"

const getProfile = () => api.get("user/whoami").then(res => res || false);


const getPosts = () => api.get("post/my");

const getAllPost = () => api.get("");

export {getProfile , getPosts ,getAllPost }