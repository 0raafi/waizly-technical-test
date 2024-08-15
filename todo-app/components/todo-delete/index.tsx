import { Loader2, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useMutation } from 'react-query';

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '../ui/alert-dialog';
import { Button } from '../ui/button';
import { useToast } from '../ui/use-toast';

type TodoDeleteProps = {
  id: string;
  onSuccess: () => void;
}

const TodoDelete = ({ id, onSuccess }: TodoDeleteProps) => {
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const { toast } = useToast();
  const { mutate, isLoading } = useMutation({
    mutationFn: (payload: any) => fetch('api/todo', { method: 'DELETE', body: JSON.stringify(payload) }),
    onSuccess: async (res: any) => {
      toast({
        title: '🗑 Success',
        description: 'Task deleted successfully.',
        duration: 3000,
      })
      onSuccess();
      setOpenConfirmDelete(false);
    },
  });

  return (
    <AlertDialog open={openConfirmDelete} onOpenChange={setOpenConfirmDelete}>
      <AlertDialogTrigger>
        <Trash2 className="h-4 w-4 motion-reduce:transition-none transition ease-in-out hover:scale-110 text-destructive" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your task
            and remove your data from tasks list.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button variant="destructive" type="button" onClick={() => mutate({ id })}>
            {isLoading && (
              <Loader2 className="animate-spin h-4 w-4 mr-2" />
            )}
            Ok, Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default TodoDelete