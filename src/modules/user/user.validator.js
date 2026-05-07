import { body } from 'express-validator';

export const validateRegister = [
  body('name').notEmpty(),
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
];