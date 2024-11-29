import React from 'react';
import styled from 'styled-components';
import {Todo} from '../types';
import {OnToggle, TodoItem} from './TodoItem';

export interface TodoListProps {
  todos: Array<Todo>;
  className?: string;
  updateTodoStatus: OnToggle;
}

const _TodoList: React.FC<TodoListProps> = ({
  todos,
  className,
  updateTodoStatus,
}) => {
  return (
    <ul data-cy='TodoList' className={className}>
      {todos.map((todo, index) => (
        <TodoItem key={index} todo={todo} onToggle={updateTodoStatus} />
      ))}
    </ul>
  );
};

export const TodoList = styled(_TodoList)`
  list-style: none;
  padding: 0;
`;
