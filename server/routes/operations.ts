import { RequestHandler } from "express";
import { ReplenishmentListResponse } from "@shared/api";

const ITEMS = [
  ["Coca Cola 2L", "BEVERAGES"],
  ["White Bread", "BREAD/BAKERY"],
  ["Milk 1L", "DAIRY"],
  ["Bananas 1kg", "PRODUCE"],
  ["Detergent", "CLEANING"],
  ["Chicken Breast", "POULTRY"],
];

export const replenishmentHandler: RequestHandler = (_req, res) => {
  const items: ReplenishmentListResponse["items"] = ITEMS.map(
    ([name, family], idx) => {
      const recommendedQty = 60 + idx * 25;
      const onHand = Math.max(
        0,
        Math.round(recommendedQty * (0.2 + 0.6 * Math.random())),
      );
      const ratio = onHand / recommendedQty;
      const risk = ratio < 0.3 ? "high" : ratio < 0.6 ? "medium" : "low";
      return {
        id: `${idx}`,
        item: name,
        family: family,
        recommendedQty,
        onHand,
        risk,
      };
    },
  );
  res.json({ items });
};
