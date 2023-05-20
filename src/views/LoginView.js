import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/Message'
import { login } from '../actions/userActions'

export default function LoginView() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	return (
		<>
			<h1>login</h1>
			<FormContainer></FormContainer>
		</>
	)
}
