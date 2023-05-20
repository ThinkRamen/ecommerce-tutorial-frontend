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
import { register } from '../actions/userActions'

function RegisterView() {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [message, setMessage] = useState('')
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const location = useLocation()

	const redirect = location.search ? location.search.split('=')[1] : '/'

	const userRegister = useSelector((state) => state.userRegister)
	const { error, loading, userInfo } = userRegister

	useEffect(() => {
		if (userInfo) {
			navigate(redirect)
		}
	}, [navigate, redirect, userInfo])

	const submitHandler = (e) => {
		e.preventDefault()
		console.log('Submitted')
		if (password !== confirmPassword) {
			setMessage('Passwords do not match.')
		} else {
			dispatch(register(name, email, password))
		}
	}
	return (
		<FormContainer>
			<h1>Register</h1>
			{message && <Message variant='danger'>{message}</Message>}
			{error && <Message variant='danger'>{error}</Message>}
			{loading && <Loader />}
			<FormGroup controlId='name' className='py-3'>
				<FormLabel>Full Name</FormLabel>
				<FormControl
					required
					type='name'
					placeholder='Enter Name'
					value={name}
					onChange={(e) => setName(e.target.value)}
				></FormControl>
			</FormGroup>
			<Form onSubmit={submitHandler}>
				<FormGroup controlId='email' className='py-3'>
					<FormLabel>Email Address</FormLabel>
					<FormControl
						required
						type='email'
						placeholder='Enter Email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					></FormControl>
				</FormGroup>
				<FormGroup controlId='password' className='py-3'>
					<FormLabel>Password</FormLabel>
					<FormControl
						required
						type='password'
						placeholder='Enter Password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					></FormControl>
				</FormGroup>
				<FormGroup controlId='passwordConfirm' className='py-3'>
					<FormLabel>Confirm Password</FormLabel>
					<FormControl
						required
						type='password'
						placeholder='Confirm Password'
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					></FormControl>
				</FormGroup>
				<Button type='submit' variant='primary'>
					Register
				</Button>
			</Form>
			<Row className='py-3'>
				<Col>
					Have an account?{' '}
					<Link to={redirect ? `/login?redirect=${redirect}` : '/register'}>
						Sign In
					</Link>
				</Col>
			</Row>
		</FormContainer>
	)
}

export default RegisterView
