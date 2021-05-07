var express = require("express");
var app = express();
var pool = require("./db");

app.use(express.json());

//Routes//

//home

app.get("/", (req,res) => res.send("hello"));

//listing all the existing users
app.get("/users", async(req,res) => {
    try {
        const allUsers = await pool.query("SELECT id, firstname, lastname, emailid, phonenumber FROM users");
        res.json(allUsers.rows);
    } catch (err) {
        console.log(err.message);
    }
});

//read a pparticular user's detail whose id is specified
app.get("/users/:id", async(req, res) => {
    const id = req.params.id;
    try {
        const userDetail = await pool.query("SELECT id, firstname, lastname, emailid, phonenumber FROM users WHERE id = $1",
        [id]);
        res.json(userDetail.rows[0]);
    } catch (err) {
        console.log(err.message);
    }
})

//creating a new user
app.post("/users", async(req,res) => {
    try {
        const firstName = req.body.firstname;
        const lastName = req.body.lastname;
        const dateOfBirth = req.body.dob;
        const phoneNumber = parseInt(req.body.phonenumber);
        const password = req.body.password;
        const emailId = req.body.emailid;
        const newUser = await pool.query(
            "INSERT INTO users(firstname, lastname, dob, phonenumber, password, emailid) VALUES (($1), ($2), ($3), ($4), ($5), ($6)) RETURNING *",
            [firstName, lastName, dateOfBirth, phoneNumber, password, emailId]
        );
            res.json(newUser.rows[0]);
    } catch (err) {
        console.log(err.message);
    }
})


//update email of an existing user
app.put("/users/:id", async(req, res) => {
    const id = req.params.id;
    const emailId = req.body.emailid;
    try {
        const updateUser = await pool.query(
            "UPDATE users SET emailid = ($1) WHERE id = ($2)",
            [emailId, id]
        );
        res.json("Email updated successfully");
    } catch (err) {
        console.log(err.message);
    }
});

//delete a particular user
app.delete("/users/:id", async(req,res) => {
    const id = req.params.id;
    try {
        const deleteUser = await pool.query(
            "DELETE FROM users WHERE id = ($1)",
            [id]
        );
        res.json("User deleted successfully");
    } catch (err) {
        console.log(err.message);
    }
})

//creating a new organization
app.post("/organization_type", async(req, res) => {
    try {
        // console.log(req.body);
        const organizationType = req.body.typename;
        // console.log(organizationType);
        const newOrganizationType = await pool.query(
          "INSERT INTO organization_type(typename) VALUES ($1) RETURNING *", 
        [organizationType]
        );
        res.json(newOrganizationType.rows);
    } catch (err) {
        console.log(err.message);
    }
});



app.listen(3000, ()=> console.log("Server has started........"));