import React, { useEffect } from 'react'
import {
	Button,
	Card,
	Col,
	FormSelect,
	Image,
	ListGroup,
	ListGroupItem,
	Row
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useMatch, useNavigate } from 'react-router-dom'
import { addToCart, removeFromCart } from '../actions/cartActions'
// import Loader from '../components/Loader'
import Message from '../components/Message'
// import Product from '../components/Product'
// import ProductView from './ProductView'

function CartView() {
	const match = useMatch('/cart/:id')
	const productId = match?.params?.id
	const navigate = useNavigate()
	const location = useLocation()
	const dispatch = useDispatch()
	const qty = location.search ? Number(location.search.split('=')[1]) : 1

	const cart = useSelector((state) => state.cart)
	const { cartItems } = cart

	useEffect(() => {
		if (productId) {
			dispatch(addToCart(productId, qty))
		}
	}, [dispatch, productId, qty])

	const removeFromCartHandler = (id) => {
		dispatch(removeFromCart(id))
	}

	const checkoutHandler = () => {
		navigate('/login?redirect=shipping')
	}

	return (
		<Row>
			<Col md={8}>
				<h1>Shopping Cart</h1>
				{cartItems.length === 0 ? (
					<Message variant='danger'>
						YOUR SHOPPING CART IS EMPTY <Link to='/'>GO BACK</Link>
					</Message>
				) : (
					<ListGroup variant='flush'>
						{cartItems.map((item) => (
							<ListGroupItem key={item.product}>
								<Row>
									{/* Image */}
									<Col md={2}>
										<Image src={item.image} alt={item.name} fluid rounded />
									</Col>
									{/* Item Name */}
									<Col md={3}>
										<Link to={`/products/${item.product}`}>{item.name}</Link>
									</Col>
									<Col md={2}>${item.price}</Col>
									{/* QTY */}
									<Col>
										<FormSelect
											as='select'
											value={item.qty}
											onChange={(e) =>
												dispatch(
													addToCart(item.product, Number(e.target.value))
												)
											}
										>
											{[...Array(item.countInStock).keys()].map((x) => (
												<option key={x + 1} value={x + 1}>
													{x + 1}
												</option>
											))}
										</FormSelect>
									</Col>
									{/* Delete */}
									<Col md={1}>
										<Button
											variant='light'
											onClick={() => removeFromCartHandler(item.product)}
										>
											<i className='fas fa-trash' />
										</Button>
									</Col>
								</Row>
							</ListGroupItem>
						))}
					</ListGroup>
				)}
			</Col>

			<Col md={4}>
				<Card>
					<ListGroup variant='flush'>
						<ListGroupItem>
							<h2>
								Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
								items
							</h2>
							$
							{cartItems
								.reduce((acc, item) => acc + item.qty * item.price, 0)
								.toFixed(2)}
						</ListGroupItem>
						<ListGroupItem className='d-grid'>
							<Button
								disabled={cartItems.length === 0}
								onClick={checkoutHandler}
							>
								Proceed to checkout
							</Button>
						</ListGroupItem>
					</ListGroup>
				</Card>
			</Col>
		</Row>
	)
}

export default CartView
