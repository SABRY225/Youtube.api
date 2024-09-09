const express = require('express');
const router = express.Router();
const { getCategories, getCategory, createCategory, editCategory, deleteCategory } = require('../controllers/categoryController');
const isAuth = require('../middleware/auth');

/**
 * @swagger
 * /api/Category/categories:
 *   get:
 *     summary: Returns the list of all categories
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: The list of categories
 */
router.get('/categories', getCategories);

/**
 * @swagger
 * /api/Category/{categoryId}:
 *   get:
 *     summary: Returns detailes of Category
 *     tags: [Category]
 *     parameters:
 *       - name: categoryId
 *         in: path
 *         required: true
 *         description: ID of the business to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns detailes of Category
 */
router.get('/:categoryId', getCategory);

/**
 * @swagger
 * /api/Category/:
 *   post:
 *     summary: Create a new category
 *     tags: [Category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Category created successfully
 */
router.post('/', isAuth,createCategory);

/**
 * @swagger
 * /api/Category/{categoryId}:
 *   put:
 *     summary: edit category
 *     tags: [Category]
 *     parameters:
 *       - name: categoryId
 *         in: path
 *         required: true
 *         description: ID of the business to retrieve
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Category edit successfully
 */
router.put('/:categoryId', isAuth,editCategory);

/**
 * @swagger
 * /api/Category/{categoryId}:
 *   delete:
 *     summary: delete category
 *     tags: [Category]
 *     parameters:
 *       - name: categoryId
 *         in: path
 *         required: true
 *         description: ID of the business to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Category delete successfully
 */
router.delete('/:categoryId', isAuth,deleteCategory);

module.exports = router;
