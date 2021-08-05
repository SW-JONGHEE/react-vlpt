import Hello from "./Hello";
import './App.css';
import Wrapper from "./Wrapper";
import Counter from "./Counter";
import InputSample from "./InputSample";
import List from "./List";

function App() {
  const name = "react";
  const style = {
    backgroundColor : 'black',
    color : 'aqua',
    fontsize : 24,
    padding : '1rem',
    marginTop : '10px',
  }

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
    </Wrapper>
  );
}

export default App;
