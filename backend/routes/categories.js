import express from 'express';
import Category from '../models/Category.js';
import { verifyToken, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// Get all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new category (admin only)
router.post('/', verifyToken, isAdmin, async (req, res) => {
  const category = new Category({
    id: req.body.id,
    name: req.body.name,
    displayName: req.body.displayName,
    description: req.body.description
  });

  try {
    const newCategory = await category.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a category (admin only)
router.patch('/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    const category = await Category.findOne({ id: req.params.id });
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    if (req.body.name) category.name = req.body.name;
    if (req.body.displayName) category.displayName = req.body.displayName;
    if (req.body.description) category.description = req.body.description;

    const updatedCategory = await category.save();
    res.json(updatedCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a category (admin only)
router.delete('/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    const category = await Category.findOne({ id: req.params.id });
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    await category.deleteOne();
    res.json({ message: 'Category deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
