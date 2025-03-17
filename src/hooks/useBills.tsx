
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
      title: "Participant added",
      description: `${name} has been added to the group.`
    });
    return newParticipant;
  }, []);

  const removeParticipant = useCallback((id: string) => {
    setParticipants(prev => prev.filter(p => p.id !== id));
    setBills(prev => 
      prev.map(bill => ({
        ...bill,
        participants: bill.participants.filter(pId => pId !== id),
        splits: bill.splits.filter(split => split.participantId !== id)
      }))
    );
    toast({
      title: "Participant removed",
      description: "Participant has been removed from all bills."
    });
  }, []);

  const addBill = useCallback((bill: Omit<Bill, 'id'>) => {
    const newBill: Bill = {
      ...bill,
      id: crypto.randomUUID(),
    };
    setBills(prev => [...prev, newBill]);
    toast({
      title: "Bill added",
      description: `${bill.title} has been added.`
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
      description: "The bill has been updated successfully."
    });
  }, []);

  const removeBill = useCallback((id: string) => {
    setBills(prev => prev.filter(bill => bill.id !== id));
    toast({
      title: "Bill removed",
      description: "The bill has been removed."
    });
  }, []);

  const calculateSettlements = useCallback((): Settlement[] => {
    // Create a balance sheet for each participant
    const balances: Record<string, number> = {};
    
    // Initialize balances to zero
    participants.forEach(p => {
      balances[p.id] = 0;
    });
    
    // Calculate what each person paid and owes
    bills.forEach(bill => {
      bill.splits.forEach(split => {
        balances[split.participantId] -= split.amount;
      });
    });
    
    // Separate debtors and creditors
    const debtors: {id: string, amount: number}[] = [];
    const creditors: {id: string, amount: number}[] = [];
    
    Object.entries(balances).forEach(([id, balance]) => {
      if (balance < 0) {
        debtors.push({ id, amount: Math.abs(balance) });
      } else if (balance > 0) {
        creditors.push({ id, amount: balance });
      }
    });
    
    // Sort by amount (descending)
    debtors.sort((a, b) => b.amount - a.amount);
    creditors.sort((a, b) => b.amount - a.amount);
    
    // Calculate settlements
    const settlements: Settlement[] = [];
    
    while (debtors.length > 0 && creditors.length > 0) {
      const debtor = debtors[0];
      const creditor = creditors[0];
      
      const amount = Math.min(debtor.amount, creditor.amount);
      
      settlements.push({
        from: debtor.id,
        to: creditor.id,
        amount: Math.round(amount * 100) / 100 // Round to 2 decimal places
      });
      
      debtor.amount -= amount;
      creditor.amount -= amount;
      
      if (debtor.amount < 0.01) debtors.shift();
      if (creditor.amount < 0.01) creditors.shift();
    }
    
    return settlements;
  }, [bills, participants]);

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
