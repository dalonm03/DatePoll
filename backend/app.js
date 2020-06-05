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
  
 
},
{ sequelize, modelName: "usuarios" }
);



sequelize.sync();

app.post("/getRespuesta", function(req, res) {
  sequelize
    .query(
      "SELECT idrespuesta FROM respuesta",
      { type: sequelize.QueryTypes.SELECT }
    )
    .then(respuesta => {
      res.send(respuesta);
    });
});


app.post("/getUsuarios", function(req, res) {
  sequelize
    .query(
      "SELECT idusuarios FROM usuarios",
      { type: sequelize.QueryTypes.SELECT }
    )
    .then(usuarios => {
      res.send(usuarios);
    });
});


app.post("/getEncuesta", function(req, res) {
  sequelize
    .query(
      "SELECT idencuesta FROM encuesta",
      { type: sequelize.QueryTypes.SELECT }
    )
    .then(encuesta => {
      res.send(encuesta);
    });
});