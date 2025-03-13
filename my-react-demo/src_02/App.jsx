import { useState } from 'react';


const user = {
  name: 'Hedy Lamarr',
  imageUrl: 'https://i.imgur.com/yXOvdOSs.jpg',
  imageSize: 90,
};


const products = [
  { title: 'Cabbage', isFruit: false, id: 1 },
  { title: 'Garlic', isFruit: false, id: 2 },
  { title: 'Apple', isFruit: true, id: 3 },
];

function MyButton() {
  const [count, setCount] = useState(0);

  function handleClick() {
    // alert('You clicked me!');
    setCount(count + 1);
  }

  return (
    <button onClick={handleClick}>
      I'm a button and {count} clicks!
    </button>
  );
}


function GlobalButton({count, onClick}){
  return (
    <button onClick={onClick}>
      I'm a global count button! and {count} clicks!
    </button>
  );
}

export default function MyApp() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  const listItems = products.map(product =>
    <li
      key={product.id}
      style={{
        color: product.isFruit ? 'magenta' : 'darkgreen'
      }}
    >
      {product.title}
    </li>
  );



  return (
    <div>
      <h1>Welcome to my app</h1>
      <MyButton />
      <MyButton />
      <br />
      <GlobalButton count={count} onClick={handleClick} />
      <GlobalButton count={count} onClick={handleClick} />

      <h1>{user.name}</h1>
      <img
        className="avatar"
        src={user.imageUrl}
        alt={'Photo of ' + user.name}
        style={{
          width: user.imageSize,
          height: user.imageSize
        }}
      />
      <ul>{listItems}</ul>
    </div>
  );
}
