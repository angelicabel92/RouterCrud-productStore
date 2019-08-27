import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const ProductsComponent = ({products, setLoadProducts}) => {

    const deleteProduct =  id => {
        console.log('eliminado', id);

        Swal.fire({
            title: '¿Estás seguro?',
            text: "No podrás recuperar el producto eliminado",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3c9a5f',
            cancelButtonColor: '#ea2f10',
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar'
        }).then( async (result) => {
            try {
                if (result.value) {
                    const url = `http://localhost:4000/restaurant/${id}`;
                    const resul = await axios.delete(url);
    
                    if (resul.status === 200) {
                        Swal.fire(
                            'Eliminado',
                            'El producto ha sido eliminado.',
                            'success'
                        )
                    }
                    setLoadProducts(true);
                }    
            } catch (error) {
                console.log(error);
                Swal.fire({
                    type: 'error',
                    title: 'Error',
                    text: 'Hubo un error vuelve a intentarlo'
                });
            }
        })
    }
    return (
        <Fragment>
            <h1>Productos</h1>
            <ul className="list-group mt-5">
                {products.map(product => (
                    <li className="list-group-item d-flex justify-content-between align-items-center" data-category={product.category} key={product.id}>
                        <p className="col-md-5 mb-0">{product.plateName}</p>
                        <strong className="col-md-3">{product.platePrice} €</strong>
                        <div>
                            <Link to={`/productos/editar/${product.id}`} className="btn btn-success mr-2">Editar</Link>
                            <button type="button" className="btn btn-danger" onClick={() => deleteProduct(product.id)}>Eliminar &times;</button>
                        </div>
                    </li>
                ))}
            </ul>
        </Fragment> 
     );
}
 
export default ProductsComponent;
