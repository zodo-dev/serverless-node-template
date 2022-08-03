const { api } = require("./api");
const { ENDPOINT: endpoint } = process.env;

const handler = async (events = []) => {
  const results = await Promise.all(
    events.map(({ name }) => {
      return api(endpoint, name);
    })
  );
  return {
    statusCode: 200,
    body: JSON.stringify({ results }),
  };
};
exports.handler = handler;
module.exports = {
  handler,
};
