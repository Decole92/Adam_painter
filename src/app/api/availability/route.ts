import store from "@/lib/helper";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { painterId, startTime, endTime } = await request.json();

  if (!painterId || !startTime || !endTime) {
    throw new Error(
      "void painterId or you should select startTime, and endTime "
    );
  }

  try {
    if (!painterId || !startTime || !endTime) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const availability = store.addAvailability(painterId, startTime, endTime);
    revalidatePath("/painter");
    return NextResponse.json(availability, { status: 201 });
  } catch (error) {
    console.error("Error in fetch-links API:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
