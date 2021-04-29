const express = require('express');
const cors = require("cors");
const mysql = require("mysql");
const router = express.Router()
const app = express();

const SELECT_ALL_SCORES_QUERY = "SELECT * FROM scoreboard"
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "test"
});

connection.connect(err => {
    if (err) {
        console.log(err);
    } else {
        console.log('Connected to the MySQL server');
    }
});
app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello!");
});
router.get("/Scores", (req, res) => {
    connection.query(SELECT_ALL_SCORES_QUERY, (err, results) => {
        if (err) {
            return res.send(err)
        } else {
            console.log(res);
            return res.json({
                data: results
            })
        }
    })
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/Add', (req, res) => {
    const { name, score } = req.body;
    console.log(req.query)
    const INSERT_NEW_SCORE = `INSERT INTO scoreboard (name, score) VALUES('${name}', ${score})`
    connection.query(INSERT_NEW_SCORE, (err, results) => {
        if (err) {
            return res.send(err)
        } else {
            return res.send("Successfully added Score")
        }
    })
})
app.put('/Score/delete', (req, res) => {
    const { id } = req.body;
    const DELETE_ROVER_QUERY = `DELETE FROM scoreboard WHERE id = ${id}`
    connection.query(DELETE_ROVER_QUERY, (err, results) => {
        if (err) {
            return res.send(err)
        } else {
            return res.send("Successfully deleted Score")
        }
    })
})

app.listen(4000, () => {
    console.log("rover server listening on port 4000")
});

app.use(router)
