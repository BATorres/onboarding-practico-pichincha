const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

const user = require("./routes/user");
const role = require("./routes/role");

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/user", user);
app.use("/role", role);

app.listen(3000, () => {
  console.log("El servidor está inicializado en el puerto 3000");
});
