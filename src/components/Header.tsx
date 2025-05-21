"use client";
import { Calendar, Home, Menu, Paintbrush, User, X } from "lucide-react";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { Button } from "./ui/button";

function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className='border-b max-w-full'>
      <div className='container flex h-16 items-center px-4 sm:px-6  justify-between'>
        <Link href='/' className='flex items-center gap-2 font-semibold'>
          <Paintbrush className='h-5 w-5 text-primary' />
          <span>Painter Booking</span>
        </Link>

        <div className='hidden sm:inline-block '>
          {pathname.includes("/painter") ? (
            <nav className=''>
              <Link href='/'>
                <Button variant='ghost' size='sm'>
                  <Home className='h-4 w-4 mr-2' />
                  Home
                </Button>
              </Link>
              <Link href='/painter'>
                <Button variant='ghost' size='sm'>
                  <Calendar className='h-4 w-4 mr-2' />
                  Availability
                </Button>
              </Link>
              <Link href='/painter/assigned'>
                <Button variant='ghost' size='sm'>
                  <Paintbrush className='h-4 w-4 mr-2' />
                  Assigned Booking
                </Button>
              </Link>
            </nav>
          ) : (
            <>
              {pathname?.includes("/customer") ? (
                <nav className='flex items-center gap-4'>
                  <Link href='/'>
                    <Button variant='ghost' size='sm'>
                      <Home className='h-4 w-4 mr-2' />
                      Home
                    </Button>
                  </Link>
                  <Link href='/customer'>
                    <Button variant='ghost' size='sm'>
                      <Calendar className='h-4 w-4 mr-2' />
                      Book Service
                    </Button>
                  </Link>
                  <Link href='/customer/booking'>
                    <Button variant='ghost' size='sm'>
                      <User className='h-4 w-4 mr-2' />
                      Upcoming Bookings
                    </Button>
                  </Link>
                </nav>
              ) : null}
            </>
          )}
        </div>

        <Button
          variant='ghost'
          size='icon'
          className='sm:hidden'
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className='h-6 w-6 ' />
          ) : (
            <Menu className='h-6 w-6' />
          )}
        </Button>
      </div>
      {mobileMenuOpen && (
        <div className='sm:hidden w-full'>
          {pathname.includes("/painter") ? (
            <nav className='flex flex-col items-center p-2 space-y-2 bg-gray-100 dark:bg-gray-900 gap-3 border-gray-900 border-b rounded-b-lg'>
              <Link href='/'>
                <Button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  variant='ghost'
                  size='sm'
                >
                  <Home className='h-4 w-4 mr-2' />
                  Home
                </Button>
              </Link>
              <Link href='/painter'>
                <Button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  variant='ghost'
                  size='sm'
                >
                  <Calendar className='h-4 w-4 mr-2' />
                  Availability
                </Button>
              </Link>
              <Link href='/painter/assigned'>
                <Button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  variant='ghost'
                  size='sm'
                >
                  <Paintbrush className='h-4 w-4 mr-2' />
                  Assigned Booking
                </Button>
              </Link>
            </nav>
          ) : (
            <>
              {pathname?.includes("/customer") ? (
                <nav className='flex flex-col items-center p-2 space-y-2 bg-gray-100 dark:bg-gray-900 gap-3 border-gray-900 border-b rounded-b-lg'>
                  <Link href='/'>
                    <Button
                      onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                      variant='ghost'
                      size='sm'
                    >
                      <Home className='h-4 w-4 mr-2' />
                      Home
                    </Button>
                  </Link>
                  <Link href='/customer'>
                    <Button
                      onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                      variant='ghost'
                      size='sm'
                    >
                      <Calendar className='h-4 w-4 mr-2' />
                      Book Service
                    </Button>
                  </Link>
                  <Link href='/customer/booking'>
                    <Button
                      onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                      variant='ghost'
                      size='sm'
                    >
                      <User className='h-4 w-4 mr-2' />
                      Upcoming Booking
                    </Button>
                  </Link>
                </nav>
              ) : null}
            </>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;
