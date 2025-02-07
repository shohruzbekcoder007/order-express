const express = require('express');
const router = express.Router();
const { FoodMeasure } = require('../prisma/prismaQuery');

// Yangi foodmeasure qo'shish
router.post("/foodmeasures", async (req, res) => {
    const { name, description, nameUz, nameRu, descriptionUz, descriptionRu } = req.body;
    try {
        const foodmeasure = await FoodMeasure.create({
            data: { name, description, nameUz, nameRu, descriptionUz, descriptionRu },
        });
        return res.status(201).json(foodmeasure);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

// Barcha foodmeasure-larni olish
router.get("/foodmeasures", async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
    try {
        const [foodmeasures, totalFoodmeasures] = await Promise.all([
            FoodMeasure.findMany({
                skip: skip,
                take: parseInt(limit, 10),
            }),
            FoodMeasure.count(),
        ]);
        let response = {
            data: foodmeasures,
            total: totalFoodmeasures,
            currentPage: page,
            totalPages: Math.ceil(totalFoodmeasures / limit),
        }
        return res.json(response);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// Belgilangan foodmeasure-ni olish
router.get("/foodmeasure/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const foodmeasure = await FoodMeasure.findUnique({
            where: { id: String(id) },
        });
        return res.json(foodmeasure);
    } catch (error) {
        return res.status(404).json({ error: error.message });
    }
});

// Foodmeasure-ni yangilash
router.put("/foodmeasure/:id", async (req, res) => {
    const { id } = req.params;
    const { name, description, nameUz, nameRu, descriptionUz, descriptionRu } = req.body;
    try {
        const updatedFoodmeasure = await FoodMeasure.update({
            where: { id: String(id) },
            data: { name, description, nameUz, nameRu, descriptionUz, descriptionRu },
        });
        return res.json(updatedFoodmeasure);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

// Foodmeasure-ni o'chirish
router.delete("/foodmeasure/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await FoodMeasure.delete({ where: { id: String(id) } });
        return res.status(204).send();
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

module.exports = router;

