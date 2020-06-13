const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;
const Sequelize = require("sequelize");
var cors = require("cors");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const sequelize = new Sequelize("datepoll", "root", "", {
  host: "localhost",
  dialect: "mysql",
  define: {
    timestamps: false
  }
});
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });


  class encuesta extends Sequelize.Model {}
  encuesta.init(
  {
    idencuesta: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },

    fk_idusuario: {
      type: Sequelize.INTEGER,
      references: {
        model: 'usuarios',
        key: 'idusuario'
      }
    },
    
    nombrencuesta: Sequelize.STRING,
    fk_idusuario: Sequelize.INTEGER,
    fechainicio: Sequelize.DATE,
    fechafinal: Sequelize.DATE,
    descrpcion: Sequelize.STRING,
    mes: Sequelize.INTEGER,
    abierto: Sequelize.BOOLEAN,
    
   
  },
  { sequelize, modelName: "encuesta" }
);

  class respuesta extends Sequelize.Model {}
  respuesta.init(
  {
    idrespuesta: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    fecharespuesta: Sequelize.DATE,  
    nombre: Sequelize.STRING,
    
  
  },
  { sequelize, modelName: "respuesta" }
);

class usuarios extends Sequelize.Model {}
usuarios.init(
{
  idusuarios: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  

  nombre: Sequelize.STRING,
  apellido1: Sequelize.STRING,
  apellido2: Sequelize.STRING,
  password: Sequelize.STRING,
  
 
},
{ sequelize, modelName: "usuarios" }
);



sequelize.sync();


app.post("/getencuestasusuario", function(req, res) {
  sequelize
    .query(
      "SELECT idencuesta, nombrencuesta, descripcion, mes, abierto FROM encuesta WHERE (fk_idusuario = '" +
        req.body.fk_idusuario+"' )",
      { type: sequelize.QueryTypes.SELECT }
    )
    .then(encuesta => {
        res.send(encuesta);
    });
});



app.post("/insertarencuesta", function(req, res) {
  sequelize
    .query(
      "INSERT INTO encuesta(nombrencuesta,descripcion,mes,abierto,fk_idusuario) VALUES(nombrencuesta = '" +req.body.nombrencuesta+"'+fechainicio = '" +req.body.descripcion+"'+mes = '" +req.body.mes+"'+abierto = '" +req.body.abierto+"')",
      { type: sequelize.QueryTypes.SELECT }
    )
    .then(encuestainsert => {
        res.send(encuestainsert);
    });
});

app.post("/insertusuario", function(req, res) {
  sequelize
    .query(
      "INSERT INTO usuarios(nombre,apellido1,apellido2) VALUES(nombre = '" +req.body.nombre+"'+apellido1 = '" +req.body.apellido1+"'+apellido2 = '" +req.body.apellido2+"')",
      { type: sequelize.QueryTypes.SELECT }
    )
    .then(usuarioinsert => {
        res.send(usuarioinsert);
    });
});

app.post("/insertrespuesta", function(req, res) {
  sequelize
    .query(
      "INSERT INTO respuesta(nombre,fecharespuesta) VALUES(nombre = '" +req.body.nombre+"'+fecharespuesta = '" +req.body.fecharespuesta+"')",
      { type: sequelize.QueryTypes.SELECT }
    )
    .then(respuestainsert => {
        res.send(respuestainsert);
    });
});

app.post("/modificarencuesta", function(req, res) {
  sequelize
    .query(
      "UPDATE encuesta SET nombre = '" +req.body.nombre+"'+descripcion = '" +req.body.descripcion+"'+mes = '" +req.body.mes+"' WHERE (fk_idusuario = '" +
      req.body.fk_idusuario+
      "' )" ,
      { type: sequelize.QueryTypes.SELECT }
    )
    .then(encuestamodif => {
        res.send(encuestamodif);
    });
});


app.post("/login", function(req, res) {
  console.log('Login de usuario')
  sequelize
    .query(
      "SELECT idusuario,nombre FROM usuarios WHERE (nombre = '" +
        req.body.nombre +
        "' AND password = '" +
        req.body.password +
        "' )",
      { type: sequelize.QueryTypes.SELECT }
    )
    .then(users => {
      if (users.length != 0) {
        console.log('Encuentra')
        res.json(users);
      } else {
        res.send({ login: false });
      }
    });
});


app.post("/modificabierto", function(req, res) {
  sequelize
    .query(
      "UPDATE encuesta SET abierto = '" +req.body.abierto+"')" ,
      { type: sequelize.QueryTypes.SELECT }
    )
    .then(abiertomodif => {
        res.send(abiertomodif);
    });
});

app.listen(3000,function(){
  console.log('Listening on port 3000')
})



