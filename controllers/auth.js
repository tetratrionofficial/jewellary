// auth.js
import { messages } from '@vinejs/vine/defaults';
import prisma from '../database/config.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';



// createUser
export const createUser = async (req, res) => {
  const { name, email, password,mobile,role,branch_id} = req.body;
  
  // const role_creation={
  //   "SUPER_ADMIN":['BRANCH_ADMIN',"EMP","CUSTOMER"],
  //   "BRANCH_ADMIN":["EMP","CUSTOMER"],
  //   "EMP":["CUSTOMER"]
  // }
  // const token_role=req.user.Role_type;
  // if(!role_creation[token_role].includes(role)){
  //   return res.status(400).json({
  //       status:1,
  //       message:'You have not access to create this role.'
  //   })
  // }
  console.log(req.body)
  if (!name || !email  || !password || !mobile || !role) {
    return res.json({
      status: 1,
      message: 'All fields are required.',
    });
  }

  try {
    // const existUser = await prisma.user.findUnique({
    //   where: {
    //     email,
    //   },
    // });
    // if (existUser) {
    //   return res.json({
    //     status: 1,
    //     message: 'User already exists.',
    //   });
    // }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        mobile,
        role,
        branch_id
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
      Role_type:existUser.role,
      id:existUser.id
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

// getUserById
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

//getAllUsers

export const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();

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

//update profile 
// export const updateProfile = async (req, res) => {
//   try {
//     const { name, email, address, phone } = req.body;
//     console.log(req.body);
//     // Fetch user details from Prisma
//     const user = await prisma.user.findUnique({
//       where: {
//         id: req.user._id,
//       },
//     });

    // Update password if provided and meets requirements
    // let hashedPassword;
    // if (password) {
    //   if (password.length < 6) {
    //     return res.json({ error: "Password is required and must be at least 6 characters long" });
    //   }
    //   hashedPassword = await bcrypt.hash(password, 10);
    // }

    // Update user information in database
//     const updatedUser = await prisma.user.update({
//       where: {
//         id: req.user._id,
//       },
//       data: {
//         name: name || user.name,
//         email: email || user.email,
//         // password: hashedPassword || user.password,
//         phone: phone || user.phone,
//         address: address || user.address,
//       },
//     });

//     res.status(200).send({
//       success: true,
//       message: "Profile updated successfully",
//       updatedUser,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(400).send({
//       success: false,
//       message: "Error while updating profile",
//       error,
//     });
//   } 
// };


//update password 


// export const updatePassword  = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const { currentPassword, newPassword, confirmNewPassword } = req.body;
    
//     // Fetch user details from Prisma
//     const user = await prisma.user.findUnique({
//       where: {
//         id: req.user.id,
//       },
//     });

//     // Check if the current password provided matches the user's current password
//     const matchedPassword = await bcrypt.compare(currentPassword, user.password);
//     if (!matchedPassword) {
//       return res.json({
//         status: 1,
//         message: 'Current password is incorrect.',
//       });
//     }

//     // Check if the new password and confirm new password match
//     if (newPassword !== confirmNewPassword) {
//       return res.json({
//         status: 1,
//         message: 'New password and confirm new password do not match.',
//       });
//     }

//     // Hash the new password
//     const hashedNewPassword = await bcrypt.hash(newPassword, 10);

//     // Update the user's password in the database
//     const updatedUser = await prisma.user.update({
//       where: {
//         id: req.user.id,
//       },
//       data: {
//         password: hashedNewPassword,
//       },
//     });

//     res.json({
//       status: 0,
//       message: 'Password updated successfully.',
//     });
//   } catch (err) {
//     return res.json({
//       status: 1,
//       message: err.message || 'Something went wrong!',
//     });
//   }
// };


// updateUserProfile
export const updateUserProfile = async (req, res) => {
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

    const { name, email, mobile } = req.body;

    const updatedUserProfile = await prisma.user.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name,
        email,
        mobile,
      },
    });

    res.json({
      status: 0,
      data: updatedUserProfile,
    });
  } catch (err) {
    return res.json({
      status: 1,
      message: 'Something went wrong!!',
    });
  }
};


export const updateUserPassword = async (req, res) => {
  const { id } = req.params;
  const { currentPassword, newPassword, confirmNewPassword } = req.body;

  try {
    // 1. Validate request data
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      return res.status(400).json({
        status: 1,
        message: 'Please provide current password, new password, and confirm new password.',
      });
    }

    // 2. Fetch user securely using a hasher function
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
      select: { password: true }, // Only select the password field
    });

    if (!user) {
      return res.status(404).json({
        status: 1,
        message: 'User not found.',
      });
    }

    // 3. Verify current password using a secure hasher function
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password); // Replace with your hasher function
    if (!isPasswordValid) {
      return res.status(401).json({
        status: 1,
        message: 'Incorrect current password.',
      });
    }

    // 4. Validate new password strength (optional but recommended)
    // const passwordStrength = await validatePassword(newPassword); // Replace with your password strength validation function
    // if (!passwordStrength.isValid) {
    //   return res.status(400).json({
    //     status: 1,
    //     message: passwordStrength.message, // Provide specific feedback on password weakness
    //   });
    // }

    // 5. Ensure new and confirm new password match
    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({
        status: 1,
        message: 'New password and confirm new password do not match.',
      });
    }

    // 6. Hash the new password securely
    const hashedNewPassword = await bcrypt.hash(newPassword, 10); 

    // 7. Update user with the hashed new password
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: { password: hashedNewPassword },
    });

    res.status(200).json({
      status: 0,
      message: 'Password updated successfully.',
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: 1,
      message: 'Internal server error. Please try again later.',
    });
  }
};

//validateEmail
export const validateEmail = async (req, res) => {
  const { email } = req.body;

  try {
    const existUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (existUser) {
      return res.status(409).json({
        status: 1,
        message: 'User with this email already exists.',
      });
    }

    res.status(200).json({
      status: 0,
      message: 'Email is available.',
    });
  } catch (err) {
    return res.status(500).json({
      status: 1,
      message: 'Internal server error. Please try again later.',
    });
  }
};

export const validateMobile = async (req, res) => {
  const { mobile } = req.body;

  try {
    const existUser = await prisma.user.findUnique({
      where: {
        mobile,
      },
    });
    if (existUser) {
      return res.status(409).json({
        status: 1,
        message: 'User with this mobile number already exists.',
      });
    }

    res.status(200).json({
      status: 0,
      message: 'Mobile number is available.',
    });
  } catch (err) {
    return res.json({
      status: 1,
      message: 'Internal server error. Please try again later.',
    });
  }
};



// update password with mobile 
export const updatePassword = async (req, res) => {
  const { mobile } = req.params;
  const { newPassword, confirmNewPassword } = req.body;

  try {
    if (!newPassword || !confirmNewPassword) {
      return res.status(400).json({
        status: 1,
        message: 'Please provide new password and confirm new password.',
      });
    }

    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({
        status: 1,
        message: 'New password and confirm new password do not match.',
      });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10); 

    const updatedUser = await prisma.user.update({
      where: { mobile },
      data: { password: hashedNewPassword },
    });

    res.status(200).json({
      status: 0,
      message: 'Password updated successfully.',
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: 1,
      message: 'Internal server error. Please try again later.',
    });
  }
};
