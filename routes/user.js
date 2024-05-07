import express from 'express';
import {
  createUser,
  login,
  deleteUser,
  updateUser,
  getUserById,

} from '../controllers/auth.js';
import {
    branchCreate,
    branchDelete,
    branchGetById,
    branchUpdate
} from '../controllers/branch.js'
import { auth } from '../middlewares/auth.js';
import { goldRateCreate, goldRateDelete, goldRateGetById, goldRateUpdate } from '../controllers/goldrate.js';

const router = express.Router();

router.post('/create-user',auth, createUser);
router.post('/login', login);
router.get('/userbyid/:id', getUserById);
router.delete('/delete-user/:id', auth, deleteUser);
router.patch('/update-user/:id', updateUser);

router.post('/create-branch', branchCreate);
router.get('/get-branch/:id',auth, branchGetById);
router.put('/update-branch/:id',auth, branchUpdate);
router.delete('/delete-branch/:id',auth, branchDelete);

router.post('/create-goldrate',auth, goldRateCreate);
router.get('/goldrate/:id',auth, goldRateGetById);
router.put('/update-goldrate/:id',auth, goldRateUpdate);
router.delete('/delete-goldrate/:id',auth, goldRateDelete);



export default router;
