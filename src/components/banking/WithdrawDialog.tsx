import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const withdrawSchema = z.object({
  amount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Amount must be a positive number",
  }),
});

type WithdrawFormData = z.infer<typeof withdrawSchema>;

interface WithdrawDialogProps {
  onWithdraw: (amount: number) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const WithdrawDialog = ({ onWithdraw, open, onOpenChange }: WithdrawDialogProps) => {
  const form = useForm<WithdrawFormData>({
    resolver: zodResolver(withdrawSchema),
    defaultValues: {
      amount: "",
    },
  });

  const onSubmit = (data: WithdrawFormData) => {
    onWithdraw(Number(data.amount));
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Withdraw Money</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount ($)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Enter amount" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">Withdraw</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default WithdrawDialog;