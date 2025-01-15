const express = require("express");
const router = express.Router();
const prisma = require("../prisma/prismaQuery");

// Yangi foodtype qo'shish
router.post("/foodtypes", async (req, res) => {
    const { name, description } = req.body;
    try {
        const foodtype = await prisma.foodtype.create({
            data: { name, description },
        });
        return res.status(201).json(foodtype);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

// Barcha foodtype-larni olish
router.get("/foodtypes", async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
    try {
        const [foodtypes, totalFoodtypes] = await Promise.all([
            prisma.foodtype.findMany({
                skip: skip,
                take: parseInt(limit, 10),
            }),
            prisma.foodtype.count(),
        ]);
        let response = {
            data: foodtypes,
            total: totalFoodtypes,
            currentPage: page,
            totalPages: Math.ceil(totalFoodtypes / limit),
        }
        return res.json(response);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// Belgilangan foodtype-ni olish
router.get("/foodtype/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const foodtype = await prisma.foodtype.findUnique({
            where: { id: Number(id) },
        });
        return res.json(foodtype);
    } catch (error) {
        return res.status(404).json({ error: error.message });
    }
});

// Foodtype-ni yangilash
router.put("/foodtypes/:id", async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    try {
        const updatedFoodtype = await prisma.foodtype.update({
            where: { id: Number(id) },
            data: { name, description },
        });
        return res.json(updatedFoodtype);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

// Foodtype-ni o'chirish
router.delete("/foodtypes/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.foodtype.delete({ where: { id: Number(id) } });
        return res.status(204).send();
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

module.exports = router;
