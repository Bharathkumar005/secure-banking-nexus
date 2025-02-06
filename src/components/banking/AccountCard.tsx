import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowDownLeft, Plus } from "lucide-react";

interface AccountCardProps {
  balance: number;
  accountNumber: string;
  onTransfer: () => void;
  onDeposit: () => void;
  onWithdraw: () => void;
}

const AccountCard = ({
  balance,
  accountNumber,
  onTransfer,
  onDeposit,
  onWithdraw,
}: AccountCardProps) => {
  return (
    <Card className="p-6 bg-banking-card shadow-lg animate-fade-in">
      <div className="space-y-4">
        <div>
          <p className="text-sm text-banking-text/60">Available Balance</p>
          <h2 className="text-3xl font-bold text-banking-text">
            ${balance.toLocaleString()}
          </h2>
        </div>
        <p className="text-sm text-banking-text/60">
          Account: **** {accountNumber.slice(-4)}
        </p>
        <div className="flex gap-3">
          <Button
            onClick={onTransfer}
            className="flex-1 bg-primary hover:bg-primary-dark"
          >
            <ArrowUpRight className="mr-2 h-4 w-4" />
            Transfer
          </Button>
          <Button
            onClick={onDeposit}
            variant="outline"
            className="flex-1 border-primary text-primary hover:bg-primary/10"
          >
            <Plus className="mr-2 h-4 w-4" />
            Deposit
          </Button>
          <Button
            onClick={onWithdraw}
            variant="outline"
            className="flex-1 border-primary text-primary hover:bg-primary/10"
          >
            <ArrowDownLeft className="mr-2 h-4 w-4" />
            Withdraw
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default AccountCard;