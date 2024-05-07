// auth.js
import { messages } from '@vinejs/vine/defaults';
import prisma from '../database/config.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';



// createUser
export const createUser = async (req, res) => {
  const { name, email, password,mobile,role} = req.body;
  const role_creation={
    "SUPER_ADMIN":['BRANCH_ADMIN',"EMP","CUSTOMER"],
    "BRANCH_ADMIN":["EMP","CUSTOMER"],
    "EMP":["CUSTOMER"]
  }
  const token_role=req.user.Role_type;
  if(!role_creation[token_role].includes(role)){
    return res.status(400).json({
        status:1,
        message:'You have not access to create this role.'
    })
  }
  if (!name || !email  || !password || !mobile || !role) {
    return res.json({
      status: 1,
      message: 'All fields are required.',
    });
  }

  try {
    const existUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (existUser) {
      return res.json({
        status: 1,
        message: 'User already exists.',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        mobile,
        role,
      },
    });

    res.json({
      status: 0,
      data: newUser,
    });
  } catch (err) {
    return res.json({
      status: 1,
      message: err.message,
    });
  }
};

// loginUser
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({
      status: 1,
      message: 'All fields are required.',
    });
  }

  try {
    const existUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
   
    if (!existUser) {
      return res.json({
        status: 1,
        message: 'User not found.',
      });
    }

    const matchedPassword = await bcrypt.compare(password, existUser.password);

    if (!matchedPassword) {
      return res.json({
        status: 1,
        message: 'Incorrect Password',
      });
    }   
    const jwtPayload = {
      email,
      Role_type:existUser.role
    };
    const token = jwt.sign(jwtPayload, process.env.JWT_SECRET);
     console.log(token,"token")
    res.json({
      status: 0,
      token,
      user: existUser,
    });
  } catch (err) {
    return res.status(400).json({
      status: 1,
      message: 'Something went wrong!!',
    });
  }
};

// updateUser
export const updateUser = async (req, res) => {
  const { id } = req.params;

  try {
    const existUser = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!existUser) {
      return res.json({
        status: 1,
        message: 'User not exist',
      });
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: parseInt(id),
      },
      data: req.body,
    });

    res.json({
      status: 0,
      data: updatedUser,
    });
  } catch (err) {
    return res.json({
      status: 1,
      message: 'Something went wrong!!',
    });
  }
};

// deleteUser
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const existUser = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!existUser) {
      return res.json({
        status: 1,
        message: 'User not exist',
      });
    }

    await prisma.user.delete({
      where: {
        id: parseInt(id),
      },
    });

    res.json({
      status: 0,
      message: 'User deleted successfully',
    });
  } catch (err) {
    return res.json({
      status: 1,
      message: err.message,
    });
  }
};

// allUser
export const getUserById = async (req, res) => {
    const {id}=req.params;
  try {
    const users = await prisma.user.findUnique({
        where: {
            id: parseInt(id),
          },
    });

    res.json({
      status: 0,
      length: users.length,
      users,
    });
  } catch (err) {
    res.json({
      status: 1,
      message: err.message,
    });
  }
};
