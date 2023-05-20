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
	return <div>RegisterView</div>
}

export default RegisterView
