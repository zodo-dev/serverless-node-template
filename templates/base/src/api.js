const axios = require("axios");

const api = async (endpoint, name) =>
  axios({
    method: "get",
    url: `${endpoint}/?name=${name}`,
  }).then(({ data }) => data);
module.exports = { api };
