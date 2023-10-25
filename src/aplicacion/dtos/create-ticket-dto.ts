export class CreateTicketDto {
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  category: 'incident' | 'support' | 'error';
  status: 'pending' | 'verified' | 'approved' | 'rejected';
}
