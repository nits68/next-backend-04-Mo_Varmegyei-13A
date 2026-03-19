import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const res = await prisma.county.groupBy({
    by: ["country_part"],
    _count: {
      id: true,
    },
    _avg: {
      population: true,
    },
  });

  // Mezőnevek "átmepelése"
  const resWithCorrectFieldnames = res.map((e) => ({
    country_part: e.country_part,
    count: e._count.id,
    avg_pop: e._avg.population,
  }));
  return NextResponse.json(resWithCorrectFieldnames);
}
