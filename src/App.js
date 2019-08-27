import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProductsComponent from './components/ProductsComponent';
import EditProductsComponent from './components/EditProductsComponent';
import AddProductsComponent from './components/AddProductComponent';
import ItemProductComponent from './components/ItemProductComponent';
import HeaderComponent from './components/HeaderComponent';
import axios from 'axios';

function App() {

  const [products, setProducts] = useState([]);
  const [loadProducts, setLoadProducts] = useState(true);

  useEffect(() => {
    if (loadProducts) {
      const getData = async () => {
        const result = await axios.get('http://localhost:4000/restaurant');

        setProducts(result.data);
      }
      getData();
      setLoadProducts(false);
    }
  }, [loadProducts]);

  return (
    <Router>
      <HeaderComponent/>
      <main className="container mt-5">
        <Switch>
          <Route exact path="/productos" render={() => (<ProductsComponent products={products} setLoadProducts={setLoadProducts} />)}/>
          <Route exact path="/nuevo-producto" render={() => (<AddProductsComponent setLoadProducts={setLoadProducts}/>)}/>
          <Route exact path="/productos/:id" component={ItemProductComponent}/>
          <Route exact path="/productos/editar/:id" render={props => 
          { 
            const idProduct = parseInt(props.match.params.id);
            const product = products.filter(product => product.id === idProduct);
          return (
              <EditProductsComponent product={product[0]} setLoadProducts={setLoadProducts}/>
            )
          }}/>
        </Switch>
      </main>
    </Router> 
  );
}

export default App;
