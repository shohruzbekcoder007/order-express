const express = require('express');
const router = express.Router();
const prisma = require("../prisma/prismaQuery");

// Create a new supplier
router.post("/suppliers", async (req, res) => {
    const { name, contact, email, firstName, lastName, fatherName } = req.body;
    try {
        const supplier = await prisma.supplier.create({
            data: { name, contact, email, firstName, lastName, fatherName },
        });
        return res.status(201).json(supplier);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

// Get all suppliers
router.get("/suppliers", async (req, res) => {
    try {
        const suppliers = await prisma.supplier.findMany();
        return res.json(suppliers);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// Get a supplier by ID
router.get("/suppliers/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const supplier = await prisma.supplier.findUnique({
            where: { id: Number(id) },
        });
        return res.json(supplier);
    } catch (error) {
        return res.status(404).json({ error: error.message });
    }
});

// Update a supplier
router.put("/suppliers/:id", async (req, res) => {
    const { id } = req.params;
    const { name, contact, email, firstName, lastName, fatherName } = req.body;
    try {
        const updatedSupplier = await prisma.supplier.update({
            where: { id: Number(id) },
            data: { name, contact, email, firstName, lastName, fatherName },
        });
        return res.json(updatedSupplier);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

// Delete a supplier
router.delete("/suppliers/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.supplier.delete({ where: { id: Number(id) } });
        return res.status(204).send();
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

module.exports = router;

