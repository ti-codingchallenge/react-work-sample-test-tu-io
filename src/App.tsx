import React from 'react';
import styled from 'styled-components';
import {TodosFooter} from './components/TodosFooter';
import {TodosHeader} from './components/TodosHeader';
import {OnSubmit, TodoInput} from './components/TodoInput';
import {TodoList} from './components/TodoList';
import {Todo} from './types';
import {TodoStatusBar} from './components/TodoStatusBar';
import {OnToggle} from './components/TodoItem';

export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 400px;
  margin: 0 auto;
  height: 100vh;
`;

export interface AppState {
  todos: Array<Todo>;
}

export const App: React.FC = () => {
  const [todos, setTodos] = React.useState<Todo[]>([]);

  React.useEffect(() => {
    (async () => {
      const response = await fetch(
        'http://localhost:3001/todos?_sort=createdTimestamp&_order=desc'
      );
      setTodos(await response.json());
    })();
  }, []);

  const createTodo: OnSubmit = async text => {
    const newTodo = {
      text,
      done: false,
      createdTimestamp: Date.now(),
    };

    const response = await fetch('http://localhost:3001/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTodo),
    });
    if (!response.ok) {
      window.alert(
        `Unexpected error ${response.status}: ${response.statusText}`
      );
      return text;
    }
    setTodos([await response.json(), ...todos]);
    return '';
  };

  const updateTodoStatus: OnToggle = async (id, done) => {
    const updatedTodo = {
      done,
    };

    const response = await fetch(`http://localhost:3001/todos/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTodo),
    });

    if (!response.ok) {
      window.alert(
        `Unexpected error ${response.status}: ${response.statusText}`
      );
      return;
    }

    setTodos(prevTodos => {
      const updatedTodos = prevTodos.map(todo =>
        todo.id === id ? {...todo, done: !todo.done} : todo
      );

      if (updatedTodos.every(todo => todo.done)) {
        window.alert(
          "Congratulations, you're all set! You've done everything on your list."
        );
      }

      return updatedTodos;
    });
  };

  return (
    <AppContainer className='App'>
      <TodosHeader>
        <TodoStatusBar todos={todos} />
      </TodosHeader>
      <TodoInput onSubmit={createTodo} />
      <TodoList todos={todos} updateTodoStatus={updateTodoStatus} />
      <TodosFooter>
        <TodoStatusBar todos={todos} />
      </TodosFooter>
    </AppContainer>
  );
};
