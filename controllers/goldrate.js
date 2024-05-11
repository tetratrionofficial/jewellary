import prisma from '../database/config.js';

// Create Gold Rate
export const goldRateCreate = async (req, res) => {
    const { gold_rate } = req.body;
    const { Role_type } = req.user;
    if (Role_type !== 'SUPER_ADMIN') {
      return res.status(403).json({
        message: "Forbidden"
      });
    }
    try {
      if (!gold_rate) {
        return res.status(400).json({
          status: 1,
          message: "Gold rate is required"
        });
      }
      const createdGoldRate = await prisma.goldrate.create({
        data: { gold_rate }
      });
      res.status(200).json({
        status: 0,
        message: "Gold rate created successfully",
        data: createdGoldRate
      });
    } catch (err) {
      res.status(500).json({
        status: 1,
        message: err.message ?? "Internal server error"
      });
    }
  };
  
  // Get Gold Rate by ID
  export const goldRateGetById = async (req, res) => {
    const { id } = req.params;
    try {
      const goldRate = await prisma.goldrate.findUnique({
        where: {
          id: parseInt(id)
        },
      });
      if (!goldRate) {
        return res.status(404).json({
          status: 1,
          message: "Gold rate not found"
        });
      }
      res.status(200).json({
        status: 0,
        data: goldRate
      });
    } catch (err) {
      res.status(500).json({
        status: 1,
        message: err.message ?? "Internal server error"
      });
    }
  };
  
  // Update Gold Rate
  export const goldRateUpdate = async (req, res) => {
    const { id } = req.params;
    try {
      
      const updatedGoldRate = await prisma.goldrate.update({
        where: { id: parseInt(id) },
        data: req.body,
      });
      res.status(200).json({
        status: 0,
        message: "Gold rate updated successfully",
        data: updatedGoldRate,
      });
    } catch (err) {
      res.status(500).json({
        status: 1,
        message: err.message ?? "Internal server error"
      });
    }
  };
  
  // Delete Gold Rate
  export const goldRateDelete = async (req, res) => {
    const { id } = req.params;
    try {
      await prisma.goldrate.delete({
        where: { id: parseInt(id) },
      });
      res.status(200).json({
        status: 0,
        message: "Gold rate deleted successfully",
      });
    } catch (err) {
      res.status(500).json({
        status: 1,
        message: err.message ?? "Internal server error"
      });
    }
  };

  //getAllGoldRate

  export const getAllGoldRates = async (req, res) => {
    try {
      const goldRates = await prisma.goldrate.findMany();
  
      res.json({
        status: 0,
        length: goldRates.length,
        goldRates,
      });
    } catch (err) {
      res.status(500).json({
        status: 1,
        message: err.message ?? "Internal server error",
      });
    }
  };

  export const getHistoricalGoldRates = async (req, res) => {
    try {
      const historicalGoldRates = await prisma.goldrate.findMany({
        orderBy: { createdAt: 'desc' },
        where: { createdAt: { not: null } }
      });
      res.status(200).json({
        status: 0,
        length: historicalGoldRates.length,
        data: historicalGoldRates
      });
    } catch (err) {
      res.status(500).json({
        status: 1,
        message: err.message ?? "Internal server error"
      });
    }
  };
  
  
  