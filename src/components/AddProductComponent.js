import React, { useState } from 'react';
import ErrorComponent from './ErrorComponent';
import axios from 'axios';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';

const AddProductsComponent = ({history, setLoadProducts}) => {
    const initialState = {
        platePrice: '',
        plateName: '',
        category: ''
    }

    const [productItem, setProductItem] = useState(initialState);
    const [error, setError] = useState(false);

    const handleChange = e => {
        setProductItem({
           ...productItem,
           [e.target.name]: e.target.value  
        })
    }

    const onSubmit = async e => {
        e.preventDefault();

        if (productItem.platePrice === '' || productItem.plateName === '' || productItem.category === '') {
            setError(true);
            return;
        }
        setError(false);
        try {
            const result = await axios.post('http://localhost:4000/restaurant', {
                platePrice: productItem.platePrice,
                plateName: productItem.plateName,
                category: productItem.category
            });
            if (result.status === 201) {
                Swal.fire(
                    'Producto Creado',
                    'El producto se creó correctamente',
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
        // Redirigir al usuario
        setLoadProducts(true);
        history.push('/productos');
    }

    return ( 
        <div className="col-md-8 mx-auto ">
            <h1 className="text-center">Agregar Nuevo Producto</h1>
            {(error) ? <ErrorComponent message="Todos los campos son obligatorios"/> : null}
            <form className="mt-5" onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Nombre Platillo</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="plateName" 
                        placeholder="Nombre Platillo"
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Precio Platillo</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        name="platePrice"
                        placeholder="Precio Platillo"
                        onChange={handleChange}
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
                    />
                    <label className="form-check-label">
                        Ensalada
                    </label>
                </div>
                </div>

                <input type="submit" className="font-weight-bold text-uppercase mt-5 btn btn-primary btn-block py-3" value="Agregar Producto" />
            </form>
        </div>
     );
}
 
export default withRouter(AddProductsComponent);
