import { useState } from 'react'
import './ProductList.css'
import CartItem from './CartItem'
import { plantsArray } from './data/plantArr'
import { useDispatch } from 'react-redux'
import { addItem, toggleCart } from './CartSlice'
import { useSelector } from 'react-redux'

function ProductList({ onHomeClick }) {
	const [showPlants, setShowPlants] = useState(false) // State to control the
	const showCart = useSelector(state => state.cart.showCart)

	const styleObj = {
		backgroundColor: '#4CAF50',
		color: '#fff!important',
		padding: '15px',
		display: 'flex',
		justifyContent: 'space-between',
		alignIems: 'center',
		fontSize: '20px',
	}
	const styleObjUl = {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '1100px',
	}
	const styleA = {
		color: 'white',
		fontSize: '30px',
		textDecoration: 'none',
	}

	const dispatch = useDispatch()

	const handleHomeClick = e => {
		e.preventDefault()
		onHomeClick()
	}

	const handleCartClick = e => {
		e.preventDefault()
		dispatch(toggleCart(true)) // відкриває кошик
	}

	const handlePlantsClick = e => {
		e.preventDefault()
		setShowPlants(true)
		dispatch(toggleCart(false))
	}
	const handleAddToCart = plant => {
		const cleanCost = Number(String(plant.cost).replace(/\$/, '').trim())
		dispatch(addItem({ ...plant, cost: cleanCost, quantity: 1 }))
		dispatch(toggleCart(true))
	}

	return (
		<>
			{showCart && <CartItem />}

			<div>
				<div className='navbar' style={styleObj}>
					<div className='tag'>
						<div className='luxury'>
							<img
								src='https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png'
								alt=''
							/>
							<a href='/' onClick={e => handleHomeClick(e)}>
								<div>
									<h3 style={{ color: 'white' }}>Paradise Nursery</h3>
									<i style={{ color: 'white' }}>Where Green Meets Serenity</i>
								</div>
							</a>
						</div>
					</div>
					<div style={styleObjUl}>
						<div>
							{' '}
							<a href='#' onClick={e => handlePlantsClick(e)} style={styleA}>
								Plants
							</a>
						</div>
						<div>
							{' '}
							<a href='#' onClick={e => handleCartClick(e)} style={styleA}>
								<h1 className='cart'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										viewBox='0 0 256 256'
										id='IconChangeColor'
										height='68'
										width='68'
									>
										<rect width='156' height='156' fill='none'></rect>
										<circle cx='80' cy='216' r='12'></circle>
										<circle cx='184' cy='216' r='12'></circle>
										<path
											d='M42.3,72H221.7l-26.4,92.4A15.9,15.9,0,0,1,179.9,176H84.1a15.9,15.9,0,0,1-15.4-11.6L32.5,37.8A8,8,0,0,0,24.8,32H8'
											fill='none'
											stroke='#faf9f9'
											stroke-linecap='round'
											stroke-linejoin='round'
											stroke-width='2'
											id='mainIconPathAttribute'
										></path>
									</svg>
								</h1>
							</a>
						</div>
					</div>
				</div>
				{showPlants && (
					<div className='all-plants-section'>
						<h2 style={{ color: 'black' }}>All Available Plants</h2>
						<div className='plant-cards'>
							{plantsArray
								.flatMap(category => category.plants)
								.map((plant, i) => (
									<div key={i} className='plant-card'>
										<img src={plant.image} alt={plant.name} />
										<h3>{plant.name}</h3>
										<p>{plant.description}</p>
										<p>{plant.cost}</p>
										<button onClick={() => handleAddToCart(plant)}>
											Add to Cart
										</button>
									</div>
								))}
						</div>
						<div style={{ marginTop: '20px' }}>
							<button
								className='get-started-button'
								onClick={() => setShowPlants(false)}
							>
								Back
							</button>
						</div>
					</div>
				)}
			</div>
		</>
	)
}

export default ProductList
