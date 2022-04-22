var express = require('express');
var router = express.Router();

let users = [
  {
    id: 1,
    name: 'Usuario 1',
    email: 'usuario1@gmail.com',
    role: 'Administrador',
  },
  {
    id: 2,
    name: 'Usuario 2',
    email: 'usuario2@gmail.com',
    role: 'Administrador',
  }
];

let response = {
  error: false,
  code: 200,
  message: "",
};

router.get("/", function (req, res) {
  response = {
    error: false,
    code: 200,
    message: "Usuarios cargados correctamente",
    data: users,
  };
  res.send(response);
});

router.get('/:userId', function (req, res) {
  const userIndex = users.findIndex((user) => {
    return user?.id === +req.params.userId;
  });

  if (userIndex === -1) {
    response = {
      error: true,
      code: 502,
      message: "No existe el usuario",
    };
    res.status(502).send(response);
  } else {
    response = {
      error: false,
      code: 200,
      message: "Usuario encontrado correctamente",
      data: users[userIndex],
    };
    res.send(response);
  }
});

router.post("/store", function (req, res) {
  if (!req.body.name || !req.body.email || !req.body.role) {
    response = {
      error: true,
      code: 502,
      message: "Los campos nombre, correo y rol son requeridos",
    };
    res.status(502).send(response);
  } else {
    const lastUser = users[users.length - 1];
    req.body.id = lastUser?.id ? lastUser?.id + 1 : 1;

    users.push(req.body);

    response = {
      error: false,
      code: 200,
      message: "Usuario creado correctamente",
      data: users,
    };
    res.send(response);
  }
});

router.put('/update', function (req, res) {
  const userIndex = users.findIndex((user) => {
    return user?.id === +req.body.id;
  });

  if (userIndex === -1) {
    response = {
      error: true,
      code: 502,
      message: "No existe el usuario",
    };
    res.status(502).send(response);
  } else {
    users[userIndex] = req.body;

    response = {
      error: false,
      code: 200,
      message: "Usuario editado correctamente",
      data: req.body,
    };
    res.send(response);
  }
 });

 router.delete('/delete/:userId', function (req, res) {
  const index = users.findIndex((user) => user.id === +req.params.userId);

  if (index === -1) {
    response = {
      error: true,
      code: 502,
      message: "No existe el usuario",
    };
    res.status(502).send(response);
  } else {
    users.splice(index, 1);

    response = {
      error: false,
      code: 200,
      message: "Usuario eliminado correctamente",
      data: users,
    };
    res.send(response);
  }
 });

module.exports = router;