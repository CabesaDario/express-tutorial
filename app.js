const routes = require('./routes')

var bodyParser = require("body-parser");

const express = require("express");
const app = express();

const port = 3000;

app.set('view engine', 'ejs'); // le estamos diciendo a express "vamos
//a usar un motor de plantillas que se llama ejs"
app.set('views',__dirname + '/views'); //esas plantillas se encuentran en views

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public")); //esto es middleware(funcion que se ejecuta antes de que se establezcan
//nuestras rutas)
 

app.use('/', routes)


app.use((req, res, next) => {
    res.status(404).render("404", {
        titulo : "404",
        descripcion :  "La página no existe"
    })
});

app.listen(port, () => {
    console.log('servidor a su servicio en el puerto',port);
});