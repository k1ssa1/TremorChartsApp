import axios from "axios";

export const instance = axios.create({
  baseURL: "https://earthquake.usgs.gov/fdsnws/event/1/",
});
