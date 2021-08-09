import Hello from "./Hello";
import './App.css';
import Wrapper from "./Wrapper";
import Counter from "./Counter";
import InputSample from "./InputSample";
import List from "./List";
import UserList from "./UserList";
import {useRef, useState} from "react";
import CreateUser from "./CreateUser";

function App() {
  const name = "react";
  const style = {
    backgroundColor : 'black',
    color : 'aqua',
    fontsize : 24,
    padding : '1rem',
    marginTop : '10px',
  };

  const [inputs, setInputs] = useState({
      username: '',
      email: '',
  });

  const { username, email } = inputs;

  const onChange = (e) => {
      const { name, value } = e.target;
      setInputs({
          ...inputs,
          [name]: value
      });
  };

  const [users, setUsers] = useState([
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
  ]);

  const nextId = useRef(4);

  const onCreate = () => {

      const user = {
          id: nextId.current,
          username,
          email,
      };

      setUsers([...users, user]);
      // setUsers(users.concat(user));

      setInputs({
          username: '',
          email: '',
      });

    nextId.current += 1;
  };

  const onRemove = (id) => {
    setUsers(users.filter(user => user.id !== id ));
  };

  const onToggle = id => {
      setUsers(users.map(user =>
        user.id === id ? { ...user, active: !user.active } : user
      ));
  };

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
        <CreateUser
            username={username}
            email={email}
            onChange={onChange}
            onCreate={onCreate}
        />
        <UserList users={users} onRemove={onRemove} onToggle={onToggle}/>
    </Wrapper>
  );
}

export default App;
