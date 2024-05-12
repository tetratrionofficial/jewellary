
import prisma from "../database/config.js";
//create branch 
export const branchCreate = async (req, res) => {
    console.log(req.body)
  const { branch_mobile, address1,address2  ,city,state, pincode,country, branch_email, branch_code, branch_name ,admin_id} =
    req.body;
    // const {Role_type}=req.user;
    // if(Role_type!=='SUPER_ADMIN'){
    //     return res.status(403).json({
    //         message:"Forbidden"
    //     })
    // }
  try {
    if (
      !branch_mobile ||
      !address1 ||
    !address2 ||
   ! city || 
    !state ||
    
    !pincode||
      !branch_email ||
      !branch_code ||
      !branch_name
      
    )
      return res.status(400).json({
        status: 1,
        message: "All fields are required",
      });
    const branch = await prisma.branch.create({
        data:{branch_mobile, address1,address2,city, state,country, branch_email, branch_code, branch_name,admin_id }
    });
    console.log(branch)
    res.status(200).json({
        status: 0,
        message: "Success",
      });
  } catch (err) {
    res.status(400).json({
      status: 1,
      message: err.message ?? "Internal server error",
    });
  }
};


//get branch by id 

export const branchGetById = async (req, res) => {
  const { id } = req.params;
  try {
    const branch = await prisma.branch.findUnique({
      where: {
        id:parseInt(id)
       },
    });
    if (!branch) {
      return res.status(404).json({
        status: 1,
        message: "Branch not found",
      });
    }
    res.status(200).json({
      status: 0,
      data: branch,
    });
  } catch (err) {
    res.status(500).json({
      status: 1,
      message: err.message ?? "Internal server error",
    });
  }
};

// //Branch Update

export const branchUpdate = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedBranch = await prisma.branch.update({
      where: { id:parseInt(id) },
      data: req.body,
    });
    res.status(200).json({
      status: 0,
      message: "Branch updated successfully",
      data: updatedBranch,
    });
  } catch (err) {
    res.status(500).json({
      status: 1,
      message: err.message ?? "Internal server error",
    });
  }
};

// BranchDelete

export const branchDelete = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.branch.delete({
      where: { id:parseInt(id) },
    });
    res.status(200).json({
      status: 0,
      message: "Branch deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      status: 1,
      message: err.message ?? "Internal server error",
    });
  }
};

//getallbranch
export const getAllBranches = async (req, res) => {
  try {
    const branches = await prisma.branch.findMany();

    res.json({
      status: 0,
      length: branches.length,
      branches,
    });
  } catch (err) {
    res.status(500).json({
      status: 1,
      message: err.message ?? "Internal server error",
    });
  }
};

//validateEmail
export const validateEmailBranch = async (req, res) => {
  const { branch_email } = req.body;

  try {
    const existBranch = await prisma.branch.findUnique({
      where: {
        branch_email,
      },
    });
    if (existBranch) {
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
      message: 'Internal server error. Please try again later.'
    });
  }
};

//validateMobile
export const validateMobileBranch = async (req, res) => {
  const { branch_mobile } = req.body;

  try {
    const existBranch = await prisma.branch.findUnique({
      where: {
        branch_mobile,
      },
    });
    if (existBranch) {
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
    return res.status(500).json({
      status: 1,
      message: err.message,
    });
  }
};


