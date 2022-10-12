import { DataPoint, User } from "@prisma/client";
import { db } from "../db";
import type { AllDataPoints, DataPointParam } from "../types";

export function parseDataPoint(d: DataPoint): AllDataPoints {
  if (["weight", "fat_percent", "muscle_percent", "height"].includes(d.type)) {
    d.data = parseFloat(d.data) as unknown as string;
  } else {
    d.data = JSON.parse(d.data)
  }
  return d as unknown as AllDataPoints
}

export async function getAllForUser(userId: string) {

  const datapoints = await db.dataPoint.findMany({
    where: {
      creatorId: userId
    },
  })


  return datapoints.map(d => parseDataPoint(d));

}

export async function createDataPoints(user: User, points: DataPointParam): Promise<DataPoint[]> {

  const keys = Object.keys(points) as AllDataPoints["type"][];

  const createdPoints: DataPoint[] = [];

  for (const key of keys) {

    const data = points[key];

    if (
      (key === "weight" && typeof data === "number") ||
      (key === "training" && typeof data === "object") ||
      (key === "sleep" && typeof data === "object") ||
      (key === "muscle_percent" && typeof data === "number") ||
      (key === "fat_percent" && typeof data === "number") ||
      (key === "height" && typeof data === "number")
    ) {
      const d = await db.dataPoint.create({
        data: {
          type: key,
          creator: { connect: { id: user.id } },
          data: JSON.stringify(data)
        }
      })
      createdPoints.push(d)
    }
  }

  return createdPoints;

}
