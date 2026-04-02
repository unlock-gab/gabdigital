import { Router } from "express";
import { db } from "@workspace/db";
import { contactMessages } from "@workspace/db/schema";
import { eq, desc } from "drizzle-orm";

const router = Router();

router.get("/contact-messages", async (_req, res) => {
  try {
    const rows = await db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt));
    return res.json(rows);
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/contact-messages", async (req, res) => {
  try {
    const { name, email, phone, subject, message, date, status } = req.body as {
      name: string;
      email: string;
      phone?: string;
      subject?: string;
      message: string;
      date: string;
      status?: string;
    };
    const inserted = await db
      .insert(contactMessages)
      .values({
        name: name ?? "",
        email: email ?? "",
        phone: phone ?? "",
        subject: subject ?? "",
        message: message ?? "",
        date: date ?? new Date().toISOString().split("T")[0],
        status: status ?? "Unread",
      })
      .returning();
    return res.status(201).json(inserted[0]);
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.patch("/contact-messages/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { status } = req.body as { status: string };
    const updated = await db
      .update(contactMessages)
      .set({ status })
      .where(eq(contactMessages.id, id))
      .returning();
    return res.json(updated[0] ?? null);
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/contact-messages/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    await db.delete(contactMessages).where(eq(contactMessages.id, id));
    return res.json({ ok: true });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
