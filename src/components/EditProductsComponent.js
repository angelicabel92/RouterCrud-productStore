import React, { useState, useRef } from 'react';
import ErrorComponent from './ErrorComponent';
import axios from 'axios';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';

const EditProductsComponent = (props) => {

    const {history, product, setLoadProducts} = props;

    const platePriceRef = useRef('');
    const plateNameRef = useRef('');

    const [categoryItem, setCategoryItem] = useState('');
    const [error, setError] = useState(false);

    const handleChange = e => {
        setCategoryItem({
           ...categoryItem,
           [e.target.name]: e.target.value  
        })
    }

    const onSubmit = async e => {
        e.preventDefault();

        const newValueProducts = {
            platePrice: platePriceRef.current.value,
            plateName: plateNameRef.current.value, 
        }

        if (newValueProducts.platePrice === '' || newValueProducts.platePrice === '' || categoryItem === '') {
            setError(true);
            return;
        }
        
        setError(false);

        let categoryProduct = (categoryItem === '') ? product.category : categoryItem;

        const editProduct = {
            platePrice: newValueProducts.platePrice,
            plateName: newValueProducts.platePrice, 
            category: categoryProduct
        }
        const url = `http://localhost:4000/restaurant/${product.id}`;

        try {
            const result = await axios.put(url, editProduct);
            if (result.status === 200) {
                Swal.fire(
                    'Producto Modificado',
                    'El producto se actualizó correctamente',
                    'success'
                );
            }
        } catch (error) {
        console.log(error);

        Swal.fire({
            type: 'error',
            title: 'Error',
            text: 'Hubo un error vuelve a intentarlo'
          });
        }

        setLoadProducts(true);
        history.push('/productos');
    };

    return ( 
        <div className="col-md-8 mx-auto ">
            <h1 className="text-center">Editar Producto</h1>
            {(error) ? <ErrorComponent message="Todos los campos son obligatorios"/> : null}
            <form className="mt-5" onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Nombre Platillo</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="plateName" 
                        placeholder="Nombre Platillo"
                        ref={plateNameRef}
                        defaultValue={product.plateName}
                    />
                </div>

                <div className="form-group">
                    <label>Precio Platillo</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        name="platePrice"
                        placeholder="Precio Platillo"
                        ref={platePriceRef}
                        defaultValue={product.platePrice}
                    />
                </div>

                <legend className="text-center">Categoría:</legend>
                <div className="text-center">
                <div className="form-check form-check-inline">
                    <input 
                        className="form-check-input" 
                        type="radio" 
                        name="category"
                        value="postre"
                        onChange={handleChange}
                        defaultChecked={(product.category === 'postre')}
                    />
                    <label className="form-check-label">
                        Postre
                    </label>
                </div>
                <div className="form-check form-check-inline">
                    <input 
                        className="form-check-input" 
                        type="radio" 
                        name="category"
                        value="bebida"
                        onChange={handleChange}
                        defaultChecked={(product.category === 'bebida')}
                    />
                    <label className="form-check-label">
                        Bebida
                    </label>
                </div>

                <div className="form-check form-check-inline">
                    <input 
                        className="form-check-input" 
                        type="radio" 
                        name="category"
                        value="cortes"
                        onChange={handleChange}
                        defaultChecked={(product.category === 'cortes')}
                    />
                    <label className="form-check-label">
                        Cortes
                    </label>
                </div>

                <div className="form-check form-check-inline">
                    <input 
                        className="form-check-input" 
                        type="radio" 
                        name="category"
                        value="ensalada"
                        onChange={handleChange}
                        defaultChecked={(product.category === 'ensalada')}
                    />
                    <label className="form-check-label">
                        Ensalada
                    </label>
                </div>
                </div>

                <input type="submit" className="font-weight-bold text-uppercase mt-5 btn btn-primary btn-block py-3" value="Editar Producto" />
            </form>
        </div>

     );
}
 
export default withRouter(EditProductsComponent);
