import { DataPoint, User } from "@prisma/client";
import { db } from "../db";
import type { AllDataPoints, DataPointParam } from "../types";

export async function createDataPoints(user: User, points: DataPointParam): Promise<DataPoint[]> {

  const keys = Object.keys(points) as AllDataPoints["type"][];

  const createdPoints: DataPoint[] = [];

  for (const key of keys) {

    const data = points[key];

    if (
      (key === "weight" && typeof data === "number") ||
      (key === "training" && typeof data === "object") ||
      (key === "muscle_percent" && typeof data === "number") ||
      (key === "fat_percent" && typeof data === "number") ||
      (key === "height" && typeof data === "number")
    ) {
      const d = await db.dataPoint.create({
        data: {
          type: key,
          creator: { connect: user },
          data: JSON.stringify(data)
        }
      })
      createdPoints.push(d)
    }
  }

  return createdPoints;

}
