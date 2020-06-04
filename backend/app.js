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
    nombrencuesta: Sequelize.STRING,
    fechainicio: Sequelize.DATE,
    fechafinal: Sequelize.DATE,
    descrpcion: Sequelize.STRING,
    mes: Sequelize.INTEGER,
    
   
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
  idusuariosa: {
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

app.post("/getContactos", function(req, res) {
  sequelize
    .query(
      "SELECT idrespuesta FROM contactos",
      { type: sequelize.QueryTypes.SELECT }
    )
    .then(contacts => {
      res.send(contacts);
    });
});