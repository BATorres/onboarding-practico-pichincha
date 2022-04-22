const express = require("express");
const app = express();
const user = require("./routes/user");
const role = require("./routes/role");

app.use("/user", user);
app.use("/role", role);

app.listen(3000, () => {
  console.log("El servidor está inicializado en el puerto 3000");
});
