import { PRIORITY_OPTIONS, STATUS_OPTIONS } from '@/lib/constant';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { z } from 'zod';

import { Button } from './ui/button';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Form, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { useToast } from './ui/use-toast';

import SelectData from './select-data';
import SelectDataUser from './select-data-user';

type TodoCreateProps = {
  open: boolean
  onOpenChange: (isOpen: boolean) => void;
  onSuccess: () => void;
};

const TodoCreate = ({ open, onOpenChange, onSuccess }: TodoCreateProps) => {
  const { toast } = useToast();

  const formSchema = z.object({
    title: z.string().min(1, 'Task name is required!'),
    assign: z.string().min(1, 'Assign is required!'),
    status: z.string().min(1, 'Status is required!'),
    priority: z.string().min(1, 'Priority is required!'),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      assign: '',
      status: STATUS_OPTIONS[0].value,
      priority: PRIORITY_OPTIONS[0].value,
    },
  })

  const { mutate, isLoading } = useMutation({
    mutationFn: (payload: any) => fetch('api/todo', { method: 'POST', body: JSON.stringify(payload) }),
    onSuccess: async (res: any) => {
      toast({
        title: '✅ Success',
        description: 'Task created successfully.',
        duration: 3000,
      })

      form.reset();
      onOpenChange(false);
      onSuccess();
    },
    onError: (error: any) => {
      toast({
        title: '🙁 Error',
        description: '',
        duration: 3000,
      })
    }
  })

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    mutate(data);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!open) {
          form.reset();
        }

        onOpenChange(open);
      }}
    >
      <DialogContent>
        <DialogHeader className="text-left">
          <DialogTitle>New Task</DialogTitle>
        </DialogHeader>
        {open && (
          <div className="py-3">
            <Form {...form} >
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="title">Task name</FormLabel>
                      <Input id="title" placeholder="Input task name" {...field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="assign"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="assign">Assign</FormLabel>
                      <SelectDataUser {...field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="priority">Priority</FormLabel>
                      <SelectData
                        id="priority"
                        placeholder="Select priority"
                        options={PRIORITY_OPTIONS}
                        {...field}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel  htmlFor="status">Status</FormLabel>
                      <SelectData
                        id="status"
                        placeholder="Select status"
                        options={STATUS_OPTIONS}
                        {...field}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <DialogFooter className="pt-2">
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading && (
                      <Loader2 className="animate-spin h-4 w-4 mr-2" />
                    )}
                    Save
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default TodoCreate