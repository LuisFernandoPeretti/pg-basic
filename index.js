const express = require("express");
const app = express();
const pool = require("./db");

app.use(express.json()) // -> req. body

//routes

// get all registers

app.get("/registers", async (req, res) => {
    try {
        const allRegisters = await pool.query("SELECT * FROM register")

        res.json(allRegisters.rows);
    } catch (err) {
        console.error(err.message)
    }
})

// get a registers

app.get("/registers/:email", async (req, res) => {
    const { email } = req.params;
    try {
        const register = await pool.query("SELECT * FROM register WHERE email = $1", [email]);
        res.json(register.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

// create a register

app.post("/registers", async (req, res) => {
    try {
        const { email, name, surname, cpf, birth_date } = req.body
        const newRegister = await pool.query(
            "INSERT INTO register ( email, name, surname, cpf, birth_date ) VALUES ( $1, $2, $3, $4, $5 ) RETURNING *",
            [ email, name, surname, cpf, birth_date ]
        );

        res.json(newRegister.rows[0]);
    } catch (err) {
        console.log(err.message)
    }
})

// update a register

app.put("/registers/:email", async (req, res) => {
    try {
        const { email } = req.params;
        const { name } = req.body;
        const { surname } = req.body;
        const { cpf } = req.body;
        const { birth_date } = req.body;
        const { created_at } = req.body;
        const { updated_at } = req.body;

        //console.log(email);
        //console.log(name);
        const updateRegister = await pool.query("UPDATE register SET name = $1, surname = $2, cpf = $3, birth_date = $4, created_at = $5, updated_at = $6 WHERE email = $7", [name, surname, cpf, birth_date, created_at, updated_at, email]);

        res.json("updated!");
    } catch (err) {
        console.error(err.message);
    }
})

// delete a register

app.delete("/registers/:email", async (req, res) => {
    try {
        const { email } = req.params;
        const deleteRegister = await pool.query("DELETE FROM register WHERE email = $1" , [email])
        res.json("Register was successfuuuly deleted!")
    } catch (err) {
        console.error(err.message)
    }
})

app.listen(5000, () => {
    console.log("SERVER IS LISTENING ON PORT 3000")
});