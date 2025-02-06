import { useState } from "react";
import AccountCard from "@/components/banking/AccountCard";
import TransactionList from "@/components/banking/TransactionList";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const { toast } = useToast();
  const [balance] = useState(25420.55);
  const [transactions] = useState([
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
    toast({
      title: "Transfer",
      description: "Transfer feature coming soon!",
    });
  };

  const handleDeposit = () => {
    toast({
      title: "Deposit",
      description: "Deposit feature coming soon!",
    });
  };

  const handleWithdraw = () => {
    toast({
      title: "Withdraw",
      description: "Withdraw feature coming soon!",
    });
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