import prisma from '../database/config.js';

// Create Plan
export const planCreate = async (req, res) => {
    const { plan_name } = req.body;
    try {
        const createdPlan = await prisma.plan.create({
            data: { plan_name }
        });
        res.status(200).json({
            status: 0,
            message: "Plan created successfully",
            data: createdPlan
        });
    } catch (err) {
        res.status(500).json({
            status: 1,
            message: err.message ?? "Internal server error"
        });
    }
};

// Get Plan by ID
export const planGetById = async (req, res) => {
    const { id } = req.params;
    try {
        const plan = await prisma.plan.findUnique({
            where: {
                id: parseInt(id)
            },
        });
        if (!plan) {
            return res.status(404).json({
                status: 1,
                message: "Plan not found"
            });
        }
        res.status(200).json({
            status: 0,
            data: plan
        });
    } catch (err) {
        res.status(500).json({
            status: 1,
            message: err.message ?? "Internal server error"
        });
    }
};

// Update Plan
export const planUpdate = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedPlan = await prisma.plan.update({
            where: { id: parseInt(id) },
            data: req.body,
        });
        res.status(200).json({
            status: 0,
            message: "Plan updated successfully",
            data: updatedPlan,
        });
    } catch (err) {
        res.status(500).json({
            status: 1,
            message: err.message ?? "Internal server error"
        });
    }
};

// Delete Plan
export const planDelete = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.plan.delete({
            where: { id: parseInt(id) },
        });
        res.status(200).json({
            status: 0,
            message: "Plan deleted successfully",
        });
    } catch (err) {
        res.status(500).json({
            status: 1,
            message: err.message ?? "Internal server error"
        });
    }
};
