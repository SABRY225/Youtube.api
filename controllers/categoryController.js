const Category = require('../models/categoryModel');

// Get all categories
const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching categories', error });
    }
};

// Get a single category by ID
const getCategory = async (req, res) => {
    try {
        const { categoryId  } = req.params;
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching category', error });
    }
};

// Create a new category
const createCategory = async (req, res) => {
    const { name } = req.body;
    try {
        const newCategory = new Category({ name });
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(400).json({ message: 'Error creating category', error });
    }
};

// Edit an existing category
const editCategory = async (req, res) => {
    const { categoryId } = req.params;
    const { name } = req.body;
    try {
        const updatedCategory = await Category.findByIdAndUpdate(categoryId, { name }, { new: true });
        if (!updatedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(201).json(updatedCategory);
    } catch (error) {
        res.status(400).json({ message: 'Error editing category', error });
    }
};

// Delete a category
const deleteCategory = async (req, res) => {
    const { categoryId } = req.params;
    try {
        const deletedCategory = await Category.findByIdAndDelete(categoryId);
        if (!deletedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(201).json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting category', error });
    }
};

module.exports = {
    getCategories,
    getCategory,
    createCategory,
    editCategory,
    deleteCategory,
};
