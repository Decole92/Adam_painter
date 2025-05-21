"use client";

import { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, Clock, User } from "lucide-react";
import { Booking } from "../../../../typing";

export default function PainterBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const painterId = "1";
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(
          `/api/booking-request?painterId=${painterId}`
        );
        if (response.ok) {
          const data = await response.json();
          setBookings(data);
        }
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Assigned Bookings</CardTitle>
        <CardDescription>View all your upcoming painting jobs</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p className='text-center text-muted-foreground py-8'>
            Loading bookings...
          </p>
        ) : bookings.length === 0 ? (
          <p className='text-center text-muted-foreground py-8'>
            No bookings assigned yet
          </p>
        ) : (
          <div className='space-y-4'>
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className='flex flex-col p-4 border rounded-lg'
              >
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-2 font-medium'>
                    <User className='h-4 w-4' />
                    <span>Customer ID: {booking.customerId}</span>
                  </div>
                  <span className='text-xs px-2 py-1 rounded-full bg-green-100 text-green-800'>
                    {booking.status}
                  </span>
                </div>
                <div className='flex items-center gap-2 text-sm mt-2'>
                  <Calendar className='h-4 w-4' />
                  <span>
                    {new Date(booking.startTime).toLocaleDateString()}
                  </span>
                </div>
                <div className='flex items-center gap-2 text-sm text-muted-foreground mt-1'>
                  <Clock className='h-4 w-4' />
                  <span>
                    {new Date(booking.startTime).toLocaleTimeString()} -{" "}
                    {new Date(booking.endTime).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
