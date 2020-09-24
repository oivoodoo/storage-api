import models from '../../../database/models';
import { encrypt, decrypt } from './encrypt';
import { validationResult } from 'express-validator';
import Sequelize from 'sequelize';

const $like = Sequelize.Op.like;

const Data = models.Data;

// nothing to return
const nope = (res, status = 200) => {
  return res.status(status).json([]);
};

const error = (res, err) => {
  if (process.env.NODE_ENV != 'production') {
    console.log(err);
  }

  if (err instanceof Array) {
    let errors = err.map((o) => o.message);
    return res.status(500).json({ errors: errors });
  } else {
    let errors = [err.message]
    return res.status(500).json({ errors: errors });
  }
};

export const get = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return error(res, errors.array());
    }

    const id = req.params.id.replace('*', '%');
    const attributes = req.body;

    const datas = await Data.findAll({
      where: {
        id: { [$like]: id },
      }
    });

    if (datas.length > 0) {
      const result = datas.map((data) => {
        return decrypt(attributes.decryption_key, data.encrypted_value);
      });

      return res.status(200).json(result);
    }

    return nope(res);
  } catch (err) {
    return nope(res);
  }
};

export const set = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return error(res, errors.array());
    }

    const id = req.params.id;
    const attributes = req.body;

    const encryptedValue = encrypt(attributes.encryption_key, attributes.value);

    await Data.sync({ id: id, encrypted_value: encryptedValue }, id);

    return nope(res, 201);
  } catch (err) {
    return error(res, err);
  }
};
