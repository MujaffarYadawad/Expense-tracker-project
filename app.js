const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const userRoutes = require("./routes/user");
const expenseRoutes = require("./routes/expense");

app.use(bodyParser.json({ extended: false }));
app.use(cors());

const sequelize = require("./util/database");
const Expense = require("./models/expense");
const User = require("./models/signup");

app.use("/user", userRoutes);
app.use("/expense", expenseRoutes);

Expense.belongsTo(User);
User.hasMany(Expense);

sequelize
  .sync()
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });

app.use((req, res, next) => {
  res.status(404).send("<h1>Page Not Found</h1>");
});
