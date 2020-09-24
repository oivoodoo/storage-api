'use strict';

module.exports = (sequelize, DataTypes) => {
  const Data = sequelize.define(
    'Data',
    {
      encrypted_value: DataTypes.STRING,
      id: {
        type: DataTypes.STRING,
        primaryKey: true
      }
    },
    {}
  );

  Data.sync = async (attributes, id) => {
    const data = await Data.findOne({ where: { id: id } });
    if (data) {
      return data.update(attributes);
    } else {
      return Data.create(attributes);
    }
  };



  return Data;
};
