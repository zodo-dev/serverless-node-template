require("./loadenv.js");
const { handler } = require("../dist");
const events = require("./event.json");
handler(events).then((data) => console.log({ data }));
