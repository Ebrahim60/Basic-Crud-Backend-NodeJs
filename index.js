const app = require('./app');
const dataBaseConnection = require('./Config/DB');
require('dotenv').config();

const port = process.env.PORT || 3000;
dataBaseConnection();

app.listen(port, () => {
    console.log(`server is running at http://localhost:${port}`);
});