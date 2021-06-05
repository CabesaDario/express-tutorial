var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Trianasulo+95"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

const express = require("express");
const app = express();

const port = 3000;

app.set('view engine', 'ejs'); // le estamos diciendo a express "vamos
//a usar un motor de plantillas que se llama ejs"
app.set('views',__dirname + '/views'); //esas plantillas se encuentran en views

app.use(express.static(__dirname + "/public")); //esto es middleware(funcion que se ejecuta antes de que se establezcan
//nuestras rutas)

app.get('/', (req, res) => {
    res.render("index", {titulo : "mi titulo dinámico"}) //estos datos podrian venir de una base de datos, el objeto
});

app.get('/servicios', (req, res) => {
    res.render("servicios", {tituloServicios : "mi titulo dinámico de servicios"}) 
});

app.use((req, res, next) => {
    res.status(404).render("404", {
        titulo : "404",
        descripcion :  "Titulo del sitio web"
    })
});

app.listen(port, () => {
    console.log('servidor a su servicio en el puerto',port);
});