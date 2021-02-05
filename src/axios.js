import axios from "axios";

const instance = axios.create({
  // THE API (cloud function) URL
  // baseURL: 'https://us-central1-challenge-4b2b2.cloudfunctions.net/api'
  // baseURL: "https://us-central1-clone-8e98c.cloudfunctions.net/api",
  baseURL: "https://hamazorn.herokuapp.com",
});

export default instance;
