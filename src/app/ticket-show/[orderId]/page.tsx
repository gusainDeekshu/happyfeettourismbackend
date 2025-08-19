import { notFound } from 'next/navigation';
import TicketView from './TicketView';

interface VenueDetails {
  name: string;
  address: string;
}

interface TicketDetails {
  eventName:string;
  attendeeName: string;
  eventDate: string;
  eventTime: string;
  location: VenueDetails | null;
  ticketNumber: string;
  qrCodeData: string;
  readableCode: string;
}

interface PageParams {
  params: {
    orderId: string;
  };
}

async function getTicketDetails(orderId: string): Promise<TicketDetails | null> {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/tickets/public/${orderId}/details`;

  try {
    const res = await fetch(apiUrl, { cache: 'no-store' });

    if (!res.ok) {
      return null;
    }

    return res.json();
  } catch (error) {
    console.error("API Fetch Error:", error);
    return null;
  }
}

export default async function TicketShowPage({ params }: PageParams) {
  const { orderId } =await params;
  const ticket = await getTicketDetails(orderId);

  if (!ticket) {
    notFound();
  }

  return <TicketView ticket={ticket} />;
}