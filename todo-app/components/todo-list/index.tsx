'use client';

import React, { useState } from 'react'
import { PlusCircle } from 'lucide-react';

import { Input } from '../ui/input';
import { Button } from '../ui/button';

import TodoCreate from '../todo-create'

const TodoList = () => {
  const [openForm, setOpenForm] = useState(false);

  return (
    <>
      <div className="flex justify-between gap-4">
        <div>
          <Input placeholder="Filter tasks..." />
        </div>
        <Button variant="default" onClick={() => setOpenForm(true)}>
          <PlusCircle className="h-4 w-4 mr-2" />
          New Task
        </Button>
      </div>
      <TodoCreate open={openForm} onOpenChange={setOpenForm} />
    </>
  )
}

export default TodoList