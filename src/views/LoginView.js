import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
	Form,
	Button,
	Row,
	Col,
	FormGroup,
	FormLabel,
	FormControl
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { login } from '../actions/userActions'

export default function LoginView() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const location = useLocation()

	const redirect = location.search ? location.search.split('=')[1] : '/'

	const userLogin = useSelector((state) => state.userLogin)
	const { error, loading, userInfo } = userLogin

	useEffect(() => {
		if (userInfo) {
			navigate(redirect)
		}
	}, [navigate, redirect, userInfo])

	const submitHandler = (e) => {
		e.preventDefault()
		console.log('Submitted')
		dispatch(login(email, password))
	}
	return (
		<>
			<FormContainer>
				<h1>Sign In</h1>
				{error && <Message variant='danger'>{error}</Message>}
				{loading && <Loader />}
				<Form onSubmit={submitHandler}>
					<FormGroup controlId='email' className='py-3'>
						<FormLabel>Email Address</FormLabel>
						<FormControl
							type='email'
							placeholder='Enter Email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						></FormControl>
					</FormGroup>

					<FormGroup controlId='password' className='py-3'>
						<FormLabel>Password</FormLabel>
						<FormControl
							type='password'
							placeholder='Enter Password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						></FormControl>
					</FormGroup>
					<Button type='submit' variant='primary'>
						Sign In
					</Button>
				</Form>

				<Row className='py-3'>
					<Col>
						New Customer?{' '}
						<Link
							to={redirect ? `/register?redirect=${redirect}` : '/register'}
						>
							Register
						</Link>
					</Col>
				</Row>
			</FormContainer>
		</>
	)
}
