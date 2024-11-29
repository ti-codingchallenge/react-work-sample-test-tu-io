import React from 'react';
import styled from 'styled-components';
import {Todo} from '../types';

const InfoBar = styled.div`
  display: flex;
  justify-content: space-between;
`;

export interface TodoStatusBarProps {
  className?: string;
  todos: Array<Todo>;
}

const _TodoStatusBar: React.FC<TodoStatusBarProps> = ({className, todos}) => (
  <div data-cy='TodoStatusBar' className={className}>
    <InfoBar>
      <span>Total: {todos.length}</span>
      <span>Done: {todos.filter(todo => todo.done).length}</span>
    </InfoBar>
  </div>
);

export const TodoStatusBar = styled(_TodoStatusBar)`
  display: flex;
  flex-direction: column;
`;
