import store from "@/lib/helper";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const painterId = url.searchParams.get("painterId");
    console.log("painterId", painterId);
    if (!painterId) {
      return NextResponse.json(
        { error: "Painter ID is required" },
        { status: 400 }
      );
    }

    const availabilities = store.getPainterAvailabilities(painterId);
    revalidatePath("/painter");
    return NextResponse.json(availabilities);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch availabilities" },
      { status: 500 }
    );
  }
}
