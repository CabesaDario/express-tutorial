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
    res.render("index"); //estos datos podrian venir de una base de datos, el objeto TITULO QUIERO DECIR
});
router.get('/get_todos', (req, res) => {
    const queryString = "SELECT * FROM tasks"
    con.query(queryString, (err, rows, fields) => {
      if (err) {
        console.log("Failed to query at /get_todo: " + err)
      }
      console.log("Getting data from database at /get_todos")
      res.json(rows)
    })
  })
  
router.post('/complete_todo/:id/:complete', (req, res) => {
    const todo_id = req.params.id
    const complete = req.params.complete
    let newState = 1;
    if(complete == 1){
      newState = 0
    }
    const queryString = `UPDATE tasks SET complete = '${newState}' WHERE id = ?`
    con.query(queryString, [todo_id], (err, rows, fields) => {
      if (err) {
        console.log("Failed to query at /complete_todo/: " + todo_id + " " +
        err)
      }
      console.log("@/complete_todo/ Completing todo with id " + todo_id)
      res.redirect('/')
    })
}) 
router.post('/edit_todo/:id/:newtext', (req, res) => {
  const todo_id = req.params.id
  const newText = req.params.newtext
  const queryString = `UPDATE tasks SET text = '${newText}' WHERE id = ?`
  con.query(queryString, [todo_id], (err, rows, fields) => {
    if (err) {
      console.log("La query falló en /edit_todo/: " + todo_id + " " +
      err)
    }
    console.log("@/edit_todo/ Se ha completado la edición del todo con id " + todo_id)
    res.redirect('/')
  })
})   
router.post('/delete_todo/:id', (req, res) => {
  const todo_id = req.params.id
  const queryString = `DELETE FROM tasks WHERE id = '${todo_id}'`
  con.query(queryString, (err) => {
    if (err) {
      console.log("Fallo al intentar borrar la tarea con id " + todo_id + " " +
      err)
    }
    console.log("@/complete_todo/ Tarea borrada con id " + todo_id)
    res.redirect('/')
  })
}) 
router.post('/add_todo', (req, res) => {
    const todo = req.body.add_todo_input
    const values = `("${todo}", 0)`;
    const queryString = `INSERT INTO tasks (text, complete) VALUES ${values}`
    con.query(queryString, (err, result) => {
      if (err) {
        throw err;
      }
      console.log("@/add_todo todo " + todo + " added.")
      res.redirect('/')
    })
})

router.get('/servicios', (req, res) => {
    res.render("servicios", {tituloServicios : "mi titulo dinámico de servicios"}) 
});



module.exports = router