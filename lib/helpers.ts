import { AllDataPoints } from "./types";

export function safefiyDatapoint(d: AllDataPoints): AllDataPoints {

  d.createdAt = d.createdAt.toString() as unknown as Date;
  d.updatedAt = d.updatedAt.toString() as unknown as Date;

  return d

}

export function formatDate(d: Date, { minutes = false, hours = false, days = false, months = false, year = false }: { minutes?: boolean, hours?: boolean, days?: boolean, months?: boolean, year?: boolean }) {

  return ``


}
