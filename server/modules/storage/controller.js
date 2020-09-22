import models from '../../../database/models';
import { errorHandling } from '../utils/errorHandling';

export const get = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json(errorHandling(error.message));
  }
};

export const set = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({ error: errorHandling(error.message) });
  }
};
