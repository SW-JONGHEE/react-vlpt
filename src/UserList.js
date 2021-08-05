import React from 'react';

function User({user}) {
    return (
        <div>
            <b>{user.username}</b> <span>({user.email})</span>
        </div>
    );
}

function UserList() {
    const users = [
        {
            id: 1,
            username: 'jonghee',
            email: 'jonghee@gmail.com',
        },
        {
            id:2,
            username: 'vlpt',
            email: 'vlpt@gmail.com',
        },
        {
            id: 3,
            username: 'tester',
            email: 'tester@gmail.com',
        },
    ]
  return (
   <div>
       {/*<User user={users[0]}/>*/}
       {/*<User user={users[1]}/>*/}
       {/*<User user={users[2]}/>*/}

       {users.map(user => (
           <User user={user} key={user.id}/>
       ))}
   </div>
  );
}

export default UserList;