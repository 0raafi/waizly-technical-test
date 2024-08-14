'use client';

import React, { useState } from 'react'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import TodoForm from '../todo-form'

const TodoList = () => {
  const [openForm, setOpenForm] = useState(false);

  return (
    <>
      <div className="flex justify-between gap-4">
        <div>
          <Input placeholder="Filter tasks..." />
        </div>
        <Button variant="default" onClick={() => setOpenForm(true)}>New Task</Button>
      </div>
      <TodoForm open={openForm} onOpenChange={setOpenForm} />
    </>
  )
}

export default TodoList