import React from 'react';

interface VenueDetails {
  name: string;
  address: string;
}

interface TicketDetails {
  eventName: string;
  attendeeName: string;
  eventDate: string;
  eventTime: string;
  location: VenueDetails | null;
  ticketNumber: string;
  qrCodeData: string;
  readableCode: string;
}

interface TicketDisplayProps {
  ticket: TicketDetails;
}

const TicketDisplay: React.FC<TicketDisplayProps> = ({ ticket }) => {
  return (
    <div className="border rounded-lg shadow-md p-4">
      <h2 className="text-xl font-semibold mb-2">{ticket.eventName}</h2>
      <p className="text-gray-700">
        <strong>Attendee:</strong> {ticket.attendeeName}
      </p>
      <p className="text-gray-700">
        <strong>Date:</strong> {ticket.eventDate}
      </p>
      <p className="text-gray-700">
        <strong>Time:</strong> {ticket.eventTime}
      </p>
      {ticket.location && (
        <div>
          <h3 className="text-lg font-semibold mt-2">Location</h3>
          <p className="text-gray-700">
            <strong>{ticket.location.name}</strong>
          </p>
          <p className="text-gray-700">{ticket.location.address}</p>
        </div>
      )}
      <p className="text-gray-700">
        <strong>Ticket Number:</strong> {ticket.ticketNumber}
      </p>
      <p className="text-gray-700">
        <strong>Readable Code:</strong> {ticket.readableCode}
      </p>
      <img src={ticket.qrCodeData} alt="QR Code" className="mt-4 w-32 h-32" />
    </div>
  );
};

export default TicketDisplay;