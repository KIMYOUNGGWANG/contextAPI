import React from 'react';
import {createGlobalStyle} from "styled-components";
import TodoCreate from './components/TodoCreate';
import TodoHead from './components/TodoHead';
import TodoList from './components/TodoList';
import TodoTemlpate from './components/TodoTemlpate';
import { TodoProvider } from './TodoContext';

const GlobalStyle= createGlobalStyle`
  body {
    background: #e9ecef;
  }
`

function App() {
  return (
    <>
    <TodoProvider>
      <GlobalStyle/>
      <TodoTemlpate>
        <TodoHead/>
        <TodoList/>
        <TodoCreate/>
      </TodoTemlpate>
    </TodoProvider>
    </>
  );
}

export default App;
