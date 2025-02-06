import { useState } from "react";
import AccountCard from "@/components/banking/AccountCard";
import TransactionList from "@/components/banking/TransactionList";
import { useToast } from "@/hooks/use-toast";

type Transaction = {
  id: string;
  type: "credit" | "debit";
  amount: number;
  description: string;
  date: string;
};

const Index = () => {
  const { toast } = useToast();
  const [balance, setBalance] = useState(25420.55);
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "1",
      type: "credit",
      amount: 2500,
      description: "Salary Deposit",
      date: "2024-02-20",
    },
    {
      id: "2",
      type: "debit",
      amount: 85.5,
      description: "Amazon Purchase",
      date: "2024-02-19",
    },
    {
      id: "3",
      type: "debit",
      amount: 150,
      description: "Utility Bill",
      date: "2024-02-18",
    },
    {
      id: "4",
      type: "credit",
      amount: 500,
      description: "Freelance Payment",
      date: "2024-02-17",
    },
  ]);

  const handleTransfer = () => {
    const amount = 100; // Example amount
    if (balance >= amount) {
      const newTransaction: Transaction = {
        id: (transactions.length + 1).toString(),
        type: "debit",
        amount: amount,
        description: "Transfer to Account",
        date: new Date().toISOString().split('T')[0],
      };
      
      setBalance(prev => prev - amount);
      setTransactions(prev => [newTransaction, ...prev]);
      
      toast({
        title: "Transfer Successful",
        description: `$${amount} has been transferred successfully.`,
      });
    } else {
      toast({
        title: "Transfer Failed",
        description: "Insufficient balance.",
        variant: "destructive",
      });
    }
  };

  const handleDeposit = () => {
    const amount = 500; // Example amount
    const newTransaction: Transaction = {
      id: (transactions.length + 1).toString(),
      type: "credit",
      amount: amount,
      description: "Cash Deposit",
      date: new Date().toISOString().split('T')[0],
    };
    
    setBalance(prev => prev + amount);
    setTransactions(prev => [newTransaction, ...prev]);
    
    toast({
      title: "Deposit Successful",
      description: `$${amount} has been deposited to your account.`,
    });
  };

  const handleWithdraw = () => {
    const amount = 200; // Example amount
    if (balance >= amount) {
      const newTransaction: Transaction = {
        id: (transactions.length + 1).toString(),
        type: "debit",
        amount: amount,
        description: "Cash Withdrawal",
        date: new Date().toISOString().split('T')[0],
      };
      
      setBalance(prev => prev - amount);
      setTransactions(prev => [newTransaction, ...prev]);
      
      toast({
        title: "Withdrawal Successful",
        description: `$${amount} has been withdrawn from your account.`,
      });
    } else {
      toast({
        title: "Withdrawal Failed",
        description: "Insufficient balance.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-2xl md:text-3xl font-bold text-banking-text">
          Welcome back, John
        </h1>
        <AccountCard
          balance={balance}
          accountNumber="1234567890"
          onTransfer={handleTransfer}
          onDeposit={handleDeposit}
          onWithdraw={handleWithdraw}
        />
        <TransactionList transactions={transactions} />
      </div>
    </div>
  );
};

export default Index;