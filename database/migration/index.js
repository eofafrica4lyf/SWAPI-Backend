require("dotenv").config();

const {
    sequelize,
    comment
} = require("../../models");

sequelize.authenticate()
.then(() => console.log("Connected to database"))
.catch((err) => console.log(err));
(async () => {
    try {
        await sequelize.sync({ alter: true })
        await comment.sync({ alter: true })
    } catch (error) {
        console.log(error);
    }
})()