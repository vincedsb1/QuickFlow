require("dotenv").config();
const app = require("./src/app");

app.listen(process.env.APP_PORT, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    // eslint-disable-next-line no-restricted-syntax
    console.log(`Server is listening on ${process.env.APP_PORT}`);
  }
});
