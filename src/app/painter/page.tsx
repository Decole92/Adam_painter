"use client";
import type React from "react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
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
import { Calendar, Clock } from "lucide-react";
import { Availability } from "../../../typing";

export default function PainterAvailabilityPage() {
  const [infoData, setInfoData] = useState({
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
  });
  const [availabilities, setAvailabilities] = useState<Availability[]>([]);
  const [loading, setLoading] = useState(false);

  const { startDate, startTime, endTime, endDate } = infoData;

  // For demo purposes, i'll use a fixed painter ID
  const painterId = "1";

  const fetchAvailabilities = async () => {
    try {
      const response = await fetch(
        `/api/availability/me?painterId=${painterId}`
      );

      if (response.ok) {
        const data = await response.json();
        setAvailabilities(data);
      }
    } catch (error) {
      console.error("Failed to fetch availabilities:", error);
    }
  };

  // Fetch availabilities on component mount
  useEffect(() => {
    fetchAvailabilities();
  }, [painterId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!startDate || !startTime || !endDate || !endTime) {
      toast.error("Missing information, Please fill in all fields");
      return;
    }

    const startDateTime = new Date(`${startDate}T${startTime}:00`);
    const endDateTime = new Date(`${endDate}T${endTime}:00`);

    console.log("startData", startDateTime);
    console.log("endDateTime", endDateTime);

    if (startDateTime >= endDateTime) {
      toast("Invalid time range, End time must be after start time");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/availability", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          painterId,
          startTime: startDateTime.toISOString(),
          endTime: endDateTime.toISOString(),
        }),
      });

      if (response.ok) {
        toast.success("Availability added Successfully.");

        // Reset form
        setInfoData({
          startDate: "",
          endDate: "",
          startTime: "",
          endTime: "",
        });

        // Refresh availabilities
        fetchAvailabilities();
      } else {
        const error = await response.json();
        toast.error("Failed to add availability");
      }
    } catch (error) {
      toast.error("Failed to add availability");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-12 px-5  overflow-x-hidden mt-4'>
      <Card className='px-2 max-w-full'>
        <CardHeader>
          <CardTitle>Add Availability</CardTitle>
          <CardDescription>
            Define when you're available for painting jobs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div className='grid gap-2'>
              <Label htmlFor='start-date'>Start Date</Label>
              <div className='relative'>
                <Calendar className='absolute left-3 top-2.5 h-4 w-4 text-muted-foreground' />
                <Input
                  id='start-date'
                  type='date'
                  value={startDate}
                  onChange={(e) =>
                    setInfoData((prev) => ({
                      ...prev,
                      startDate: e.target.value,
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
              <Label htmlFor='end-date'>End Date</Label>
              <div className='relative'>
                <Calendar className='absolute left-3 top-2.5 h-4 w-4 text-muted-foreground' />
                <Input
                  id='end-date'
                  type='date'
                  min={new Date().toISOString().split("T")[0]}
                  value={endDate}
                  onChange={(e) =>
                    setInfoData((prev) => ({
                      ...prev,
                      endDate: e.target.value,
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
              {loading ? "Adding..." : "Add Availability"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className='lg:col-span-2'>
        <CardHeader>
          <CardTitle>My Availability</CardTitle>
          <CardDescription>Your current available time slots</CardDescription>
        </CardHeader>
        <CardContent>
          {availabilities.length === 0 ? (
            <p className='text-center text-muted-foreground py-8'>
              No availability added yet
            </p>
          ) : (
            <div className='space-y-4'>
              {availabilities.map((availability) => (
                <div
                  key={availability.id}
                  className='flex flex-col p-4 border rounded-lg'
                >
                  <div className='flex items-center gap-2 text-sm font-medium'>
                    <Calendar className='h-4 w-4' />
                    <span>
                      {new Date(availability.startTime).toLocaleDateString()} -{" "}
                      {new Date(availability.endTime).toLocaleDateString()}
                    </span>
                  </div>
                  <div className='flex items-center gap-2 text-sm text-muted-foreground mt-1'>
                    <Clock className='h-4 w-4' />
                    <span>
                      {new Date(availability.startTime).toLocaleTimeString()} -{" "}
                      {new Date(availability.endTime).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
