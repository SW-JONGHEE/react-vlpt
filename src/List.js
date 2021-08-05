import React from 'react';

function List() {
    // 구조분해할당
    const { list } = {
        list: ['2021', '2020'],
        count: 2,
    };

    return (
        <div>
            { list }
        </div>
    );
}

export default List;