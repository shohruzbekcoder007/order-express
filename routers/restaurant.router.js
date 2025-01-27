const express = require("express");
const router = express.Router();
const prisma = require("../prisma/prismaQuery");

// Yangi restaraunt qo'shish
router.post("/restaurants", async (req, res) => {
    const { name, address, phone, about, latitude, longitude } = req.body;
    try {
        const restaurant = await prisma.restaurant.create({
            data: {
                name,
                address,
                phone: parseInt(phone),
                about,
                latitude,
                longitude
            }
        });
        return res.status(201).json(restaurant);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

// Barcha restaraunt-larni olish
router.get("/restaurants", async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
    try {
        const [restaurants, totalRestaurants] = await Promise.all([
            prisma.restaurant.findMany({
                skip: skip,
                take: parseInt(limit, 10),
            }),
            prisma.restaurant.count(),
        ]);
        let response = {
            data: restaurants,
            total: totalRestaurants,
            currentPage: page,
            totalPages: Math.ceil(totalRestaurants / limit),
        }
        return res.json(response);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// Belgilangan restaraunt-ni olish
router.get("/restaurant/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const restaurant = await prisma.restaurant.findUnique({
            where: { id: String(id) }
        });
        return res.json(restaurant);
    } catch (error) {
        return res.status(404).json({ error: error.message });
    }
});

// Restaraunt-ni yangilash
router.put("/restaurant/:id", async (req, res) => {
    const { id } = req.params;
    const { name, address, phone, about } = req.body;
    try {
        const updatedRestaurant = await prisma.restaurant.update({
            where: { id: Number(id) },
            data: {
                name,
                address,
                phone: parseInt(phone),
                about
            }
        });
        return res.json(updatedRestaurant);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

// Restaraunt-ni o'chirish
router.delete("/restaurant/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.restaurant.delete({ where: { id: Number(id) } });
        return res.status(204).send();
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

module.exports = router;

