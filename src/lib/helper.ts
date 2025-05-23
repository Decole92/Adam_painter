import { v4 as uuidv4 } from "uuid";
import { Availability, Booking, Customer, Painter } from "../../typing";

// In-memory store
class Store {
  painters: Painter[] = [];
  customers: Customer[] = [];
  availabilities: Availability[] = [];
  bookings: Booking[] = [];

  constructor() {
    // Initialize with sample data
    this.painters = [
      { id: "1", name: "John Doe" },
      { id: "2", name: "Jane Smith" },
      { id: "3", name: "Bob Johnson" },
    ];

    this.customers = [
      { id: "1", name: "Alice Brown" },
      { id: "2", name: "Charlie Davis" },
    ];

    // Sample availabilities
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const dayAfterTomorrow = new Date();
    dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);

    this.availabilities = [
      {
        id: uuidv4(),
        painterId: "1",
        startTime: new Date(tomorrow.setHours(9, 0, 0, 0)).toISOString(),
        endTime: new Date(tomorrow.setHours(13, 0, 0, 0)).toISOString(),
      },
      {
        id: uuidv4(),
        painterId: "2",
        startTime: new Date(tomorrow.setHours(10, 0, 0, 0)).toISOString(),
        endTime: new Date(tomorrow.setHours(14, 0, 0, 0)).toISOString(),
      },
      {
        id: uuidv4(),
        painterId: "3",
        startTime: new Date(
          dayAfterTomorrow.setHours(9, 0, 0, 0)
        ).toISOString(),
        endTime: new Date(dayAfterTomorrow.setHours(17, 0, 0, 0)).toISOString(),
      },
    ];
  }

  // Painter methods
  getPainter(id: string): Painter | undefined {
    return this.painters.find((painter) => painter.id === id);
  }

  // Availability methods
  addAvailability(
    painterId: string,
    startTime: string,
    endTime: string
  ): Availability {
    const availability: Availability = {
      id: uuidv4(),
      painterId,
      startTime,
      endTime,
    };
    this.availabilities.push(availability);
    return availability;
  }

  getPainterAvailabilities(painterId: string): Availability[] {
    return this.availabilities.filter((a) => a.painterId === painterId);
  }

  // Booking methods
  createBooking(
    customerId: string,
    startTime: string,
    endTime: string
  ): Booking | { error: string } {
    // Find an available painter
    const availablePainter = this.findAvailablePainter(startTime, endTime);

    if (!availablePainter) {
      const closestSlot = this.findClosestAvailableSlot(startTime, endTime);

      if (closestSlot) {
        return {
          error: `No painters are available for the requested time slot. The closest available slot is from ${new Date(
            closestSlot.startTime
          ).toLocaleString()} to ${new Date(
            closestSlot.endTime
          ).toLocaleString()}.`,
        };
      }

      return {
        error: "No painters are available for the requested time slot.",
      };
    }

    const booking: Booking = {
      id: uuidv4(),
      customerId,
      painterId: availablePainter.id,
      startTime,
      endTime,
      status: "confirmed",
    };

    this.bookings.push(booking);
    return booking;
  }

  getCustomerBookings(customerId: string): Booking[] {
    console.log("getfunc", customerId);
    console.log("booking", this.bookings);
    return this.bookings.filter((b) => b.customerId === customerId);
  }

  getPainterBookings(painterId: string): Booking[] {
    return this.bookings.filter((b) => b.painterId === painterId);
  }

  // Helper methods
  findAvailablePainter(startTime: string, endTime: string): Painter | null {
    const start = new Date(startTime).getTime();
    const end = new Date(endTime).getTime();

    // Get all painters with availability that covers the requested time
    const availablePainters = this.painters.filter((painter) => {
      // Check if painter has any availability that covers the requested time
      const painterAvailabilities = this.availabilities.filter(
        (a) => a.painterId === painter.id
      );

      return painterAvailabilities.some((availability) => {
        const availStart = new Date(availability.startTime).getTime();
        const availEnd = new Date(availability.endTime).getTime();

        // Check if the requested time is within the painter's availability
        return availStart <= start && availEnd >= end;
      });
    });

    if (availablePainters.length === 0) {
      return null;
    }

    // If multiple painters are available, implement smart painter prioritization
    // For now, just return the first available painter
    // In a real implementation, we could consider workload, ratings, etc.
    return availablePainters[0];
  }

  findClosestAvailableSlot(
    startTime: string,
    endTime: string
  ): { startTime: string; endTime: string } | null {
    const requestedDuration =
      new Date(endTime).getTime() - new Date(startTime).getTime();

    // Get all availabilities sorted by start time
    const allAvailabilities = [...this.availabilities].sort(
      (a, b) =>
        new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
    );

    if (allAvailabilities.length === 0) {
      return null;
    }

    // Find the closest availability that can accommodate the requested duration
    for (const availability of allAvailabilities) {
      const availDuration =
        new Date(availability.endTime).getTime() -
        new Date(availability.startTime).getTime();
      if (availDuration >= requestedDuration) {
        return {
          startTime: availability.startTime,
          endTime: new Date(
            new Date(availability.startTime).getTime() + requestedDuration
          ).toISOString(),
        };
      }
    }

    return null;
  }
}

// Create a singleton instance
const store = new Store();

export default store;
