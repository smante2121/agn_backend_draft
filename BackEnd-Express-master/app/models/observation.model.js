module.exports = (sequelize, Sequelize) => {
    const Observation = sequelize.define("observation", {
        obs_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        date: {
            type: Sequelize.DATE
        },
        instrument: {
            type: Sequelize.STRING
        },
        reference_catalog: {
            type: Sequelize.STRING
        }
    }, {
        timestamps: false
    });

    return Observation;
}; 