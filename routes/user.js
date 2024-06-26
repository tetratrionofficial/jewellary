import express from 'express';
import {
  createUser,
  login,
  deleteUser,
  updateUser,
  getUserById,
  getAllUsers,
  updateUserProfile,
  updateUserPassword,
  validateEmail,
  validateMobile,
  updatePassword,

} from '../controllers/auth.js';
import {
    branchCreate,
    branchDelete,
    branchGetById,
    branchUpdate,
    getAllBranches,
    validateEmailBranch,
    validateMobileBranch
} from '../controllers/branch.js'
import { auth } from '../middlewares/auth.js';
import { getAllGoldRates, getHistoricalGoldRates, goldRateCreate, goldRateDelete, goldRateGetById, goldRateUpdate } from '../controllers/goldrate.js';
import { createCustomer, customerLogin, deleteCustomer, getAllCustomers, getCustomerById, updateCustomer, validateEmailCus, validateMobileCus } from '../controllers/customer.js';
import { getAllPlans, planCreate, planDelete, planGetById, planUpdate } from '../controllers/plan.js';
import { emiCreate, emiDelete, emiGetById, emiUpdate, getAllEmis } from '../controllers/emi.js';


const router = express.Router();

router.post('/create-user', createUser);
router.post('/login', login);
router.get('/userbyid/:id', getUserById);
router.delete('/delete-user/:id', auth, deleteUser);
router.patch('/update-user/:id', updateUser);
router.get('/getalluser',getAllUsers);
router.put('/update-password/:id',updateUserPassword);
router.put('/update-profile/:id', updateUserProfile);
router.post('/validateEmail-user',validateEmail);
router.post('/validateMobile-user',validateMobile);
router.put('/update-mpassword/:mobile',updatePassword);

router.post('/create-branch', branchCreate);
router.get('/get-branch/:id',auth, branchGetById);
router.put('/update-branch/:id',auth, branchUpdate);
router.delete('/delete-branch/:id',auth, branchDelete);
router.get('/getallbranch',getAllBranches);
router.post('/validateEmail-branch',validateEmailBranch);
router.post('/validateMobile-branch',validateMobileBranch);

router.post('/create-goldrate',auth, goldRateCreate);
router.get('/goldrate/:id',auth, goldRateGetById);
router.put('/update-goldrate/:id',auth, goldRateUpdate);
router.delete('/delete-goldrate/:id',auth, goldRateDelete);
router.get('/getgoldrate',getAllGoldRates);
router.get('/gethistoricalgoldrate',getHistoricalGoldRates)

router.post('/create-customer', createCustomer);
router.post('/customer-login', customerLogin);
router.get('/customerbyid/:id', getCustomerById);
router.delete('/delete-customer/:id',  deleteCustomer);
router.patch('/update-customer/:id', updateCustomer);
router.get('/allcustomer',getAllCustomers);
router.post('/validateEmail-customer',validateEmailCus);
router.post('/validateMobile-customer',validateMobileCus);

router.post('/create-plan', planCreate);
router.get('/plan/:id', planGetById);
router.put('/update-plan/:id', planUpdate);
router.delete('/delete-plan/:id', planDelete);
router.get('/allplan',getAllPlans);

router.post('/create-emi', emiCreate);
router.get('/emiByID',emiGetById);
router.put('/update-emi',emiUpdate);
router.delete('/delete-emi', emiDelete);
router.get('/getallemi',getAllEmis);



export default router;
