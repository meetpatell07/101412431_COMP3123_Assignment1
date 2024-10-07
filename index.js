const express = requrie('express');
const SERVER_PORT = process.env.port || 3000;

const app = express();
app.use(express.json());

app.listen(SERVER_PORT, () => {
    console.log("The server is running is on port 3000")
})