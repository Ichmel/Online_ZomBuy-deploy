import React from 'react';
import { cartActions } from '../../../redux/slices/cartSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import { useHistory } from 'react-router-dom';

import { motion } from 'framer-motion';

function Cartsidebar() {

  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.cartItems);

  const totalAmount = useSelector((state) => state.cart.totalAmount);

  const totalQuantity = useSelector(state => state.cart.totalQuantity)
  const history = useHistory();

  const handleClick = () => {
    // Pour naviguer vers une autre route
    history.push('/checkout');
  }

  return (
    <section className=" pb-3  ">
      <Container className='mt-2 mb-5'>
        <Row>
          <Col   >
            {
              cartItems.length === 0 ? (
                <h5 className='fs-4 text-center'>Aucun produit dans le panier</h5>
              ) : (
                <div className="table-responsive">
                <table className='table bordered'>
                  <thead>
                    <tr>
                      <th className='image' >Image</th>
                      <th>Nom</th>
                      <th>Prix</th>
                      <th className='qty'>Quantité</th>
                      <th>Prix/Produit</th>
                      <th>Taille</th>
                      <th>Couleur</th>
                      <th>Supprimer</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item, index) => (
                      <Tr item={item} key={index} />
                    ))}
                  </tbody>
                </table>
                </div>
              )}
          </Col>
        </Row>
        <hr />
        <div className='mt-5'>
          <div className='d-flex align-items justify-content-between '>
            <h3>Total : </h3>
            <span className='cart__price'>{totalAmount} Fcfa</span>
          </div>
          <div className='d-flex align-items justify-content-between mt-5  buy__btn'>
            <div>
              <button>Continuer l'achat</button>
            </div>
            <div>
              <button onClick={handleClick}>Acheter</button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}


const Tr = ({ item }) => {
  const dispatch = useDispatch();

  const addToCart = (item) => {
    dispatch(
      cartActions.addItem({
        id: item.id,
        nomprod: item.nomprod,
        prix: item.prix,
        photo: item.photo,
        qty: item.qty,
        Couleur: item.couleur,
        categoryId: item.categoryId,
        chilCategoryId: item.chilCategoryId,
      })
    );
  };

  const decreaseToCart = (item) => {
    dispatch(
      cartActions.suppItem({
        id: item.id,
        nomprod: item.nomprod,
        prix: item.prix,
        photo: item.photo,
        qty: item.qty,
        Couleur: item.couleur,
        categoryId: item.categoryId,
        categoryId: item.categoryId,
        chilCategoryId: item.chilCategoryId,
      })
    );
  };

  const deleteProduct = () => {
    dispatch(cartActions.deleteItem(item.id));
  };

  // Parse the productphotos field into an object
  const productPhotos = JSON.parse(item.productphotos);

  return (
    <tr>
      <td>
        <img
          className="img-fluid"
          src={productPhotos.photo}
          alt="cart"
        />
      </td>
      <td>{item.nomprod} </td>
      <td>{item.prix} Cfa </td> {/* Display the product price */}
      <td>
        <div className="qty-group">
          <div className="quantity buttons_added">
            <input
              type="button"
              defaultValue="-"
              className="minus minus-btn"
              onClick={() => decreaseToCart(item)}
            />
            <input
              type="number"
              value={item.qty}
              className="input-text qty text-black"
              disabled
            />
            <input
              type="button"
              defaultValue="+"
              className="plus plus-btn"
              onClick={() => addToCart(item)}
            />
          </div>
        </div>
      </td>
      <td>
        <div className="cart-item-price">{item.qty * item.prix}F</div> {/* Display the total price */}
      </td>
      <td>{productPhotos.taille.join("  |  ")} </td>
      <td>
        <div className="color-selection ">
          {productPhotos.couleur.map((color, index) => (
            <motion.input
              key={index}
              type="button"
              className="btn-color d-block m-3"
              style={{ background: color }}
            />
))}
        </div>
      </td>
      <td>
        <motion.i
          whileTap={{ scale: 1.2 }}
          onClick={deleteProduct} // Call deleteProduct without parameters
          class="ri-delete-bin-line"
        ></motion.i>
      </td>
    </tr>
  );
};

export default Cartsidebar;




