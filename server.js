const express = require ('express');

const app = express();

const PORT = 3000;

app.use(express.static('frontend/dist'));

app.listen(PORT, () => console.log(`Server started on ${PORT} port`));
