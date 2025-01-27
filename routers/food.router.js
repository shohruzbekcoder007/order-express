const express = require('express')
const router = express.Router()
const prisma = require("../prisma/prismaQuery")

// Yangi ovqat qo'shish
router.post("/foods", async (req, res) => {
    const { name, description, price, image, foodtypeId } = req.body;
    try {
        const food = await prisma.food.create({
            data: {
                name,
                description,
                price: parseInt(price),
                image,
                foodtype: { connect: { id: String(foodtypeId) } }
            }
        });
        return res.status(201).json(food);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

// Barcha ovqatlarni olish
router.get("/foods", async (req, res) => {
    try {
        const foods = await prisma.food.findMany();
        return res.json(foods);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// Belgilangan ovqat-ni olish
router.get("/food/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const food = await prisma.food.findUnique({
            where: { id: String(id) }
        });
        return res.json(food);
    } catch (error) {
        return res.status(404).json({ error: error.message });
    }
});

// Ovqat-ni yangilash
router.put("/food/:id", async (req, res) => {
    const { id } = req.params;
    const { name, description, price, image, foodtypeId } = req.body;
    try {
        const updatedFood = await prisma.food.update({
            where: { id: String(id) },
            data: {
                name,
                description,
                price: parseInt(price),
                image,
                foodtype: { connect: { id: String(foodtypeId) } }
            }
        });
        return res.json(updatedFood);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

// Ovqat-ni o'chirish
router.delete("/food/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.food.delete({ where: { id: String(id) } });
        return res.status(204).send();
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

// Ma'lum bir foodtype bo'yicha ovqatlarni olish
router.get("/foodtype/:foodtypeId", async (req, res) => {
    const { foodtypeId } = req.params;
    try {
        const foods = await prisma.food.findMany({
            where: { foodtypeId: String(foodtypeId) }
        });
        return res.json(foods);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

module.exports = router;
