const axios = require("axios");

const baseURL = "https://swapi.dev"

const instance = axios.create({
    baseURL
})

module.exports = instance;