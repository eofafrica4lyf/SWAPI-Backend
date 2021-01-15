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
            movieId: {
                type: DataTypes.INTEGER(11),
                allowNull: false,
            },
            comment: {
                type: DataTypes.STRING,
                allowNull: false
            },
            publicIp: {
                type: DataTypes.STRING,
                allowNull: false
            },
            utc: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: new Date().toUTCString()
            }
        },
        {}
    )

    Comment.associate = function(models) {

    }
    return Comment;
}