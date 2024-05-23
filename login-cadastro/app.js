const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'gabriel',
    password: 'Gab@2018',
    database: 'login'
});

db.connect((error)=>{
    if (error){
        console.log("Erro ao conectar o Banco de Dados")
    }else {
        console.log("conectado ao MYSQL");
    }
});

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res)=>{
    res.sendFile(__dirname + '/login.html')
})

app.post("/login", (req, res)=>{
    const username = req.body.usuario
    const password = req.body.senha

    db.query('SELECT password FROM user Where username = ?', [username], (error,results)=>{
        if (results.length > 0){
            const passwordBD = results[0].password;
                if (passwordBD === password){
                    console.log('Entrou')
                }else{
                    console.log('Senha Incorreta')
                }
        
        }else{
            console.log('Usuário não Cadrastado!')
        }
    })
})



app.listen(port, ()=>{
    console.log(`Servidor rodando no endereço: http://localhost:${port}`)
})