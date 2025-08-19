export interface VenueDetails {
    name: string;
    address: string;
}

export interface TicketDetails {
    eventName: string;
    attendeeName: string;
    eventDate: string;
    eventTime: string;
    location: VenueDetails | null;
    ticketNumber: string;
    qrCodeData: string;
    readableCode: string;
}