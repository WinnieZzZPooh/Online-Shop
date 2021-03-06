import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import * as R from 'ramda'

import { getBasketPhonesWithCount, getTotalBasketPrice } from 'selectors'
import { removePhoneFromBasket, cleanBasket, basketCheckout } from 'actions'

const Basket = ({ phones, totalPrice, removePhoneFromBasket, cleanBasket, basketCheckout }) => {
  const isBasketEmpty = R.isEmpty(phones)

  const renderContent = () => (
    <div>
      {isBasketEmpty && <div>Your shopping card is empty</div>}

      <div className="table-responsive">
        <table className="table-bordered table-striped table-condensed cf">
          <tbody>
          {phones.map((phone, index) => (
            <tr key={index} className="item-checkout">
              <td className="first-column-checkout">
                <img className="img-thumbnail" src={phone.image} alt={phone.name} />
              </td>
              <td>{phone.name}</td>
              <td>${phone.price}</td>
              <td>{phone.count}</td>
              <td>
                <span
                  className="glyphicon glyphicon-trash delete-cart"
                  onClick={() => removePhoneFromBasket(phone.id)}
                />
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
      {
        !isBasketEmpty &&
        <div className="row">
          <div className="pull-right total-user-checkout">
            <b>Total: </b>
            ${totalPrice}
          </div>
        </div>
      }
    </div>
  )

  const renderSidebar = () => (
    <div>
      <Link to="/" className="btn btn-info">
        <span className="glyphicon glyphicon-info-sign" />
        <span>Continue Shopping</span>
      </Link>
      {
        !isBasketEmpty &&
        <div>
          <button onClick={cleanBasket} className="btn btn-danger">
            <span className="glyphicon glyphicon-trash" />
            Clear cart
          </button>
          <button className="btn btn-success" onClick={() => basketCheckout(phones)}>
            <span className="glyphicon glyphicon-envelope" />
            Checkout
          </button>
        </div>
      }
    </div>
  )

  return (
    <div className="view-container">
      <div className="container">
        <div className="row">
          <div className="col-md-9">
            {renderContent()}
          </div>
          <div className="col-md-3 btn-user-checkout">
            {renderSidebar()}
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  phones: getBasketPhonesWithCount(state),
  totalPrice: getTotalBasketPrice(state)
})

const mapDispatchToProps = {
  removePhoneFromBasket,
  cleanBasket,
  basketCheckout
}

export default connect(mapStateToProps, mapDispatchToProps)(Basket)
