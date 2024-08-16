'use client';

import { PlusCircle } from 'lucide-react';
import { useState } from 'react';
import { useQuery } from 'react-query';

import { PRIORITY_OPTIONS, STATUS_OPTIONS } from '../lib/constant';
import { customFetch, debounce } from '../lib/utils';

import EditableColumnDropdown from './editable-column-dropdown';
import EditableColumnInput from './editable-column-input';
import TodoCreate from './todo-create';
import TodoDelete from './todo-delete';
import { Button } from './ui/button';
import { Combobox } from './ui/combobox';
import { Input } from './ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

const TodoList = () => {
  const [openCreate, setOpenCreate] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [filterStatusValue, setFilterStatusValue] = useState('');
  const [filterPriorityValue, setFilterPriorityValue] = useState('');
  const [filterAssignValue, setFilterAssignValue] = useState('');
  const filter = {
    keyword,
    status: filterStatusValue,
    priority: filterPriorityValue,
    assign: filterAssignValue,
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
    }, 500);
  }

  return (
    <>
      <div className="flex flex-wrap justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          <Input
            placeholder="🔎  Filter task name..."
            className="w-[200px]"
            onChange={(e) => handleOnChangeKeyword(e.target.value)}
          />
          <Combobox
            options={STATUS_OPTIONS}
            onChange={setFilterStatusValue}
            value={filterStatusValue}
            placeholder="Filter status..."
          />
          <Combobox
            options={assignOptions}
            onChange={setFilterAssignValue}
            value={filterAssignValue}
            placeholder="Filter assign..."
          />
          <Combobox
            options={PRIORITY_OPTIONS}
            onChange={setFilterPriorityValue}
            value={filterPriorityValue}
            placeholder="Filter priority..."
          />
        </div>
        <div className="flex gap-2 justify-end">
          <Button onClick={() => setOpenCreate(true)}>
            <PlusCircle className="h-4 w-4 mr-2" />
            New Task
          </Button>
        </div>
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
                <TableCell colSpan={5} className="text-center">
                  <div className="flex gap-2 items-center justify-center p-2">
                    <div className="animate-spin text-xl">⏳</div>
                    please wait...
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              (records.length > 0) ? (
                records.map((rec) => (
                  <TableRow key={rec.id}>
                    <TableCell className="min-w-[164px]">
                      <EditableColumnDropdown
                        data={rec}
                        dataKey="status"
                        label="Status"
                        options={STATUS_OPTIONS}
                      />
                    </TableCell>
                    <TableCell className="min-w-[300px]">
                      <EditableColumnInput
                        data={rec}
                        dataKey="title"
                        label="Task Name"
                      />
                    </TableCell>
                    <TableCell className="min-w-[150px]">
                      <EditableColumnDropdown
                        data={rec}
                        dataKey="assign"
                        label="Assign"
                        options={assignOptions}
                      />
                    </TableCell>
                    <TableCell className="min-w-[150px]">
                      <EditableColumnDropdown
                        data={rec}
                        dataKey="priority"
                        label="Priority"
                        options={PRIORITY_OPTIONS}
                      />
                    </TableCell>
                    <TableCell className="min-w-[100px] text-center">
                      <TodoDelete id={rec.id} onSuccess={refetch} />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    <div className="flex gap-2 items-center justify-center p-2">
                      <div className="text-xl">📭</div>
                      no data
                    </div>
                  </TableCell>
                </TableRow>
              )
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