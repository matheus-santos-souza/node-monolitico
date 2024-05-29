import { DataTypes, Sequelize } from 'sequelize';
import { MigrationFn } from 'umzug';

export const up: MigrationFn<Sequelize> = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().createTable('products', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    purchasePrice: {
      type: DataTypes.NUMBER,
      allowNull: true
    },
    salesPrice: {
      type: DataTypes.NUMBER,
      allowNull: true,
      field: "sales_price"
    },
    stock: {
        type: DataTypes.NUMBER,
        allowNull: true
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "created_at"
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "updated_at"
    },

  })
};

export const down: MigrationFn<Sequelize> = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().dropTable('products')
} 
