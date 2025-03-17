
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
