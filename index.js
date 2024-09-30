const express = require("express");
const app = express();
const { typeError } = require('./middlewares/errors')
const cors = require("cors");
const swaggerUI = require('swagger-ui-express')
const docs = require('./docs/index')

const { dbConnection } = require("./config/config");
const PORT = 3000;

dbConnection();

app.use(cors());

app.use(express.json());

app.use("/users", require("./routes/users.js"));
app.use("/posts", require("./routes/posts.js"));
app.use("/comments", require("./routes/comments.js"));

app.use(typeError)

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(docs))

app.listen(PORT, () => console.log(`server started ok at port ${PORT}`));
