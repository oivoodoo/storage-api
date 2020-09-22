'use strict';

module.exports = (sequelize, DataTypes) => {
  const Data = sequelize.define(
    'Data',
    {
      encrypted_value: DataTypes.STRING,
      id: DataTypes.STRING
    },
    {}
  );
  return Data;
};
