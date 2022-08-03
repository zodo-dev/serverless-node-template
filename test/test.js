require("./loadenv.js");
const { handler } = require("../dist/index");
const events = require("./event.json");
handler(events).then((data) => console.log({ data }));
