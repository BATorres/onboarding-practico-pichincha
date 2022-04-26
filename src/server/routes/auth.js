var express = require("express");
var router = express.Router();

let users = require("../data/users");

let response = {
  error: false,
  code: 200,
  message: "",
};

router.post("/login", function (req, res) {
  if (!req.body.email || !req.body.password) {
    response = {
      error: true,
      code: 502,
      message: "Los campos correo y contraseña son requeridos",
    };
    res.status(502).send(response);
  } else {
    const userIndex = users.findIndex((user) => {
      return (
        user?.email === req.body.email && user?.password === req.body.password
      );
    });

    if (userIndex === -1) {
      response = {
        error: true,
        code: 502,
        message: "El correo o contraseña son incorrectos",
      };
      res.status(502).send(response);
    } else {
      const loggedUser = {
        id: users[userIndex].id,
        name: users[userIndex].name,
        email: users[userIndex].email,
        role: users[userIndex].role,
      };

      response = {
        error: false,
        code: 200,
        message: "Usuario editado correctamente",
        data: loggedUser,
      };
      res.send(response);
    }
  }
});

module.exports = router;
