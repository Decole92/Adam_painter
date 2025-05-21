import store from "@/lib/helper";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { customerId, startTime, endTime } = await request.json();

    if (!customerId || !startTime || !endTime) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const result = store.createBooking(customerId, startTime, endTime);

    if ("error" in result) {
      return NextResponse.json(result, { status: 404 });
    }

    const painter = store.getPainter(result.painterId);

    return NextResponse.json(
      {
        bookingId: result.id,
        painter: {
          id: painter?.id,
          name: painter?.name,
        },
        startTime: result.startTime,
        endTime: result.endTime,
        status: result.status,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "No painters are available for the requested time slot." },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const customerId = url.searchParams.get("customerId");
    const painterId = url.searchParams.get("painterId");

    if (customerId) {
      const bookings = store.getCustomerBookings(customerId);
      return NextResponse.json(bookings);
    }
    if (painterId) {
      const bookings = store.getPainterBookings(painterId);
      return NextResponse.json(bookings);
    }
    return NextResponse.json(
      { error: "Customer ID or Painter ID is required" },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}
