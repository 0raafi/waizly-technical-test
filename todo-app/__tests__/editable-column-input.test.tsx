// EditableColumnInput.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useMutation } from 'react-query';
import EditableColumnInput from '../components/editable-column-input';

jest.mock('react-query', () => ({
  useMutation: jest.fn(),
}));

const mockTodo: Todo = {
  assign: '001',
  created: '2024-08-16',
  expand: {
    assign: {
      name: 'Raafi',
    }
  },
  id: '1',
  priority: 'low',
  status: 'open',
  title: 'Test Task',
  updated: '2024-08-16'
};

describe('EditableColumnInput', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders initial state', () => {
    (useMutation as jest.Mock).mockReturnValue({
      mutate: jest.fn(),
      isLoading: false,
    });

    render(<EditableColumnInput data={mockTodo} dataKey="title" label="Task Name" />);

    expect(screen.getByText('🔖 Test Task')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('show input when edit button is clicked', () => {
    render(<EditableColumnInput data={mockTodo} dataKey="title" label="Task Name" />);

    const editButton = screen.getByRole('button');
    fireEvent.click(editButton);

    expect(screen.getByTestId('input-task')).toBeInTheDocument();
    expect(screen.getByTestId('input-task')).toHaveValue('Test Task');
  });

  it('calls mutate and value changed', async () => {
    const mutateMock = jest.fn().mockImplementation((payload, { onSuccess }) => {
      onSuccess();
    });

    (useMutation as jest.Mock).mockReturnValue({
      mutate: mutateMock,
      isLoading: false,
    });

    render(<EditableColumnInput data={mockTodo} dataKey="title" label="Task Name" />);

    const editButton = screen.getByRole('button');
    fireEvent.click(editButton);

    const input = screen.getByTestId('input-task');
    fireEvent.blur(input, { target: { value: 'Updated Task' } });

    expect(mutateMock).toHaveBeenCalledWith(
      expect.objectContaining({
        id: '1',
        title: 'Updated Task',
      }),
      expect.anything()
    );

    expect(screen.getByText('🔖 Updated Task')).toBeInTheDocument();
  });
});
