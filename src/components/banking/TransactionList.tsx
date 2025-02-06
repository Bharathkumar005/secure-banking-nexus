import { Card } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownLeft } from "lucide-react";

interface Transaction {
  id: string;
  type: "credit" | "debit";
  amount: number;
  description: string;
  date: string;
}

interface TransactionListProps {
  transactions: Transaction[];
}

const TransactionList = ({ transactions }: TransactionListProps) => {
  return (
    <Card className="p-6 bg-banking-card">
      <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <div className="flex items-center gap-3">
              <div
                className={`p-2 rounded-full ${
                  transaction.type === "credit"
                    ? "bg-success/10 text-success"
                    : "bg-primary/10 text-primary"
                }`}
              >
                {transaction.type === "credit" ? (
                  <ArrowDownLeft className="h-5 w-5" />
                ) : (
                  <ArrowUpRight className="h-5 w-5" />
                )}
              </div>
              <div>
                <p className="font-medium text-banking-text">
                  {transaction.description}
                </p>
                <p className="text-sm text-banking-text/60">{transaction.date}</p>
              </div>
            </div>
            <p
              className={`font-semibold ${
                transaction.type === "credit"
                  ? "text-success"
                  : "text-banking-text"
              }`}
            >
              {transaction.type === "credit" ? "+" : "-"}$
              {transaction.amount.toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default TransactionList;