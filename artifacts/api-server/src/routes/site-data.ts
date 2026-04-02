import { Router } from "express";
import { db } from "@workspace/db";
import { siteData } from "@workspace/db/schema";
import { eq } from "drizzle-orm";

const router = Router();

router.get("/site-data/:key", async (req, res) => {
  try {
    const { key } = req.params;
    const rows = await db.select().from(siteData).where(eq(siteData.key, key));
    if (rows.length === 0) {
      return res.status(404).json({ error: "Not found" });
    }
    return res.json({ key: rows[0].key, value: rows[0].value });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/site-data/:key", async (req, res) => {
  try {
    const { key } = req.params;
    const { value } = req.body as { value: unknown };
    if (value === undefined) {
      return res.status(400).json({ error: "value is required" });
    }
    await db
      .insert(siteData)
      .values({ key, value })
      .onConflictDoUpdate({ target: siteData.key, set: { value, updatedAt: new Date() } });
    return res.json({ ok: true });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
