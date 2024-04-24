
import prisma from "../database/config.js";
//create branch 
export const branchCreate = async (req, res) => {
    console.log(req.body)
  const { branch_mobile, address, branch_email, branch_code, branch_name ,admin_id} =
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
      !address ||
      !branch_email ||
      !branch_code ||
      !branch_name||
      !admin_id
    )
      return res.status(400).json({
        status: 1,
        message: "forbidden",
      });
    const branch = await prisma.branch.create({
        data:{branch_mobile, address, branch_email, branch_code, branch_name,admin_id }
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

// //BranchDelete

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

