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
    month: Sequelize.STRING,
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
    type:Sequelize.STRING(30),
    unique:true,
    allowNull:false
  },
  password: Sequelize.STRING,
  
 
},
{ sequelize, modelName: "user" }
);

User.hasMany(Poll);
Poll.hasMany(Vote);


sequelize.sync();


app.post("/getUserPolls", function(req, res) {
  console.log(res.body)
  Poll.findAll({
    where:{
      userId:req.body.userId
    }
  })
  .then(result=>{
    res.send(result)
  })
  .catch(function(error){
    console.log(error)
  })
});



app.post("/getNumberOfUsersWithName",function(req,res){

  User.findAndCountAll({
    where:{
      name:req.body.name
    }
  })
  .then(result=>{
    res.send(result)
  })
  .catch(function(error){
          console.log(error)
  });

});

app.post("/insertPoll", function(req, res) {
  Poll.create(req.body)
  .then(function(poll){
    res.send({id:poll.id})
  });
});

app.post("/deletePoll",function(req,res){ //para borrar una poll primero habrá que borrar todos los votes asociados a esa poll

  Poll.destroy({
    where:{
      id:req.body.id
    }
  })

});

app.post("/insertUser", function(req, res) {
  User.create(req.body)
});

app.post("/submitVote", function(req, res) {
  Vote.create(req.body);
});

app.post("/updatePoll", function(req, res) {
  console.log(req.body);
  Poll.update({ name: req.body.name, description: req.body.description,  month:req.body.month}, {
    where: {
      id: req.body.id
    }
  });
});


app.post("/login", function(req, res) {
  User.findAll({
    where:{
      name:req.body.name,
      password:req.body.password
    }
  })
  .then(result=>{
    res.send(result)
  })
  .catch(function(error){
          
    console.log(error)
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



