import { React, useEffect, useState } from 'react'
import {
	Button,
	Card,
	Col,
	Form,
	FormControl,
	FormSelect,
	Image,
	ListGroup,
	ListGroupItem,
	Row
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useMatch, useNavigate } from 'react-router-dom'
import { listProductDetails } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Rating from '../components/Rating'

function ProductView({ history }) {
	const [qty, setQty] = useState(1)
	const match = useMatch('/product/:id')
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const productDetails = useSelector((state) => state.productDetails)
	const { loading, error, product } = productDetails
	useEffect(() => {
		dispatch(listProductDetails(match.params.id))
	}, [dispatch, match])

	const addToCartHandler = () => {
		navigate(`/cart/${match.params.id}?qty=${qty}`)
	}
	return (
		<div>
			<Link to='/' className='btn btn-light my-3'>
				Go Back
			</Link>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<Row>
					<Col md={6}>
						<Image src={product.image} alt={product.name} />
					</Col>
					<Col md={3}>
						<ListGroup variant='flush'>
							<ListGroupItem>
								<h3>{product.name}</h3>
							</ListGroupItem>
							<ListGroupItem>
								<Rating
									value={product.rating}
									text={`${product.numReviews} reviews`}
									color={'#f8e825'}
								/>
							</ListGroupItem>
							<ListGroupItem>Price: ${product.price}</ListGroupItem>
							<ListGroupItem>Description: {product.description}</ListGroupItem>
						</ListGroup>
					</Col>
					<Col md={3}>
						<Card>
							<ListGroup variant='flush'>
								<ListGroupItem>
									<Row>
										<Col>Price:</Col>
										<Col>
											<strong>${product.price}</strong>
										</Col>
									</Row>
								</ListGroupItem>
								{/* In Stock */}
								<ListGroupItem>
									<Row>
										<Col>Status:</Col>
										<Col>
											{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
										</Col>
									</Row>
								</ListGroupItem>
								{/* Qty Select */}
								{product.countInStock > 0 && (
									<ListGroupItem>
										<Row>
											<Col>qty</Col>
											<Col xs='auto' className='my-1'>
												<FormSelect
													as='select'
													value={qty}
													onChange={(e) => setQty(e.target.value)}
												>
													{[...Array(product.countInStock).keys()].map((x) => (
														<option key={x + 1} value={x + 1}>
															{x + 1}
														</option>
													))}
												</FormSelect>
											</Col>
										</Row>
									</ListGroupItem>
								)}
								{/* Add to Cart Btn */}
								<ListGroupItem className='d-grid'>
									<Button
										disabled={product.countInStock === 0}
										onClick={addToCartHandler}
									>
										Add to Cart
									</Button>
								</ListGroupItem>
							</ListGroup>
						</Card>
					</Col>
				</Row>
			)}
		</div>
	)
}

export default ProductView
