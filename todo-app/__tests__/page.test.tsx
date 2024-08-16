// Home.test.tsx
import React from 'react';
import { render } from '@testing-library/react';

import Home from '../app/page';

jest.mock('../components/todo-list', () => {
  return function DummyTodoList() {
    return <div data-testid="todo-list">Todo List Component</div>;
  };
});

describe('Home', () => {
  it('renders the heading', () => {
    const { getByText } = render(<Home />);
    
    expect(getByText('🍉📝 todo app!')).toBeInTheDocument();
  });

  it('renders the TodoList', () => {
    const { getByTestId } = render(<Home />);
    
    expect(getByTestId('todo-list')).toBeInTheDocument();
  });

  it('applies the correct classes to the main element', () => {
    const { container } = render(<Home />);
    
    const mainElement = container.querySelector('main');
    expect(mainElement).toHaveClass('min-h-screen');
  });
});
