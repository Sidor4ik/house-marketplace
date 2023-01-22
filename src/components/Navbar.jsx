import React from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { ReactComponent as OfferIcon} from '../assets/svg/localOfferIcon.svg'
import { ReactComponent as ExploreIcon} from '../assets/svg/exploreIcon.svg'
import { ReactComponent as PersonOutlineIcon} from '../assets/svg/personOutlineIcon.svg'

const routes = [
	{
		destination: '/',
		label: 'Explore',
	},

	{
		destination: '/offers',
		label: 'Offers',
	},

	{
		destination: '/profile',
		label: 'Profile',
	}
]


const NavbarItem = ({destination, isCurrentRoute, label}) => (
	<li className='navbarListItem'>
		<Link to={destination}>
			<ExploreIcon fill={isCurrentRoute ? '#2c2c2c' : '#8f8f8f'} width='36px' height='36px'/>
			<span className={isCurrentRoute ? 'navbarListItemNameActive' :'navbarListItemName'}>{label}</span>
		</Link>
	</li>);

const Navbar = () => {

	const navigate = useNavigate()
	const location = useLocation()

	const pathMatchRoute = (route) => {
		if (route===location.pathname){
			return true
		}
	}

  return (
	 <footer className='navbar'>
		<nav className="navbarNav">
			<ul className="navbarListItems">
				{routes.map(route =>
					<NavbarItem
						key={destination}
						destination={route.destination}
						label={route.label}
						isCurrentRoute={pathMatchRoute(route.destination)}
					/>)
				}
			</ul>
		</nav>
	 </footer>
  )
}

export default Navbar