import { useState } from "react";

function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan='2'>{category}</th>
    </tr>
  );
}

function ProductRow({ product }) {
  const name = product.stocked ? product.name :
    <span style={{ color: 'red' }}>{product.name}</span>

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

function ProductTable({ products, filterText, inStock }) {
  const rows = []
  let lastCategory = null

  products.forEach((product) => {
    if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
      return;
    }
    if (inStock && !product.stocked) {
      return
    }
    if (product.category !== lastCategory) {
      rows.push(<ProductCategoryRow category={product.category} key={product.category} />)
    }
    rows.push(<ProductRow product={product} key={product.name}></ProductRow>)
    lastCategory = product.category
  })

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function SearchBar({ filterText, inStock, onFilterTextChange, onInStockChange }) {

  return (
    <form>
      <input type="text" value={filterText} placeholder="Search..." onChange={(e=> onFilterTextChange(e.target.value))}/>
      <label>
        <input type="checkbox" value={inStock} onChange={(e=> onInStockChange(e.target.checked))}/>
        {' '}
        Only show products in stock
      </label>
    </form>
  );
}

function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState('Apple')
  const [inStock, setInStock] = useState(false)

  return (
    <div>
      <SearchBar filterText={filterText} onFilterTextChange={setFilterText} inStock={inStock} onInStockChange={setInStock}/>
      <ProductTable products={products} filterText={filterText} inStock={inStock} />
    </div>
  );
}


export default function App() {
  return (
    <FilterableProductTable products={PRODUCTS} />
  );
}



const PRODUCTS = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
];


