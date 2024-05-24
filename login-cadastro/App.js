const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
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

app.get("/cadastro", (req, res)=>{
    res.sendFile(__dirname + '/cadastro.html')
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


app.post("/cadastro", (req, res)=>{
    const username = req.body.usuario
    const password = req.body.senha
    const confpassword = req.body.confsenha

    if (password === confpassword){
        db.query('insert into user (username, password) values (?,?);', [username, password], (error, results)=>{ 
            if (error){
                console.log('Erro ao realizar o cadastro', error);
            }else {
                console.log('Cadastro relizado com sucesso');
            }
        })
    } else {
        console.log('Senhas Divergentes')
    }
});

app.get("/cadastro", (req, res)=>{
    res.sendFile(__dirname + '/cadastro.html')
})

app.listen(port, ()=>{
    console.log(`Servidor rodando no endereço: http://localhost:${port}`)
})