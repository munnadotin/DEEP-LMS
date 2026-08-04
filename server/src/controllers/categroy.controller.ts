import { Request, Response } from "express";
import { Category } from "../model/category.model";
import { redis } from "../config/redis";

// create category
const createCategory = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Name is required",
            });
        }
        const category = await Category.create({ name, slug: name.toLowerCase().replace(/\s+/g, "-") });

        await redis.del("category:all");

        return res.status(201).json({
            success: true,
            message: "Category Created",
            category,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: (error as Error).message
        });
    }
}

// get all categories
const getAllCategories = async (_req: Request, res: Response) => {
    try {
        // cache hit
        const cachedCategory = await redis.get("category:all");

        if (cachedCategory) {
            return res.status(200).json({
                success: true,
                message: "Categories Fetched from cache",
                categories: JSON.parse(cachedCategory),
            })
        }

        const categories = await Category.find();

        // cache miss
        await redis.set("category:all", JSON.stringify(categories), "EX", 60 * 60); // 1 hour

        return res.status(200).json({
            success: true,
            message: "Categories Fetched from database",
            categories,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: (error as Error).message
        });
    }
}

// get category by slug
const getCategoryById = async (req: Request, res: Response) => {
    try {
        const { slug } = req.params;
        // cache hit
        const cachedCategory = await redis.get(`category:${slug}`);

        if (cachedCategory) {
            return res.status(200).json({
                status: true,
                message: "Categories Fetched from cache",
                category: JSON.parse(cachedCategory)
            })
        }

        // validate
        if (!slug) {
            return res.status(400).json({
                success: false,
                message: "Category Slug is required",
            });
        }

        const category = await Category.findOne({ slug });

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category Not Found",
            });
        }
        // cache miss
        await redis.set(`category:${slug}`, JSON.stringify(category), "EX", 60 * 60); // 1 hour

        return res.status(200).json({
            success: true,
            message: "Category Fetched from databse",
            category,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: (error as Error).message
        });
    }
}

// update category
const updateCategory = async (req: Request, res: Response) => {
    try {
        const { slug } = req.params;
        if (!slug) {
            return res.status(400).json({
                success: false,
                message: "Category Slug is required",
            });
        }
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Name is required",
            });
        }
        const category = await Category.findOneAndUpdate({ slug }, { name, slug: name.toLowerCase().replace(/\s+/g, "-") }, { returnDocument: "after" });

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category Not Found",
            });
        }

        // update category in cache
        await redis.del(`category:${slug}`);
        await redis.del("category:all");

        return res.status(200).json({
            success: true,
            message: "Category Updated",
            category,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: (error as Error).message
        });
    }
}

// delete category
const deleteCategory = async (req: Request, res: Response) => {
    try {
        const { slug } = req.params;
        if (!slug) {
            return res.status(400).json({
                success: false,
                message: "Category Slug is required",
            });
        }
        const category = await Category.findOneAndDelete({ slug });
        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category Not Found",
            });
        }

        // del category from cache
        await redis.del(`category:${slug}`);
        await redis.del("category:all");

        return res.status(200).json({
            success: true,
            message: "Category Deleted",
            category,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: (error as Error).message
        });
    }
}

export const categoryController = {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
}