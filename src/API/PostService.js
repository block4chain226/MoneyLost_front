// import axios from "axios";
export default class PostService {
  static async getAll() {
    const response = await fetch("http://localhost:3000/category");
    return response.json();
  }

  // static async getById(id) {
  //   const response = await axios.get(
  //     "https://jsonplaceholder.typicode.com/posts/" + id
  //   );

  //   return response;
  // }

  // static async getCommentsByPostId(id) {
  //   const response = await axios.get(
  //     `https://jsonplaceholder.typicode.com/posts/${id}/comments/`
  //   );

  //   return response;
  // }
}
