const { api } = require("./api");
const { ENDPOINT: endpoint } = process.env;

const bodyAsObject = (body) => {
  if (typeof body === "string") {
    return JSON.parse(body);
  }
  return body;
};

exports.handler = async ({ body, ...event }) => {
  const events = bodyAsObject(body);
  console.log({ events, event });
  if (!events?.length) {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Input error." }),
    };
  }
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
