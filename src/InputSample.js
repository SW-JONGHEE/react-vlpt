import React, {useRef, useState} from 'react';

function InputSample() {
    const [inputs, setInputs] = useState({
        name : '',
        nickname : '',
    });

    const { name, nickname } = inputs;


    const [text, setText] = useState('');

    //초기화 버튼 선택시 input에 포커스가 옮겨지게!
    const nameInput = useRef();

    const onChange = (e) => {
        // setText(e.target.value);
        const { value, name } = e.target;

        setInputs({
            ... inputs,
            [name] : value
        });
    };

    const onReset = () => {
        // setText('');
        setInputs({
            name: '',
            nickname: '',
        });

        //초기화 버튼 선택시 input에 포커스가 옮겨지게!
        nameInput.current.focus();
    };

    return (
        <div>
            <input
                name="name"
                value={name}
                onChange={onChange}
                placeholder="이름"
                ref={nameInput}
            />
            <input
                name="nickname"
                value={nickname}
                onChange={onChange}
                placeholder="닉네임"
            />
            <button onClick={onReset}>초기화</button>
            <div>
                <b>값: {text}</b>
                {name} ({nickname})
            </div>
        </div>
    );
}

export default InputSample;