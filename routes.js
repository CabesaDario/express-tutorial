const express = require('express')
const mysql = require('mysql')
const router = express.Router()

const pass = "Triangulo+95"

var task = ["sacar al perro", "daily diaria"];
var complete = ["ITV revisión"];

function getConnection() {
  return mysql.createConnection({
      host: "localhost",
      port: "3306",
      user: "root",
      password: pass,
      database: "todoapp"
  })
}

const con = getConnection()

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
}); 
router.get('/', (req, res) => {
    res.render("index", { task: task, complete: complete}); //estos datos podrian venir de una base de datos, el objeto TITULO QUIERO DECIR
});

router.get('/servicios', (req, res) => {
    res.render("servicios", {tituloServicios : "mi titulo dinámico de servicios"}) 
});
router.post('/addtask', function (req, res) {
    var newTask = req.body.newtask;
    if(newTask.length > 0){
        task.push(newTask);
        res.redirect("/");
    }
});
router.post("/removetask", function(req, res) {
    var completeTask = req.body.check;

    if (typeof completeTask === "string") {
        complete.push(completeTask);
        task.splice(task.indexOf(completeTask), 1);
    }else if (typeof completeTask === "object") {
        for (var i = 0; i < completeTask.length; i++) {     
            complete.push(completeTask[i]);
            task.splice(task.indexOf(completeTask[i]), 1);
        }
    }
    res.redirect("/");
});

module.exports = router