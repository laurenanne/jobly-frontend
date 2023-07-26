import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class JoblyApi {
  static async request(endpoint, data = {}, method = "get") {
    let token = localStorage.getItem("token");

    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${token}` };
    const params = data;

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  // GET REQUESTS
  /** Get details on a company by handle. */
  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  // Get all companies
  static async getCompanies() {
    let res = await this.request(`companies`);
    return res.companies;
  }

  // Get filtered companies
  static async getFilteredCompanies(name) {
    let res = await this.request(`companies/?name=${name}`);
    return res.companies;
  }

  // get all jobs
  static async getJobs() {
    let res = await this.request(`jobs`);
    return res.jobs;
  }

  // get filtered jobs
  static async getFilteredJobs(title) {
    let res = await this.request(`jobs/?title=${title}`);
    return res.jobs;
  }

  // Get all users
  static async getUsers() {
    let res = await this.request(`users`);
    return res.users;
  }

  // get current user
  static async getCurrentUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  // ********************************************************************************
  // POST and PATCH requests
  // validate a user sign In, returns a token

  static async getToken(data) {
    try {
      let res = await axios({
        url: `${BASE_URL}/auth/token`,
        method: "POST",
        data: data,
      });
      return res.data.token;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // sign Up a new user, returns a token
  static async signup(data) {
    try {
      let res = await axios({
        url: `${BASE_URL}/auth/register`,
        method: "POST",
        data: data,
      });
      return res.data.token;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // edit a user
  static async edit(data, userName) {
    let token = localStorage.getItem("token");
    try {
      let res = await axios({
        url: `${BASE_URL}/users/${userName}`,
        method: "PATCH",
        data: data,
        body: JSON.stringify({ data }),
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return res.data.user;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // apply for a job
  static async apply(username, id) {
    let token = localStorage.getItem("token");
    try {
      let res = await axios({
        url: `${BASE_URL}/users/${username}/jobs/${id}`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }
}

export default JoblyApi;
