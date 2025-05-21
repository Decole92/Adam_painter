// Types
export interface Painter {
  id: string;
  name: string;
}

export interface Availability {
  id: string;
  painterId: string;
  startTime: string;
  endTime: string;
}

export interface Customer {
  id: string;
  name: string;
}

export interface Booking {
  id: string;
  customerId: string;
  painterId: string;
  startTime: string;
  endTime: string;
  status: "confirmed" | "cancelled";
}
