module.exports = (sequelize, Sequelize) => {
    const Classification = sequelize.define("classification", {
        class_id: {
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
        spec_class: {
            type: Sequelize.STRING
        },
        gen_class: {
            type: Sequelize.STRING
        },
        xray_class: {
            type: Sequelize.STRING
        },
        best_class: {
            type: Sequelize.STRING
        },
        image_class: {
            type: Sequelize.STRING
        },
        SED_class: {
            type: Sequelize.STRING
        }
    }, {
        timestamps: false
    });

    return Classification;
}; 