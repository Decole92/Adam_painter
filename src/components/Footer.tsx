import React from "react";

function Footer() {
  return (
    <footer className='border-t py-6 bottom-0 absolute w-full'>
      <div className='container flex flex-col items-center justify-between gap-4 md:flex-row'>
        <p className='text-center text-sm text-muted-foreground'>
          &copy; {new Date().getFullYear()} Adam Painter Booking. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
