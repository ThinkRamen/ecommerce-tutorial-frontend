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
import { getUserDetails } from '../actions/userActions'

function ProfileView() {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [message, setMessage] = useState('')
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const location = useLocation()

	const userDetails = useSelector((state) => state.userDetails)
	const { error, loading, user } = userDetails
	console.log('user:', user)

	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin

	useEffect(() => {
		if (!userInfo) {
			navigate('/login')
		} else {
			if (!user || !user.name) {
				dispatch(getUserDetails('profile'))
			} else {
				setName(user.name)
				setEmail(user.email)
			}
		}
		dispatch(getUserDetails)
	}, [dispatch, navigate, userInfo, user])

	const submitHandler = (e) => {
		e.preventDefault()
		console.log('Submitted')
		if (password !== confirmPassword) {
			setMessage('Passwords do not match.')
		} else {
			console.log('Updating...')
		}
	}
	return (
		<Row>
			<Col md={3}>
				<h2>User Profile</h2>
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
							type='password'
							placeholder='Enter Password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						></FormControl>
					</FormGroup>
					<FormGroup controlId='passwordConfirm' className='py-3'>
						<FormLabel>Confirm Password</FormLabel>
						<FormControl
							type='password'
							placeholder='Confirm Password'
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						></FormControl>
					</FormGroup>
					<Button type='submit' variant='primary'>
						Update
					</Button>
				</Form>
			</Col>
			<Col md={9}>
				<h2>My Orders</h2>
			</Col>
		</Row>
	)
}

export default ProfileView
