import React , {useContext, useReducer, useRef, createContext} from 'react';


// 초기상태값

const initialTodos = [
    {
        id : 1,
        text: "프로젝트 생성하기",
        done:true
    },{
        id : 2,
        text: "컴포넌트 스타일링하기",
        done:true
    },{
        id : 3,
        text: "Context 만들기",
        done:false
    },{
        id : 4,
        text: "기능 구현하기",
        done:false
    }
];

/**
 * CREATE
 * REMOVE
 * TOGGLE
 */

const todoReducer=(state = initialTodos, action) =>{
    switch(action.type) {
        case "CREATE":
            return state.concat(action.todo);
        case "TOGGLE":
            return state.map(todo => todo.id === action.id ? {...todo, done:!todo.done} : todo)
        case "REMOVE":
            return state.filter(todo => todo.id !== action.id);
        default:
            return state;    
    }
}

const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const TodoNextIdContext = createContext();


export function TodoProvider({children}) {
    const [state, dispatch] = useReducer(todoReducer, initialTodos);
    const nextId = useRef(5);
    
    return (
        <TodoStateContext.Provider value={state}>
            <TodoDispatchContext.Provider value={dispatch}>
                <TodoNextIdContext.Provider value={nextId}>
                {children}
                </TodoNextIdContext.Provider>
            </TodoDispatchContext.Provider>
        </TodoStateContext.Provider>
    );
}

// custom hooks

export const useTodoState = ()=> {
    const context =  useContext(TodoStateContext);
    if(!context) {
        throw new Error("Can't find TodoProvider")
    }
    return context;
}

export const useTodoDispatch = () =>{
    const context =  useContext(TodoDispatchContext);
    if(!context) {
        throw new Error("Can't find TodoProvider")
    }
    return context;
}

export const useTodoNextId = () =>{
    const context =  useContext(TodoNextIdContext);
    if(!context) {
        throw new Error("Can't find TodoProvider")
    }
    return context;
}

/** 
 * state Context와 dispatch Context를 나눈 이유?
 * 1. 최적화를 위해서
 * 2. create에서는 dispatch만 필요한데 만약 두개를 같이 써버리면 상태를 같이 있기때문에 필요없는 렌더를 해버린다.
 * */ 
