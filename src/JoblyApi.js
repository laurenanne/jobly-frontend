import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class JoblyApi {
  static async request(endpoint, data = {}, method) {
    const token = localStorage.getItem("token");
    const url = `${BASE_URL}/${endpoint}`;

    const headers = { Authorization: `Bearer ${token}` };
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      let message = err.response.data.error.message;

      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  // GET REQUESTS
  /** Get details on a company by handle. */
  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`, "get");
    return res.company;
  }

  // Get all companies
  static async getCompanies() {
    let res = await this.request(`companies`, "get");
    return res.companies;
  }

  // Get filtered companies
  static async getFilteredCompanies(name) {
    let res = await this.request(`companies/?name=${name}`, "get");
    return res.companies;
  }

  // get all jobs
  static async getJobs() {
    let res = await this.request(`jobs`, "get");
    return res.jobs;
  }

  // get filtered jobs
  static async getFilteredJobs(title) {
    let res = await this.request(`jobs/?title=${title}`, "get");
    return res.jobs;
  }

  // Get all users
  static async getUsers() {
    let res = await this.request(`users`, "get");
    return res.users;
  }

  // get current user
  static async getCurrentUser(username) {
    let res = await this.request(`users/${username}`, "get");
    return res.user;
  }

  // ********************************************************************************
  // POST and PATCH requests

  // validate a user sign In, returns a token
  static async getToken(data) {
    let res = await this.request("auth/token", data, "post");
    return res.token;
  }

  // sign Up a new user, returns a token
  static async signup(data) {
    let res = await this.request("auth/register", data, "post");
    return res.token;
  }

  // edit a user
  static async edit(data, userName) {
    let res = await this.request(`users/${userName}`, data, "patch");
    return res.user;
  }

  // apply for a job
  static async apply(username, id) {
    let res = await this.request(`users/${username}/jobs/${id}`, {}, "POST");
    return res;
  }
}

export default JoblyApi;
