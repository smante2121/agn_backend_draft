module.exports = (sequelize, Sequelize) => {
    const SourceAGN = sequelize.define("source_agn", {
        agn_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        RA: {
            type: Sequelize.DOUBLE,
            allowNull: false
        },
        DEC: {
            type: Sequelize.DOUBLE,
            allowNull: false
        }
    }, {
        timestamps: false
    });

    return SourceAGN;
}; 