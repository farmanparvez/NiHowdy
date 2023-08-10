import { getRequest } from "../utils/request";

export const blogsAPI = () => getRequest("", "https://blogs.nihowdy.com/wp-json/wp/v2/posts")

export const blogsDetailByIdAPI = ({ id }) => getRequest("", `https://blogs.nihowdy.com/wp-json/wp/v2/posts/${id}`)
