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
    res.send("Estas de servisios");
});

app.use((req, res, next) => {
    res.status(404).sendFile(__dirname + "/public/404.html")
});

app.listen(port, () => {
    console.log('servidor a su servicio en el puerto',port);
});