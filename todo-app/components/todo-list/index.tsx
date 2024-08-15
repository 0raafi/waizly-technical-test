'use client';

import { PlusCircle } from 'lucide-react';
import { useState } from 'react';
import { useQuery } from 'react-query';

import { PRIORITY_OPTIONS, STATUS_OPTIONS } from '../../lib/constant';
import { customFetch, debounce } from '../../lib/utils';

import EditableColumnDropdown from '../editable-column-dropdown';
import EditableColumnInput from '../editable-column-input';
import TodoCreate from '../todo-create';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import TodoDelete from '../todo-delete';

const TodoList = () => {
  const [openCreate, setOpenCreate] = useState(false);
  const [keyword, setKeyword] = useState('');
  const filter = {
    keyword,
  };

  const { data: dataUser } = useQuery('user', customFetch('user', { method: 'GET' }));
  const assignOptions = (dataUser?.records || []).map((item: { id: string; name: string }) => ({
    value: item.id,
    label: item.name,
  }));

  const { data, isLoading, refetch } = useQuery(
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
        <Button variant="default" onClick={() => setOpenCreate(true)}>
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
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  <div className="flex gap-2 items-center justify-center">
                    <div className="animate-bounce text-lg">🚀</div>
                    Loading...
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              records.map((rec) => (
                <TableRow key={rec.id}>
                  <TableCell>
                    <EditableColumnDropdown
                      data={rec}
                      dataKey="status"
                      label="Status"
                      options={STATUS_OPTIONS}
                    />
                  </TableCell>
                  <TableCell>
                    <EditableColumnInput
                      data={rec}
                      dataKey="title"
                      label="Task Name"
                    />
                  </TableCell>
                  <TableCell>
                    <EditableColumnDropdown
                      data={rec}
                      dataKey="assign"
                      label="Assign"
                      options={assignOptions}
                    />
                  </TableCell>
                  <TableCell>
                    <EditableColumnDropdown
                      data={rec}
                      dataKey="priority"
                      label="Priority"
                      options={PRIORITY_OPTIONS}
                    />
                  </TableCell>
                  <TableCell>
                    <TodoDelete id={rec.id} onSuccess={refetch} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

      </div>
      <TodoCreate
        open={openCreate}
        onOpenChange={setOpenCreate}
        onSuccess={refetch}
      />
    </>
  )
}

export default TodoList