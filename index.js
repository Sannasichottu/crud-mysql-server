const express = require ('express');
const app = express();
const bodyParser = require ('body-parser');
const mysql = require("mysql2");
const cors = require("cors");
require('dotenv').config();

const db = mysql.createConnection ({
    host: "localhost",
    user: "root",
    password: "Dhosanjay7",
    database: "crud_contact"
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get("/api/get",(req,res) => {
    const sqlGet = "SELECT * FROM contact_db";
    db.query(sqlGet, (error, result) => {
        res.send(result);
    });
});

app.post('/api/post',(req,res)=>{
    const {name, email, contact} = req.body;
    const sqlInsert = "INSERT INTO contact_db (name, email, contact) VALUES (?,?,?)";
    db.query(sqlInsert, [name,email,contact],(error, result) => {
        if(error) {
            console.log(error);
        }
    })
})

app.delete('/api/remove/:id',(req,res)=>{
    const {id} = req.params;
    const sqlRemove = "DELETE FROM contact_db WHERE id = ?";
    db.query(sqlRemove, id,(error, result) => {
        if(error) {
            console.log(error);
        }
    })
});

app.get("/api/get/:id",(req,res) => {
    const {id} = req.params;
    const sqlGet = "SELECT * FROM contact_db where id = ?";
    db.query(sqlGet, id ,(error, result) => {
        if(error) {
            console.log(error);
        }
        res.send(result);
    });
});

app.put("/api/update/:id",(req,res) => {
    const {id} = req.params;
    const {name,email,contact} = req.body;
    const sqlUpdate = "UPDATE contact_db SET name = ?, email =?, contact =? WHERE id = ?";
    db.query(sqlUpdate, [name, email,contact, id] ,(error, result) => {
        if(error) {
            console.log(error);
        }
        res.send(result);
    });
});

app.get("/", (req,res) => {
    /*const sqlInsert = "INSERT INTO contact_db (name, email,contact) VALUES ('chottu','chottu@gmail.com', 8765432109)";
    db.query(sqlInsert,(error,result) => {
        console.log("error", error);
        console.log("result", result);
        res.send("Hello Nanba");
    }) */
})

app.listen(process.env.Port,() => {
    console.log("Server running on pport 5000");
})


/*
Host = localhost
User = root
Password = Dhosanjay7
Database = crud_contact
*/