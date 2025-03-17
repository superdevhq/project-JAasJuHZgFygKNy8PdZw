
import { useState } from 'react';
import { Bill, Participant } from '@/types';
import { BillList } from '@/components/BillList';
import { BillSearch } from '@/components/BillSearch';

interface BillListWithSearchProps {
  bills: Bill[];
  participants: Participant[];
  onRemoveBill: (id: string) => void;
  onSelectBill: (bill: Bill) => void;
}

export function BillListWithSearch({ 
  bills, 
  participants, 
  onRemoveBill, 
  onSelectBill 
}: BillListWithSearchProps) {
  const [filteredBills, setFilteredBills] = useState<Bill[]>(bills);

  return (
    <div className="space-y-4">
      <BillSearch 
        bills={bills} 
        onFilteredBillsChange={setFilteredBills} 
      />
      
      <BillList 
        bills={filteredBills}
        participants={participants}
        onRemoveBill={onRemoveBill}
        onSelectBill={onSelectBill}
      />
    </div>
  );
}
