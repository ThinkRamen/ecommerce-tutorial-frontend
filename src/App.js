import { Container } from 'react-bootstrap'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Footer from './components/Footer'
import Header from './components/Header'
import CartView from './views/CartView'
import HomeView from './views/HomeView'
import ProductView from './views/ProductView'
import LoginView from './views/LoginView'
import RegisterView from './views/RegisterView'

function App() {
	return (
		<BrowserRouter>
			<Header />
			<main className='py-3'>
				<Container>
					<Routes>
						<Route path='/' exact element={<HomeView />} />
						<Route path='/product/:id' element={<ProductView />} />
						<Route path='/cart/:id?' element={<CartView />} />
						<Route path='/login' element={<LoginView />} />
						<Route path='/register' element={<RegisterView />} />
					</Routes>
				</Container>
			</main>
			<Footer />
		</BrowserRouter>
	)
}

export default App
