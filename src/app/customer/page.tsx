"use client";

import type React from "react";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Calendar, Clock, Info, User } from "lucide-react";

export default function CustomerBookingPage() {
  const [infoData, setInfoData] = useState({
    date: "",
    startTime: "",
    endTime: "",
  });
  const [loading, setLoading] = useState(false);
  const [bookingResult, setBookingResult] = useState<any>(null);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const { date, startTime, endTime } = infoData;
  // For demo purposes, i'll use a fixed customer ID
  const customerId = "1";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!date || !startTime || !endTime) {
      toast.error("Missing information: Please fill in all fields");
      return;
    }

    const startDateTime = new Date(`${date}T${startTime}:00`);
    const endDateTime = new Date(`${date}T${endTime}:00`);

    if (startDateTime >= endDateTime) {
      toast("End time must be after start time");
      return;
    }

    setLoading(true);
    setBookingResult(null);
    setBookingError(null);

    try {
      const response = await fetch("/api/booking-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerId,
          startTime: startDateTime.toISOString(),
          endTime: endDateTime.toISOString(),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setBookingResult(data);
        toast("Booking confirmed.. Your painting service has been booked");
      } else {
        setBookingError(data.error || "Failed to book service");
        toast.error("Book failed...");
      }
    } catch (error) {
      setBookingError("Failed to book service");
      toast.error("Failed to book service");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-12 px-5  overflow-x-hidden mt-4'>
      <Card className=''>
        <CardHeader>
          <CardTitle>Book a Painting Service</CardTitle>
          <CardDescription>
            Request a time slot for your painting job
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div className='grid gap-2'>
              <Label htmlFor='date'>Date</Label>
              <div className='relative'>
                <Calendar className='absolute left-3 top-2.5 h-4 w-4 text-muted-foreground' />
                <Input
                  id='date'
                  type='date'
                  value={date}
                  onChange={(e) =>
                    setInfoData((prev) => ({
                      ...prev,
                      date: e.target.value,
                    }))
                  }
                  min={new Date().toISOString().split("T")[0]}
                  className='pl-10'
                />
              </div>
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='start-time'>Start Time</Label>
              <div className='relative'>
                <Clock className='absolute left-3 top-2.5 h-4 w-4 text-muted-foreground' />
                <Input
                  id='start-time'
                  type='time'
                  value={startTime}
                  onChange={(e) =>
                    setInfoData((prev) => ({
                      ...prev,
                      startTime: e.target.value,
                    }))
                  }
                  className='pl-10'
                />
              </div>
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='end-time'>End Time</Label>
              <div className='relative'>
                <Clock className='absolute left-3 top-2.5 h-4 w-4 text-muted-foreground' />
                <Input
                  id='end-time'
                  type='time'
                  value={endTime}
                  onChange={(e) =>
                    setInfoData((prev) => ({
                      ...prev,
                      endTime: e.target.value,
                    }))
                  }
                  className='pl-10'
                />
              </div>
            </div>
            <Button type='submit' disabled={loading} className='w-full'>
              {loading ? "Booking..." : "Book Service"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className='space-y-6 lg:col-span-2'>
        {bookingResult && (
          <Card className='border-green-200 bg-green-50'>
            <CardHeader>
              <CardTitle className='text-green-800'>
                Booking Confirmed
              </CardTitle>
              <CardDescription className='text-green-700'>
                Your painting service has been scheduled
              </CardDescription>
            </CardHeader>
            <CardContent className='text-green-800'>
              <div className='space-y-2'>
                <div className='flex items-center gap-2'>
                  <User className='h-4 w-4' />
                  <span>Painter: {bookingResult.painter.name}</span>
                </div>
                <div className='flex items-center gap-2'>
                  <Calendar className='h-4 w-4' />
                  <span>
                    {new Date(bookingResult.startTime).toLocaleDateString()}
                  </span>
                </div>
                <div className='flex items-center gap-2'>
                  <Clock className='h-4 w-4' />
                  <span>
                    {new Date(bookingResult.startTime).toLocaleTimeString()} -{" "}
                    {new Date(bookingResult.endTime).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {bookingError && (
          <Alert variant='destructive'>
            <Info className='h-4 w-4' />
            <AlertTitle>Booking Failed</AlertTitle>
            <AlertDescription>{bookingError}</AlertDescription>
          </Alert>
        )}

        <Card>
          <CardHeader>
            <CardTitle>How It Works</CardTitle>
            <CardDescription>
              Our booking process is simple and efficient
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ol className='space-y-4 list-decimal list-inside text-sm'>
              <li className='text-muted-foreground'>
                <span className='font-medium text-foreground'>
                  Select your preferred date and time
                </span>
                <p className='pl-6 mt-1'>
                  Choose when you need the painting service
                </p>
              </li>
              <li className='text-muted-foreground'>
                <span className='font-medium text-foreground'>
                  Submit your booking request
                </span>
                <p className='pl-6 mt-1'>
                  We'll automatically find an available painter
                </p>
              </li>
              <li className='text-muted-foreground'>
                <span className='font-medium text-foreground'>
                  Get instant confirmation
                </span>
                <p className='pl-6 mt-1'>
                  If a painter is available, your booking is confirmed
                  immediately
                </p>
              </li>
              <li className='text-muted-foreground'>
                <span className='font-medium text-foreground'>
                  View your bookings
                </span>
                <p className='pl-6 mt-1'>
                  Check your upcoming appointments in the "My Bookings" section
                </p>
              </li>
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
