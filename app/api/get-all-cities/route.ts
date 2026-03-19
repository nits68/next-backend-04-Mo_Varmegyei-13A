import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const res = await prisma.city.findMany({
    orderBy: { population: "desc" },
    omit: { id: true },
    include: {
      county: {
        omit: { id: true, seat_id: true },
      },
    },
  });

  // Új "számított" mező hozzáadása a meglévőkhöz
  const resWithRank = res.map((e, i) => ({
    ...e,
    rank: `${i + 1}.`,
  }));
  return NextResponse.json(resWithRank);
}
