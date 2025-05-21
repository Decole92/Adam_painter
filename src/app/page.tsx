import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CalendarClock, Paintbrush, User } from "lucide-react";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className='flex flex-col lg:max-h-screen h-full p-10'>
      <main className='flex-1 justify-center flex items-center'>
        <section className='container grid items-center gap-6 pb-8 pt-6 md:py-10 '>
          <div className='flex max-w-[980px] flex-col items-center gap-2'>
            <h1 className='text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl'>
              Painting Service Scheduling System
            </h1>
            <p className='max-w-[700px] text-lg text-muted-foreground text-center'>
              Easily schedule painting services and get matched with available
              painters.
            </p>
          </div>
          <div className='flex gap-4 justify-center'>
            <Link href='/painter'>
              <Button className='h-10 px-4 py-2' variant='default'>
                <Paintbrush className='mr-2 h-4 w-4' />
                Painter Portal
              </Button>
            </Link>
            <Link href='/customer'>
              <Button className='h-10 px-4 py-2' variant='outline'>
                <User className='mr-2 h-4 w-4' />
                Customer Portal
              </Button>
            </Link>
          </div>
          <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto w-full'>
            <div className='flex flex-col items-center gap-2 rounded-lg border p-6 text-center'>
              <div className='flex h-12 w-12 items-center justify-center rounded-full bg-primary/10'>
                <CalendarClock className='h-6 w-6 text-primary' />
              </div>
              <h3 className='text-lg font-semibold'>Painter Availability</h3>
              <p className='text-sm text-muted-foreground'>
                Painters can define their available time slots and view assigned
                bookings.
              </p>
            </div>
            <div className='flex flex-col items-center gap-2 rounded-lg border p-6 text-center'>
              <div className='flex h-12 w-12 items-center justify-center rounded-full bg-primary/10'>
                <User className='h-6 w-6 text-primary' />
              </div>
              <h3 className='text-lg font-semibold'>Customer Booking</h3>
              <p className='text-sm text-muted-foreground'>
                Customers can request a booking for a specific time slot and
                view upcoming bookings.
              </p>
            </div>
            <div className='flex flex-col items-center gap-2 rounded-lg border p-6 text-center'>
              <div className='flex h-12 w-12 items-center justify-center rounded-full bg-primary/10'>
                <Paintbrush className='h-6 w-6 text-primary' />
              </div>
              <h3 className='text-lg font-semibold'>Automatic Assignment</h3>
              <p className='text-sm text-muted-foreground'>
                The system automatically assigns the most available painter to
                each booking request.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
