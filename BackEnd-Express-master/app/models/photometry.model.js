module.exports = (sequelize, Sequelize) => {
    const Photometry = sequelize.define("photometry", {
        phot_id: {
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
        band_label: {
            type: Sequelize.STRING,
            allowNull: false
        },
        filter_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        mag_value: {
            type: Sequelize.DOUBLE,
            allowNull: false
        },
        mag_error: {
            type: Sequelize.DOUBLE
        },
        extinction: {
            type: Sequelize.DOUBLE
        }
    }, {
        timestamps: false
    });

    return Photometry;
}; 