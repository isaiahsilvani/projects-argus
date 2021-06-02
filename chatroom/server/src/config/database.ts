const mongoose = require("mongoose");
const db = mongoose.connection;

mongoose.connect("mongodb+srv://database-admin:crapsoda@clustor.80vj0.mongodb.net/Messages?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

db.on("connected", () => {
  console.log(
    `Mongoose connected to MongoDB ${db.name} on ${db.host}:${db.port}.`
  );
});

module.exports = mongoose;