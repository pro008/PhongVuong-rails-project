import React, { Component, PropTypes } from 'react'
import { Row, Col, Button } from 'react-bootstrap'

class CartSection extends Component {
  constructor(props) {
    super(props)

    this._handleDeleteElement = this._handleDeleteElement.bind(this)
    this._handleBackToInfo = this._handleBackToInfo.bind(this)

  }

  _handleDeleteElement(index) {
    this.props.onDeleteColumn(index)
  }

  _handleBackToInfo(index) {
    this.props.onBackToList(index)
  }

  cartInfo(){
    const { finalList } = this.props
    let card = []

    card.push(
      <Row className="cart-column" key={1000}>
        <Col key={999} md={3}><b>Location</b></Col>
        <Col key={998} md={3}><b>Population</b></Col>
        <Col key={997} md={3}><b>Point of Interest</b></Col>
        <Col key={996} md={3}><b>Action</b></Col>
      </Row>
    )

    finalList.forEach((list, index) => {
      let column = []
      _.forIn(list, function(value, key) {
        if(key == "Point of Interest" || key == "Population" || key == "Location Name"){
          column.push(<Col key={key} md={3}>{value}</Col>)
        }
      })
      column.push(<Button className="delete-button" onClick={() => this._handleDeleteElement(index)} key={index}></Button>)

      if(index % 2 == 0)
        card.push(<Row className="cart-column org" onClick={() => this._handleBackToInfo(index)} key={index}>{column}</Row>)
      else
        card.push(<Row className="cart-column" onClick={() => this._handleBackToInfo(index)} key={index}>{column}</Row>)
      
    })

    return(
      <div>
        {card}
      </div>
    )
  }

  render() {
    return(
      <div className="cart-frame br10">
        <div className="analyse-header">
          <h2 className="bd-b">Cart</h2>
        </div>
        <div className="analyse-body">
          {this.cartInfo()}
        </div>
      </div>
    )
  }
}

export default CartSection