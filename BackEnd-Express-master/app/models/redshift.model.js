module.exports = (sequelize, Sequelize) => {
    const RedshiftMeasurement = sequelize.define("redshift_measurement", {
        redshift_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        agn_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'source_agns',
                key: 'agn_id'
            }
        },
        redshift_type: {
            type: Sequelize.STRING,
            allowNull: false
        },
        z_value: {
            type: Sequelize.DOUBLE,
            allowNull: false
        },
        z_error: {
            type: Sequelize.DOUBLE
        }
    }, {
        timestamps: false
    });

    return RedshiftMeasurement;
}; 