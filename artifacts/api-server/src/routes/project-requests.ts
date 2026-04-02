import { Router } from "express";
import { db } from "@workspace/db";
import { projectRequests } from "@workspace/db/schema";
import { eq, desc } from "drizzle-orm";

const router = Router();

router.get("/project-requests", async (_req, res) => {
  try {
    const rows = await db.select().from(projectRequests).orderBy(desc(projectRequests.createdAt));
    return res.json(rows);
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/project-requests", async (req, res) => {
  try {
    const {
      fullName, email, phone, businessType, requestedService,
      budget, description, websiteLink, preferredStartDate, date, status,
    } = req.body as {
      fullName: string;
      email: string;
      phone?: string;
      businessType?: string;
      requestedService?: string;
      budget?: string;
      description?: string;
      websiteLink?: string;
      preferredStartDate?: string;
      date: string;
      status?: string;
    };
    const inserted = await db
      .insert(projectRequests)
      .values({
        fullName: fullName ?? "",
        email: email ?? "",
        phone: phone ?? "",
        businessType: businessType ?? "",
        requestedService: requestedService ?? "",
        budget: budget ?? "",
        description: description ?? "",
        websiteLink: websiteLink ?? "",
        preferredStartDate: preferredStartDate ?? "",
        date: date ?? new Date().toISOString().split("T")[0],
        status: status ?? "New",
      })
      .returning();
    return res.status(201).json(inserted[0]);
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.patch("/project-requests/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { status } = req.body as { status: string };
    const updated = await db
      .update(projectRequests)
      .set({ status })
      .where(eq(projectRequests.id, id))
      .returning();
    return res.json(updated[0] ?? null);
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/project-requests/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    await db.delete(projectRequests).where(eq(projectRequests.id, id));
    return res.json({ ok: true });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
