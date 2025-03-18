import { useImmer } from 'use-immer'

export default function Form(){
  const [person, updatePerson] = useImmer({
      firstName: 'zhou',
      lastName: 'junlin',
      email: 'zhoujunlin.work@gmail.com',
    })

  function handleChange(e){
    updatePerson(draft => {
      draft[e.target.name] = e.target.value
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