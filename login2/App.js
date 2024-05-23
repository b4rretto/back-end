const express = require('express');
const app = express();
const fs = require('fs');
var path = require('path');
const bodyParser = require('body-parser')
const port = 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index')
});


app.post('/login', (req, res) => {

    //console.log(req.body)
    const username = req.body.usuario
    const password = req.body.senha

    fs.readFile('usuarios.json', 'utf8', (error, data) => {
        if (error) {
            console.log('Erro ao Encontrar o Usuário', error)
            res.status(500).send('Erro ao Encontrar o Usuário')
            return
        }
        const usuarios = JSON.parse(data).usuarios

        const login = usuarios.filter(e => (e.usuario === username));

        if (login.length > 0) {
            console.log(login)
            if (login[0].senha === parseInt(password)) {
                res.status(500).send("Login bem sucedido")
            } else {
                res.status(500).send("Senha Incorreta")
            }
        } else {
            res.status(500).send("Usuário não existe")
        }
    })
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});