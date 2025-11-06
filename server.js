const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/message", (req, res) => {
    const { name, email, message } = req.body;
    const entry = `Name: ${name}\nEmail: ${email}\nMessage: ${message}\n---\n`;

    fs.appendFile(path.join(__dirname, "messages.txt"), entry, (err) => {
        if (err) return res.status(500).send("Error saving message.");
        res.send(`<h2>Thanks ${name}! Message saved.</h2><a href="/">Back</a>`);
    });
});

app.get("/all-messages", (req, res) => {
    const filePath = path.join(__dirname, "messages.txt");

    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) return res.send("<h3>No messages found yet!</h3>");
        const formatted = data.replace(/\n/g, "<br>");
        res.send(`<h2>All Messages</h2><div>${formatted}</div><br><a href="/">Back</a>`);
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
