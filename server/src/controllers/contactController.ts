import { prisma } from "../lib/prisma"
import { Request, Response } from "express"

export const getContacts = async (req: Request, res: Response) => {
  try {
    // @ts-ignore — your auth middleware sets req.id
    const userId = req.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const page = Math.max(1, parseInt((req.query.page as string) || "1", 10));
    const limit = Math.max(1, parseInt((req.query.limit as string) || "10", 10));
    const skip = (page - 1) * limit;
    const q = (req.query.q as string || "").trim();
    const sort = (req.query.sort as string || "last"); // "last" or "name"

    // base where
    const where: any = { userId };

    if (q) {
      where.OR = [
        { username: { contains: q, mode: "insensitive" } },
        { email: { contains: q, mode: "insensitive" } },
      ];
    }

    // ordering
    let orderBy: any = { createdAt: "desc" }; // default last
    if (sort === "name") {
      orderBy = { username: "asc" };
    }

    const [total, data] = await Promise.all([
      prisma.contacts.count({ where }),
      prisma.contacts.findMany({
        where,
        orderBy,
        skip,
        take: limit,
      }),
    ]);

    res.json({
      data,
      total,
      page,
      limit,
    });
  } catch (error) {
    console.error("getContacts error:", error);
    res.status(500).json({ error: "Failed to fetch contacts" });
  }
};