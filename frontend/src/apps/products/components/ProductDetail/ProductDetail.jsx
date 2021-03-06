import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { CartControls } from 'apps/cart/components';

import { Product } from '../../models';
import { getProduct } from '../../actions';

import './ProductDetail.scss';

@connect(state => ({
  productId: state.router.route.params.id,
  product: state.products.product,
  isLoading: state.products.fetchingProduct,
}))
export default class ProductDetail extends Component {
  static propTypes = {
    productId: PropTypes.string.isRequired,
    product: PropTypes.instanceOf(Product).isRequired,
    isLoading: PropTypes.bool.isRequired,
  };

  componentDidMount() {
    this.props.dispatch(getProduct(this.props.productId));
  }

  renderProductDetails() {
    return (
      <div className="ProductDetail__layout">
        <div className="ProductDetail__image">
          <img src={this.props.product.image_url} alt={this.props.product.name} className="with-placeholder" />
        </div>
        <div className="ProductDetail__details">
          <div className="ProductDetail__name">{this.props.product.name}</div>
          <div className="ProductDetail__description">{this.props.product.description}</div>
          <div className="ProductDetail__price">${this.props.product.price}</div>
          <CartControls product={this.props.product} />
        </div>
      </div>
    );
  }

  render() {
    const content = this.props.isLoading
      ? <div>Loading…</div>
      : this.renderProductDetails();

    return (
      <div>
        <h1>Product Detail</h1>
        {content}
      </div>
    );
  }
}
