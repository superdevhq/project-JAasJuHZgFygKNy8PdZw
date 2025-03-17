
import { useState, useCallback } from 'react';
import { Bill, Participant, Settlement } from '@/types';
import { toast } from '@/hooks/use-toast';

export function useBills() {
  const [bills, setBills] = useState<Bill[]>([]);
  const [participants, setParticipants] = useState<Participant[]>([]);

  const addParticipant = useCallback((name: string) => {
    const newParticipant: Participant = {
      id: crypto.randomUUID(),
      name,
    };
    setParticipants(prev => [...prev, newParticipant]);
    toast({
      title: `${name} joined the group`,
      description: `You can now include ${name} in your bills and splits.`
    });
    return newParticipant;
  }, []);

  const removeParticipant = useCallback((id: string) => {
    // Get the name before removing
    const participantName = participants.find(p => p.id === id)?.name || 'Participant';
    
    setParticipants(prev => prev.filter(p => p.id !== id));
    setBills(prev => 
      prev.map(bill => ({
        ...bill,
        participants: bill.participants.filter(pId => pId !== id),
        splits: bill.splits.filter(split => split.participantId !== id)
      }))
    );
    toast({
      title: `${participantName} removed`,
      description: `${participantName} has been removed from the group and all associated bills.`
    });
  }, [participants]);

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

  const removeBill = useCallback((id: string) => {
    // Get the bill title before removing
    const billTitle = bills.find(b => b.id === id)?.title || 'Bill';
    
    setBills(prev => prev.filter(bill => bill.id !== id));
    toast({
      title: `"${billTitle}" removed`,
      description: "The bill and its splits have been removed from the group."
    });
  }, [bills]);

  // ... keep existing code (calculateSettlements function)

  return {
    bills,
    participants,
    addParticipant,
    removeParticipant,
    addBill,
    updateBill,
    removeBill,
    calculateSettlements
  };
}
