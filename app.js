const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv");
const mysqlConnection = require("./database");
const port = 3000;

// Your github page origin has to be written EXACTLY like this! https://behu-kea.github.io
const URL_FOR_FRONTEND = "YOUR_GITHUB_PAGE_ORIGIN_HERE";

app.use(express.json()); //Used to parse JSON bodies
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies

// If the application is running localhost allow all requests,
// otherwise add cors for specific website
// Remember to add the NODE_ENV="prod" on server!
const cors_url = process.env.NODE_ENV === "prod" ? URL_FOR_FRONTEND : "*";
app.use(
    cors({
        origin: cors_url
    })
);

app.get("/", (request, response) => {
    response.send("Node Express Users API! Read users from at http://localhost:3000/users"); // det her vises hvis du kører http://localhost:3000 i browser. Vi bruger den som sådan ikke til noget :)
});

// get all users from database
app.get("/users", (request, response) => {
    const query = "SELECT * FROM users;";
    mysqlConnection.query(query, (error, results, fields) => {
        if (error) {
            console.log(error);
        } else {
            response.json(results);
        }
    });
});

// get one user from database by given id
app.get("/users/:id", (request, response) => {
    const id = request.params.id;
    const query = `SELECT * FROM users WHERE id=${id};`;

    mysqlConnection.query(query, (error, results, fields) => {
        console.log(results);
        if (error) {
            console.log(error);
        } else {
            response.json(results[0]);
        }
    });
});

// create user
app.post("/users", (request, response) => {
    const newUser = request.body;
    const query = `INSERT INTO users(name, mail, title, image) values("${newUser.name}", "${newUser.mail}", "${newUser.title}", "${newUser.image}");`;

    mysqlConnection.query(query, (error, results, fields) => {
        if (error) {
            console.log(error);
        } else {
            response.json(results);
        }
    });
});

// UPDATE: update existing user
app.put("/users/:id", (request, response) => {
    const id = request.params.id;
    const user = request.body;
    const query = `UPDATE users SET name="${user.name}", mail="${user.mail}", title="${user.title}", image="${user.image}" WHERE id=${id};`;

    mysqlConnection.query(query, (error, results, fields) => {
        if (error) {
            console.log(error);
        } else {
            response.json(results);
        }
    });
});

// DELETE: delete user
app.delete("/users/:id", (request, response) => {
    const id = request.params.id;
    const query = `DELETE FROM users WHERE id=${id};`;

    mysqlConnection.query(query, (error, results, fields) => {
        if (error) {
            console.log(error);
        } else {
            response.json(results);
        }
    });
});

app.listen(port, () => {
    console.log(`Node.js REST API listening at http://localhost:${port}`);
});
