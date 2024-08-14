'use client';

import { PlusCircle } from 'lucide-react';
import { useState } from 'react';
import { useQuery } from 'react-query';

import { customFetch, debounce } from '@/lib/utils';

import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

import TodoCreate from '../todo-create';

const TodoList = () => {
  const [openForm, setOpenForm] = useState(false);
  const [keyword, setKeyword] = useState('');
  const filter = {
    keyword,
  };
  const { data, isLoading, error, status, refetch } = useQuery(
    ['todoList', filter],
    customFetch('todo?' + new URLSearchParams(filter), { method: 'GET', })
  );
  const records: Todo[] = data?.records || [];

  const handleOnChangeKeyword = (val: string) => {
    debounce(() => {
      setKeyword(val)
    }, 1000);
  }

  return (
    <>
      <div className="flex flex-wrap justify-between gap-4">
        <div>
          <Input placeholder="🔎  Filter task name..." className="lg:w-[250px]" onChange={(e) => handleOnChangeKeyword(e.target.value)} />
        </div>
        <Button variant="default" onClick={() => setOpenForm(true)}>
          <PlusCircle className="h-4 w-4 mr-2" />
          New Task
        </Button>
      </div>
      <div className="border rounded-lg my-4">
        <Table className="">
          <TableHeader>
            <TableRow>
              <TableHead>Status</TableHead>
              <TableHead>Task Name</TableHead>
              <TableHead>Assign</TableHead>
              <TableHead>Priority</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.map((rec) => (
              <TableRow key={rec.id}>
                <TableCell>{rec.status}</TableCell>
                <TableCell>{rec.title}</TableCell>
                <TableCell>{rec.expand.assign.name}</TableCell>
                <TableCell>{rec.priority}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

      </div>
      <TodoCreate open={openForm} onOpenChange={setOpenForm} />
    </>
  )
}

export default TodoList