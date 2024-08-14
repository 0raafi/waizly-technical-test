import { PRIORITY_OPTIONS, STATUS_OPTIONS } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import SelectData from '../select-data';
import SelectUser from '../select-user';

type TodoFormProps = {
  open: boolean
  onOpenChange: (isOpen: boolean) => void
};

const TodoForm = ({ open, onOpenChange }: TodoFormProps) => {
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader className="text-left">
          <DialogTitle>New Task</DialogTitle>
        </DialogHeader>
        {open && (
          <div className="py-3">
            <Form {...form} >
              <form onSubmit={form.handleSubmit(console.log)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Task name</FormLabel>
                      <Input placeholder="Input task name" {...field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="assign"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Assign</FormLabel>
                      <SelectUser {...field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Priority</FormLabel>
                      <SelectData
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
                      <FormLabel>Status</FormLabel>
                      <SelectData
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
                  <Button type="submit">Save</Button>
                </DialogFooter>
              </form>
            </Form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default TodoForm