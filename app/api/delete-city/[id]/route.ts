import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    // A város létezik?
    const city = await prisma.city.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!city) {
      return NextResponse.json("A megadott azonosítóval nem létezik város!", { status: 404 });
    }

    // A törlendő város nem székhely város?
    const isSeatCity = await prisma.county.findFirst({
      where: { seat_id: Number(id) },
    });

    if (isSeatCity) {
      return NextResponse.json(
        { message: `A város nem törölhető, mert ${isSeatCity.name} székhelye!` },
        { status: 403 },
      );
    }
    await prisma.city.delete({
      where: {
        id: Number(id),
      },
    });
    return NextResponse.json({ message: "A város törölve lett!" });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ message: "Ismeretlen hiba lépett fel!" }, { status: 500 });
    }
  }
}
