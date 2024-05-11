import prisma from '../database/config.js';

// Create EMI
export const emiCreate = async (req, res) => {
    const { emi_month, emi_year, payment_status, dateOfPayment } = req.body;
    try {
        const createdEmi = await prisma.emi.create({
            data: { emi_month,emi_year, payment_status, dateOfPayment }
        });
        res.status(200).json({
            status: 0,
            message: "EMI created successfully",
            data: createdEmi
        });
    } catch (err) {
        res.status(500).json({
            status: 1,
            message: err.message ?? "Internal server error"
        });
    }
};

// Get EMI by ID
export const emiGetById = async (req, res) => {
    const { id } = req.params;
    try {
        const emi = await prisma.emi.findUnique({
            where: {
                id: parseInt(id)
            },
        });
        if (!emi) {
            return res.status(404).json({
                status: 1,
                message: "EMI not found"
            });
        }
        res.status(200).json({
            status: 0,
            data: emi
        });
    } catch (err) {
        res.status(500).json({
            status: 1,
            message: err.message ?? "Internal server error"
        });
    }
};

// Update EMI
export const emiUpdate = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedEmi = await prisma.emi.update({
            where: { id: parseInt(id) },
            data: req.body,
        });
        res.status(200).json({
            status: 0,
            message: "EMI updated successfully",
            data: updatedEmi,
        });
    } catch (err) {
        res.status(500).json({
            status: 1,
            message: err.message ?? "Internal server error"
        });
    }
};

// Delete EMI
export const emiDelete = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.emi.delete({
            where: { id: parseInt(id) },
        });
        res.status(200).json({
            status: 0,
            message: "EMI deleted successfully",
        });
    } catch (err) {
        res.status(500).json({
            status: 1,
            message: err.message ?? "Internal server error"
        });
    }
};

// Get All EMIs
export const getAllEmis = async (req, res) => {
    try {
        const emis = await prisma.emi.findMany();

        res.json({
            status: 0,
            length: emis.length,
            emis,
        });
    } catch (err) {
        res.status(500).json({
            status: 1,
            message: err.message ?? "Internal server error",
        });
    }
};
