
export interface Participant {
  id: string;
  name: string;
}

export interface BillItem {
  id: string;
  description: string;
  amount: number;
}

export interface Bill {
  id: string;
  title: string;
  date: Date;
  items: BillItem[];
  participants: string[]; // Participant IDs
  splits: Split[];
  totalAmount: number;
  category?: string; // Optional category field
  tags?: string[]; // Optional tags array
}

export interface Split {
  participantId: string;
  amount: number;
}

export interface Settlement {
  from: string; // Participant ID
  to: string; // Participant ID
  amount: number;
}

// Predefined categories for bills
export const BILL_CATEGORIES = [
  'Food & Dining',
  'Groceries',
  'Transportation',
  'Utilities',
  'Entertainment',
  'Housing',
  'Travel',
  'Shopping',
  'Health',
  'Other'
];
