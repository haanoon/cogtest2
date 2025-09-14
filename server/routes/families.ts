import { RequestHandler } from "express";
import pool from "../db";

// GET /api/families - returns all family names from product_family table
export const familiesHandler: RequestHandler = async (_req, res) => {
  try {
    // Fetch both id and family name
    const result = await pool.query("SELECT id, family FROM product_family ORDER BY family");
    // Return as array of objects: { id, family }
    const families = result.rows;
    res.json({ families });
  } catch (err) {
    res.status(500).json({ error: "Database error", details: err });
  }
};
