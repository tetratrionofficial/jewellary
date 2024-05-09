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
import { createCustomer, customerLogin, deleteCustomer, getCustomerById, updateCustomer } from '../controllers/customer.js';
import { planCreate, planDelete, planGetById, planUpdate } from '../controllers/plan.js';


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

router.post('/create-customer', createCustomer);
router.post('/customer-login', customerLogin);
router.get('/customerbyid/:id', getCustomerById);
router.delete('/delete-customer/:id',  deleteCustomer);
router.patch('/update-customer/:id', updateCustomer);

router.post('/create-plan', planCreate);
router.get('/plan/:id', planGetById);
router.put('/update-plan/:id', planUpdate);
router.delete('/delete-plan/:id', planDelete);



export default router;
