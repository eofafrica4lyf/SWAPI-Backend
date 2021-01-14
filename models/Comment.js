module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define(
        "comment",
        {
            id: {
                type: DataTypes.INTEGER(11),
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            comment: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {}
    )

    Comment.associate = function(models) {

    }
    return Comment;
}