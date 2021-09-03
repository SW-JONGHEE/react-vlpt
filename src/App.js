import Hello from "./Hello";
import './App.css';
import Wrapper from "./Wrapper";
import Counter from "./Counter";
import InputSample from "./InputSample";
import List from "./List";
import UserList from "./UserList";
import React, {useCallback, useMemo, useReducer, useRef, useState} from "react";
import CreateUser from "./CreateUser";
import useInputs from "./hooks/useInputs";
import produce from "immer";

function countActiveUsers(users) {
    console.log('활성 사용자 수를 세는중');
    return users.filter(user => user.active).length;
}

//useState -> useReducer
const initialState = {
    // inputs: {
    //     username: '',
    //     email: '',
    // },
    users: [
        {
            id: 1,
            username: 'velopert',
            email: 'velopert@gmail.com',
            active: true,
        },
        {
            id: 2,
            username: 'tester',
            email: 'tester@gmail.com',
            active: false,

        },
        {
            id: 3,
            username: 'jonghee',
            email: 'jonghee@gmail.com',
            active: false,

        },
    ],
};

function reducer (state, action) {
    switch (action.type) {
        // case 'CHANGE_INPUT':
        //     return {
        //         ...state,
        //         inputs: {
        //             ...state.inputs,
        //             [action.name] : action.value
        //         }
        //     };
        case 'CREATE_USER':
            // return {
            //     inputs: initialState.inputs,
            //     users: state.users.concat(action.user),
            // };
            return produce(state, draft => {
                draft.users.push(action.user);
            });
        case 'TOGGLE_USER':
            // return {
            //     /*
            //     * users => users.map(user =>
            //        user.id === id ? {...user, active: !user.active} : user
            //      )
            //     * */
            //
            //     ...state,
            //     users: state.users.map(user => user.id === action.id ? {
            //         ...user,
            //         active: !user.active
            //     } : user),
            // };

            return produce(state, draft => {
                const user = draft.users.find(user => user.id === action.id);
                user.active = !user.active;
            });

        case 'REMOVE_USER':
            // return {
            //     //users.filter(user => user.id !== id )
            //     ...state,
            //     users: state.users.filter(user => user.id !== action.id),
            // }

            return produce(state, draft => {
                const index = draft.users.findIndex(user => user.id === action.id);
                draft.users.splice(index, 1);
            });

        default:
            return state;
    }
}

//UserDispatch 라는 이름으로 내보내줍니다.
export const UserDispatch = React.createContext(null);


function App() {
  const name = "react";
  const style = {
    backgroundColor : 'black',
    color : 'aqua',
    fontsize : 24,
    padding : '1rem',
    marginTop : '10px',
  };

  // const [inputs, setInputs] = useState({
  //     username: '',
  //     email: '',
  // });
  //
  // const { username, email } = inputs;
  //
  // const onChange = useCallback((e) => {
  //     const { name, value } = e.target;
  //     // deps에 inputs를 넣어줘야한다.
  //     // setInputs({
  //     //     ...inputs,
  //     //     [name]: value
  //     // });
  //
  //     setInputs(inputs => ({
  //         ...inputs,
  //         [name]: value
  //     }));
  // }, []);
  //
  // const [users, setUsers] = useState([
  //     {
  //         id: 1,
  //         username: 'velopert',
  //         email: 'velopert@gmail.com',
  //         active: true,
  //     },
  //     {
  //         id: 2,
  //         username: 'tester',
  //         email: 'tester@gmail.com',
  //         active: false,
  //
  //     },
  //     {
  //         id: 3,
  //         username: 'jonghee',
  //         email: 'jonghee@gmail.com',
  //         active: false,
  //
  //     },
  // ]);
  //
  // const nextId = useRef(4);
  //
  // const onCreate = useCallback(() => {
  //
  //     const user = {
  //         id: nextId.current,
  //         username,
  //         email,
  //     };
  //     // setUsers(users.concat(user));
  //     // setUsers([...users, user]);
  //
  //     setUsers(users => users.concat(user));
  //
  //     setInputs({
  //         username: '',
  //         email: '',
  //     });
  //
  //   nextId.current += 1;
  // }, [username, email]);
  //
  // const onRemove = useCallback((id) => {
  //   // setUsers(users.filter(user => user.id !== id ));
  //     setUsers(users => users.filter(user => user.id !== id ));
  // }, []);
  //
  // const onToggle = useCallback(id => {
  //     // setUsers(users.map(user =>
  //     //   user.id === id ? { ...user, active: !user.active } : user
  //     // ));
  //
  //     setUsers(users => users.map(user =>
  //       user.id === id ? {...user, active: !user.active} : user
  //     ));
  //
  // }, []);
  //
  // const count = useMemo(() => countActiveUsers(users), [users]);

    const [{username, email}, onChange, onReset] = useInputs({
        username: '',
        email: '',
    });

  const [state, dispatch] = useReducer(reducer, initialState);

  const nextId = useRef(4);

  const { users } = state;

  // const { username, email } = state.inputs;

  // const onChange = useCallback(e => {
  //     const { name, value } = e.target;
  //     dispatch({
  //         type: 'CHANGE_INPUT',
  //         name,
  //         value,
  //     });
  //
  // }, []);

    const onCreate = useCallback(() => {
        dispatch({
            type: 'CREATE_USER',
            user: {
                id: nextId.current,
                username,
                email,
            }
        });
        onReset();
        nextId.current += 1;
    }, [username, email, onReset]);


    // const onToggle = useCallback(id => {
    //     // setUsers(users.map(user =>
    //     //   user.id === id ? { ...user, active: !user.active } : user
    //     // ));
    //
    //     // setUsers(users => users.map(user =>
    //     //   user.id === id ? {...user, active: !user.active} : user
    //     // ));
    //
    //     dispatch({
    //         type: 'TOGGLE_USER',
    //         id
    //     });
    //
    // }, []);

    // const onRemove = useCallback((id) => {
    //   // setUsers(users.filter(user => user.id !== id ));
    //     dispatch({
    //        type: 'REMOVE_USER',
    //         id,
    //     });
    //
    // }, []);

    const count = useMemo(() => countActiveUsers(users), [users]);


  return (
    <Wrapper>
        <Hello name="react" color="red" isSpecial={true}/>
        <Hello color="pink"/>
        <div style={style}>{name}</div>
        <div className="gray-box"></div>

        <div style={style}>Counter.js</div>
        <Counter />

        <div style={style}>InputSample.js</div>
        <InputSample />

        <div style={style}>List.js</div>
        <List />

        {/*<div style={style}>UserList.js</div>
        <UserList users={users} onRemove={onRemove}/>*/}

        <div style={style}>CreateUser.js</div>

        {/*UserDispatch라는 Context를 만들어서, 어디서든지 dispatch를 꺼내 쓸 수 있도록 준비 해준다*/}
        <UserDispatch.Provider value={dispatch}>
            <CreateUser
                username={username}
                email={email}
                onChange={onChange}
                onCreate={onCreate}
            />
            {/*<UserList users={users} onRemove={onRemove} onToggle={onToggle}/>*/}
            <UserList users={users} />
            <div>활성사용자 수  : {count}</div>
        </UserDispatch.Provider>
    </Wrapper>
  );
}

export default App;
