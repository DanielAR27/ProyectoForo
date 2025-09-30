import { Router } from "express";
import Message from "../models/Message.js";

const router = Router();

// POST /api/messages
router.post("/", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text?.trim()) return res.status(400).json({ error: "text requerido" });
    const saved = await Message.create({ text: text.trim() });
    res.status(201).json(saved);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Error al guardar" });
  }
});

// GET /api/messages
router.get("/", async (_req, res) => {
  const list = await Message.find().sort({ createdAt: -1 }).limit(20);
  res.json(list);
});

export default router;