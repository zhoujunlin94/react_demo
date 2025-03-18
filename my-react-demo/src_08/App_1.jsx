import { useState } from "react";
import {useImmer}

export default function Form(){
  const [person, setPerson] = useState({
    firstName: 'zhou',
    lastName: 'junlin',
    email: 'zhoujunlin.work@gmail.com',
  })

  function handleFirstNameChange(e){
    // 无效  修改了当前state  state应该是不可变对象
    // person.firstName = e.target.value

    setPerson({
      firstName: e.target.value,
      lastName: person.lastName,
      email: person.email,
    })
  }

  function handleLastNameChange(e){
    // person.lastName = e.target.value
    // 展开语法  但是繁琐 不适合嵌套深的情况
    setPerson({
      ...person,
      lastName: e.target.value
    })
  }

  function handleEmailChange(e){
    person.email = e.target.value
  }

  function handleChange(e){
    setPerson({
      ...person,
      [e.target.name]: e.target.value
    })
  }

  return (
    <>
      <label>
        FirstName:
        <input name="firstName" value={person.firstName} onChange={handleChange}/>
      </label>
      <label>
        LastName:
        <input name="lastName" value={person.lastName} onChange={handleChange}/>
      </label>
      <label>
        Email:
        <input name="email" value={person.email} onChange={handleChange}/>
      </label>
      <p>
        {person.firstName}{'  '}
        {person.lastName}{'  '}
        ({person.email})
      </p>
    </>
  );
}