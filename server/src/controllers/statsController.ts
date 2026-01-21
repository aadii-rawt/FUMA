import { Request, Response } from "express"
import { prisma } from "../lib/prisma";
import redis from "../lib/redis";

export const userStats = async (req: Request, res: Response) => {
  // @ts-ignore
  const id = req.id

  try {
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const cache = await redis.get(`stats:${id}`)
    if (cache) {
      return res.json(JSON.parse(cache));
    }

    const messageCount = await prisma.dmList.count({
      where: { userId: id, msgSendAt: { gte: startOfMonth } },
    });

    const automationCount = await prisma.automation.count({
      where: {
        userId: id,
        createdAt: { gte: startOfMonth },
      },
    });

    const contactCount = await prisma.contacts.count({
      where: {
        userId: id,
        createdAt: { gte: startOfMonth }
      }
    })

    await redis.set(`stats:${id}`, JSON.stringify({ messageCount, automationCount, contactCount }), "EX" , 60 )

    return res.json({ messageCount, automationCount, contactCount });
  } catch (err) {
    console.error("Failed to get total sent:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

const RANGE_TO_DAYS: Record<string, number> = {
  "7d": 7,
  "14d": 14,
  "28d": 28,
  "3m": 90,
};

const getStartDate = (range: string) => {
  const days = RANGE_TO_DAYS[range] ?? 7;
  const start = new Date();
  start.setDate(start.getDate() - (days - 1));
  start.setHours(0, 0, 0, 0);
  return start;
};

/* ---------------- CONTROLLER ---------------- */

export const getMessageStats = async (req: Request, res: Response) => {
  try {

    // @ts-ignore
    const id = req.id
    const range = (req.query.range as string) || "7d";
    const cacheKey = `user:${id}:messages:${range}`


    const startDate = getStartDate(range);

    /**
     * Fetch messages in date range
     */
    const messages = await prisma.dmList.findMany({
      where: {
        userId : id,
        msgSendAt: {
          gte: startDate,
        },
      },
      select: {
        msgSendAt: true,
      },
    });

    /**
     * Aggregate by day
     */
    const statsMap: Record<string, number> = {};

    messages.forEach((msg) => {
      const dateKey = msg.msgSendAt.toISOString().split("T")[0];
      statsMap[dateKey] = (statsMap[dateKey] || 0) + 1;
    });

    /**
     * Fill missing dates with 0 count
     */
    const days = RANGE_TO_DAYS[range] ?? 7;
    const result: { date: string; count: number }[] = [];

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);

      const key = date.toISOString().split("T")[0];

      result.push({
        date: key,
        count: statsMap[key] || 0,
      });
    }

    const responsePayload = {
      range,
      total: messages.length,
      data: result,
    };


     await redis.set(
      cacheKey,
      JSON.stringify({responsePayload}),
      "EX",
      300 // seconds
    );

    return res.status(200).json(responsePayload);
  } catch (error) {
    console.error("Message stats error:", error);
    return res.status(500).json({
      message: "Failed to fetch message stats",
    });
  }
};
