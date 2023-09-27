import { Router } from 'express';
import { verifyUser } from '../middlewares/auth.js';
import { validateData } from '../middlewares/data-validator.js';
import {
  userRegistrationSchema,
  userAuthenticationSchema,
  userUpdateSchema,
} from '../models/user.model.js';
import {
  registerUser,
  authUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
} from '../controllers/user.controller.js';

const router = Router();

router
  .route('/register')
  .post(validateData(userRegistrationSchema), registerUser);

router.route('/auth').post(validateData(userAuthenticationSchema), authUser);

router.route('/logout').all(verifyUser()).post(logoutUser);

router
  .route('/profile')
  .all(verifyUser())
  .get(getUserProfile)
  .patch(validateData(userUpdateSchema), updateUserProfile);

export default router;
