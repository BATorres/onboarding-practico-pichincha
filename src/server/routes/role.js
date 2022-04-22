const express = require("express");
const router = express.Router();
const LocalStorage = require("node-localstorage").LocalStorage;

const localStorage = new LocalStorage("./scratch");

let roles = [
  {
    id: 1,
    name: "Administrador",
  },
  {
    id: 2,
    name: "Gerente",
  },
  {
    id: 3,
    name: "Lider célula",
  },
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
    message: "Roles cargados correctamente",
    data: roles,
  };
  res.send(response);
});

router.get('/:roleId', function (req, res) {
  const roleIndex = roles.findIndex((role) => {
    return role?.id === +req.params.roleId;
  });

  if (roleIndex === -1) {
    response = {
      error: true,
      code: 502,
      message: "No existe el rol",
    };
    res.status(502).send(response);
  } else {
    response = {
      error: false,
      code: 200,
      message: "Rol encontrado correctamente",
      data: roles[roleIndex],
    };
    res.send(response);
  }
});

router.post("/store", function (req, res) {
  if (!req.body.name) {
    response = {
      error: true,
      code: 502,
      message: "El campo nombre es requerido",
    };
    res.status(502).send(response);
  } else {
    const lastRole = roles[roles.length - 1];
    req.body.id = lastRole?.id ? lastRole?.id + 1 : 1;

    roles.push(req.body);
    // localStorage.setItem("roles", JSON.stringify(roles));

    response = {
      error: false,
      code: 200,
      message: "Rol creado correctamente",
      data: roles,
    };
    res.send(response);
  }
});

router.put('/update', function (req, res) {
  const roleIndex = roles.findIndex((role) => {
    return role?.id === +req.body.id;
  });

  if (roleIndex === -1) {
    response = {
      error: true,
      code: 502,
      message: "No existe el rol",
    };
    res.status(502).send(response);
  } else {
    roles[roleIndex] = req.body;

    response = {
      error: false,
      code: 200,
      message: "Rol editado correctamente",
      data: req.body,
    };
    res.send(response);
  }
 });

 router.delete('/delete/:roleId', function (req, res) {
  const index = roles.findIndex((role) => role.id === +req.params.roleId);

  if (index === -1) {
    response = {
      error: true,
      code: 502,
      message: "No existe el rol",
    };
    res.status(502).send(response);
  } else {
    roles.splice(index, 1);

    response = {
      error: false,
      code: 200,
      message: "Rol eliminado correctamente",
      data: roles,
    };
    res.send(response);
  }
 });

module.exports = router;
