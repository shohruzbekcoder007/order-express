const express = require('express');
const router = express.Router();
const prisma = require("../prisma/prismaQuery");

// Create a new FoodPrice
router.post("/foodprices", async (req, res) => {
    const { foodId, price, restaurantId } = req.body;
    try {
        const foodPrice = await prisma.foodPrice.create({
            data: { foodId, price, restaurantId },
        });
        return res.status(201).json(foodPrice);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

// Get all FoodPrices
router.get("/foodprices", async (req, res) => {
    try {
        const foodPrices = await prisma.foodPrice.findMany();
        return res.json(foodPrices);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// Get a specific FoodPrice by id
router.get("/foodprice/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const foodPrice = await prisma.foodPrice.findUnique({
            where: { id: String(id) }
        });
        return res.json(foodPrice);
    } catch (error) {
        return res.status(404).json({ error: error.message });
    }
});

// Update a FoodPrice
router.put("/foodprice/:id", async (req, res) => {
    const { id } = req.params;
    const { foodId, price, restaurantId } = req.body;
    try {
        const updatedFoodPrice = await prisma.foodPrice.update({
            where: { id: String(id) },
            data: { foodId, price, restaurantId },
        });
        return res.json(updatedFoodPrice);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

// Delete a FoodPrice
router.delete("/foodprice/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.foodPrice.delete({ where: { id: String(id) } });
        return res.status(204).send();
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

module.exports = router;

