import { RequestHandler } from "express";
import pool from "../db";

// GET /api/categories?family=FAMILY_NAME
export const categoriesHandler: RequestHandler = async (req, res) => {
  const { familyId } = req.query;
  if (!familyId) {
    return res.status(400).json({ error: "Missing familyId parameter" });
  }
  try {
    // Fetch categories for the given family id
    const result = await pool.query(
      `SELECT DISTINCT category FROM product_category WHERE id = $1 ORDER BY category`,
      [familyId]
    );
    const categories = result.rows.map((row) => row.category);
    res.json({ categories });
  } catch (err) {
    res.status(500).json({ error: "Database error", details: err });
  }
};