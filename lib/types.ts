import type { DataPoint } from "@prisma/client";
export type UserData = {
  id: string;
  username: string;
  isAdmin: boolean;
};

type CustomDataPoint<T, R = "unknown"> = Omit<DataPoint, "data" | "type"> & { data: T, type: R }
export type DataPointNumber<T> = CustomDataPoint<number, T>

// These are all the datatypes we have
export type DataPointWeight = DataPointNumber<"weight">;
export type DataPointHeight = DataPointNumber<"height">;
export type DataPointFatPercent = DataPointNumber<"fat_percent">;
export type DataPointMusclePercent = DataPointNumber<"muscle_percent">;
export type DataPointTraining = CustomDataPoint<{
  type: string;
  reps: number;
  weight?: number;
}, "training">


export type AllDataPoints = DataPointWeight | DataPointHeight | DataPointFatPercent | DataPointMusclePercent | DataPointTraining;

export type DataPointParam = {
  [K in AllDataPoints["type"]]?:
  K extends DataPointTraining["type"] ? DataPointTraining["data"]
  : K extends DataPointWeight["type"] ? DataPointWeight["data"]
  : K extends DataPointMusclePercent["type"] ? DataPointMusclePercent["data"]
  : K extends DataPointFatPercent["type"] ? DataPointFatPercent["data"]
  : K extends DataPointHeight["type"] ? DataPointHeight["data"]
  : number;
}
