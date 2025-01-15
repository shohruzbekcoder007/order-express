const express = require('express')
const router = express.Router()
const { ObjectId } = require('mongodb')
const bcrypt = require('bcryptjs')
const prisma = require("../prisma/prismaQuery")

// Yangi foydalanuvchi qo'shish
router.post("/users", async (req, res) => {
    const { name, email, age, first_name, last_name, father_name, connects, password: plainPassword } = req.body;
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(plainPassword, salt);
    try {
        const user = await prisma.user.create({
            data: { name, email, age, first_name, last_name, father_name, connects, password },
        });
        return res.status(201).json(user);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

// Barcha foydalanuvchilarni olish
router.get("/users", async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        return res.json(users);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// Belgilangan foydalanuvchini olish
router.get("/user/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const user = await prisma.user.findUnique({
            where: { id: new ObjectId(id) },
        });
        return res.json(user);
    } catch (error) {
        return res.status(404).json({ error: error.message });
    }
});

// Foydalanuvchini yangilash
router.put("/users/:id", async (req, res) => {
    const { id } = req.params;
    const { name, email, age } = req.body;
    try {
        const updatedUser = await prisma.user.update({
            where: { id: Number(id) },
            data: { name, email, age },
        });
        return res.json(updatedUser);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

// Foydalanuvchini o'chirish
router.delete("/users/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.user.delete({ where: { id: Number(id) } });
        return res.status(204).send();
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

module.exports = router;