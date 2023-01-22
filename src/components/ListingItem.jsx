import React from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as DeleteIcon  } from '../assets/svg/deleteIcon.svg'
import { ReactComponent as EditIcon  } from '../assets/svg/editIcon.svg'
import bedIcon from '../assets/svg/bedIcon.svg'
import bathtubIcon from '../assets/svg/bathtubIcon.svg'

const formatPrice = price => price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
const ListingItem = ({ listing , id , onDelete, onEdit}) => {
	
  return (
<li className='categoryListing'>
	<Link to={`/category/${listing.type}/${id}`} className='categoryListingLink'>
		<img src={listing.imgUrls[0]} alt={listing.name} className='categoryListingImg'/>
	
	<div className="categoryListingDetails">
		<p className='categoryListingLocation'>
			{listing.location}
		</p>
		<p className='categoryListingName'>{listing.name}</p>
	<p className='categoryListingPrice'>
		${formatPrice(listing.offer ? listing.discountedPrice : listing.regularPrice) }
		{ listing.type === 'rent' && ' / Month'}
	</p>
	<div className="categoryListingInfoDiv">
		<img src={bedIcon} alt="bed" />
		<p className='categoryListingInfoText'>
			{listing.bedrooms + `Bedroom${listing.bedrooms>1 && 's'}`}
		</p>
		<img src={bathtubIcon} alt="bath" />
		<p className='categoryListingInfoText'>
			{ listing.bathrooms>1 ? `${listing.bathrooms} Bathrooms` : '1 Bathroom' }
		</p>
	</div>
	</div>
	</Link>
	// add button
{onDelete &&(<DeleteIcon className='removeIcon' fill='rgb(231, 76,60 )' onClick={onDelete}/>)}
// add button
{onEdit && <EditIcon className='editIcon' onClick={onEdit}/>}
</li>
  )
}
export default ListingItem