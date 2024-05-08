import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

//create Customer
export const createCustomer = async (req, res) => {
  const { name, email, mobile, address, permanent_address, aadhaar, date, password, branch_id ,emp_id } = req.body;
  console.log(req.body);

  // if (!name || !email || !mobile || !address || !permanent_address || !aadhaar || !date || !password || !branch_id || emp_id) {
  //   return res.json({
  //     status: 1,
  //     message: 'All fields are required.',
  //   });
  // }

  try {
    // const existCustomer = await prisma.customer.findUnique({
    //   where: {
    //     email,
    //   },
    // });
    // if (existCustomer) {
    //   return res.json({
    //     status: 1,
    //     message: 'Customer already exists.',
    //   });
    // }

    const newCustomer = await prisma.customer.create({
      data: {
        name,
        email,
        mobile,
        address,
        permanent_address,
        aadhaar,
        date,
        password,
        branch_id,
        emp_id
      },
    });

    res.json({
      status: 0,
      data: newCustomer,
    });
  } catch (err) {
    return res.json({
      status: 1,
      message: err.message,
    });
  }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.json({
        status: 1,
        message: 'All fields are required.',
      });
    }
  
    try {
      const existCustomer = await prisma.customer.findUnique({
        where: {
          email,
        },
      });
  
      if (!existCustomer) {
        return res.json({
          status: 1,
          message: 'Customer not found.',
        });
      }
  
      
      const matchedPassword = await bcrypt.compare(password, existCustomer.password);
  
      if (!matchedPassword) {
        return res.json({
          status: 1,
          message: 'Incorrect Password',
        });
      }
  
      
      const jwtPayload = {
        email,
        customerId: existCustomer.id,
      };
      const token = jwt.sign(jwtPayload, process.env.JWT_SECRET);
  
      res.json({
        status: 0,
        token,
        customer: existCustomer,
      });
    } catch (err) {
      return res.status(400).json({
        status: 1,
        message: 'Something went wrong!!',
      });
    }
  };
  
  export const updateCustomer = async (req, res) => {
    const { id } = req.params;
  
    try {
      const existCustomer = await prisma.customer.findUnique({
        where: {
          id: parseInt(id),
        },
      });
  
      if (!existCustomer) {
        return res.json({
          status: 1,
          message: 'Customer not exist',
        });
      }
  
      const updatedCustomer = await prisma.customer.update({
        where: {
          id: parseInt(id),
        },
        data: req.body,
      });
  
      res.json({
        status: 0,
        data: updatedCustomer,
      });
    } catch (err) {
      return res.json({
        status: 1,
        message: 'Something went wrong!!',
      });
    }
  };
  
  export const deleteCustomer = async (req, res) => {
    const { id } = req.params;
  
    try {
      const existCustomer = await prisma.customer.findUnique({
        where: {
          id: parseInt(id),
        },
      });
  
      if (!existCustomer) {
        return res.json({
          status: 1,
          message: 'Customer not exist',
        });
      }
  
      await prisma.customer.delete({
        where: {
          id: parseInt(id),
        },
      });
  
      res.json({
        status: 0,
        message: 'Customer deleted successfully',
      });
    } catch (err) {
      return res.json({
        status: 1,
        message: err.message,
      });
    }
  };
  
  export const getCustomerById = async (req, res) => {
    const { id } = req.params;
    try {
      const customer = await prisma.customer.findUnique({
        where: {
          id: parseInt(id),
        },
      });
  
      res.json({
        status: 0,
        customer,
      });
    } catch (err) {
      res.json({
        status: 1,
        message: err.message,
      });
    }
  };