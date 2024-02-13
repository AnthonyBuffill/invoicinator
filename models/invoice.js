const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Invoice extends Model { }

Invoice.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        invoiceAmount: {
            type: DataTypes.DECIMAL (10,2),
            allowNull: false,
        },
        paidStatus: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        invoiceNumber: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        companyName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        companyStreetAddress: {
            type: DataTypes.STRING,
            allowNull: true
        },
        companyCityAddress: {
            type: DataTypes.STRING,
            allowNull: true
        },
        companyEmail: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        clientName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        clientStreetAddress: {
            type: DataTypes.STRING,
            allowNull: true
        },
        clientCityAddress: {
            type: DataTypes.STRING,
            allowNull: true
        },
        clientEmail: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        dateCreated: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        dueDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        },
        invoice_details: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
<<<<<<< HEAD
    invoiceAmount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    paidStatus: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    invoiceNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    companyName:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    companyStreetAddress: {
        type: DataTypes.STRING,
        allowNull:true
    },
    companyCityAddress: {
        type:DataTypes.STRING,
        allowNull:true
    },
    companyEmail: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
},
clientName:{
    type: DataTypes.STRING,
    allowNull: false,
},
clientStreetAddress: {
    type: DataTypes.STRING,
    allowNull:true
},
clientCityAddress: {
    type:DataTypes.STRING,
    allowNull:true
},
clientEmail: {
type: DataTypes.STRING,
allowNull: false,
unique: true,
validate: {
  isEmail: true,
},
},
    dateCreated: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    dueDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    invoice_details: {
        type: DataTypes.TEXT,
        allowNull:false,
    },
},
  
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'invoice',
  }
=======

    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'invoice',
    }
>>>>>>> 761dd8b490b8d88ec2e71f3e7dccc8a9e6900bd6
);

module.exports = Invoice;
