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


  class Poll extends Sequelize.Model {}
  Poll.init(
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    
    name: Sequelize.STRING,
    description: Sequelize.STRING,
    month: Sequelize.INTEGER,
    isOpen: Sequelize.BOOLEAN,
    
   
  },
  { sequelize, modelName: "poll" }
);

  class Vote extends Sequelize.Model {}
  Vote.init(
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },

    date: Sequelize.DATE,  
    voterName: Sequelize.STRING,
    
  
  },
  { sequelize, modelName: "vote" }
);

class User extends Sequelize.Model {}
User.init(
{
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  

  name:{ 
    type:Sequelize.STRING,
    unique:true,
    allowNull:false
  },
  password: Sequelize.STRING,
  
 
},
{ sequelize, modelName: "user" }
);

User.hasMany(Poll);
Poll.hasMany(Vote);

User.create({name:'jonatan',password:'123456'})

sequelize.sync();


app.post("/getUserPolls", function(req, res) {
  sequelize
    .query(
      "SELECT id, name, description, month, isOpen FROM polls WHERE (userId = '" +
        req.body.userId+"' )",
      { type: sequelize.QueryTypes.SELECT }
    )
    .then(polls => {
        res.send(polls);
    });
});



app.post("/getNumberOfUsersWithName",function(req,res){

  User.findAndCountAll({
    where:{
      name:req.body.name
    }
  })
  .then(result=>{
    console.log(result.count)
    res.send(result)
  })

});

app.post("/insertPoll", function(req, res) {
  sequelize
    .query(
      "INSERT INTO polls(nombrencuesta,descripcion,mes,abierto,fk_idusuario) VALUES(nombrencuesta = '" +req.body.nombrencuesta+"'+fechainicio = '" +req.body.descripcion+"'+mes = '" +req.body.mes+"'+abierto = '" +req.body.abierto+"')",
      { type: sequelize.QueryTypes.SELECT }
    )
    .then(encuestainsert => {
        res.send(encuestainsert);
    });
});

app.post("/insertUser", function(req, res) {
  User.create(req.body)
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



