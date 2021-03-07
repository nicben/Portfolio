const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const app = express();
const mysql = require("mysql");

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'portfolio'
})

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}))

//http://localhost:3001/api/get
app.get('/api/get', (req, res) => {
    const sqlSelect =
        "SELECT * FROM project";
    db.query(sqlSelect, (err, result) => {
        res.send(result)
    })
})

app.post("/api/insert", (req, res) => {
    const name = req.body.name
    const description = req.body.description

    const sqlInsert =
        "INSERT INTO project (name, description) VALUES (?,?)";
    db.query(sqlInsert, [name, description], (err, result) => {
        console.log(err)
    })
});

app.put("/api/update/", (req, res) => {
    const description = req.body.description
    const id = req.body.id
    const sqlUpdate =
        "UPDATE project SET description = ? WHERE id = ?";
    db.query(sqlUpdate, [description, id], (err, result) => {
        console.log(description)
    })
});

app.delete("/api/delete/:id", (req, res) => {
    const id = req.params.id
    const sqlDelete =
        "DELETE FROM project WHERE id = ?";
    db.query(sqlDelete, id, (err, result) => {
       console.log(id)
    })
});


app.listen(process.env.PORT || PORT, () => {
    console.log('Server running on port ${PORT}');
});
