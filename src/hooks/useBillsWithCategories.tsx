
import { useState, useCallback } from 'react';
import { Bill, Participant, Settlement } from '@/types';
import { toast } from '@/hooks/use-toast';

export function useBillsWithCategories() {
  const [bills, setBills] = useState<Bill[]>([]);
  const [participants, setParticipants] = useState<Participant[]>([]);

  // ... keep existing code (addParticipant, removeParticipant)

  const addBill = useCallback((bill: Omit<Bill, 'id'>) => {
    const newBill: Bill = {
      ...bill,
      id: crypto.randomUUID(),
    };
    setBills(prev => [...prev, newBill]);
    toast({
      title: `"${bill.title}" added`,
      description: `Bill for $${bill.totalAmount.toFixed(2)} split among ${bill.participants.length} people.`
    });
    return newBill;
  }, []);

  const updateBill = useCallback((id: string, updates: Partial<Bill>) => {
    setBills(prev => 
      prev.map(bill => 
        bill.id === id ? { ...bill, ...updates } : bill
      )
    );
    toast({
      title: "Bill updated",
      description: "The bill details have been successfully updated."
    });
  }, []);

  // ... keep existing code (removeBill, calculateSettlements)

  // New function to get all unique tags
  const getAllTags = useCallback(() => {
    const tagsSet = new Set<string>();
    bills.forEach(bill => {
      if (bill.tags) {
        bill.tags.forEach(tag => tagsSet.add(tag));
      }
    });
    return Array.from(tagsSet);
  }, [bills]);

  // New function to filter bills by category
  const getBillsByCategory = useCallback((category: string | null) => {
    if (!category) return bills;
    return bills.filter(bill => bill.category === category);
  }, [bills]);

  // New function to filter bills by tag
  const getBillsByTag = useCallback((tag: string) => {
    return bills.filter(bill => bill.tags?.includes(tag));
  }, [bills]);

  // New function to search bills
  const searchBills = useCallback((searchTerm: string) => {
    if (!searchTerm.trim()) return bills;
    
    const term = searchTerm.toLowerCase();
    return bills.filter(bill => 
      bill.title.toLowerCase().includes(term) ||
      bill.items.some(item => item.description.toLowerCase().includes(term)) ||
      bill.totalAmount.toString().includes(term) ||
      bill.category?.toLowerCase().includes(term) ||
      bill.tags?.some(tag => tag.toLowerCase().includes(term))
    );
  }, [bills]);

  return {
    bills,
    participants,
    addParticipant,
    removeParticipant,
    addBill,
    updateBill,
    removeBill,
    calculateSettlements,
    getAllTags,
    getBillsByCategory,
    getBillsByTag,
    searchBills
  };
}
