import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { collection, getDocs, query, where, orderBy, limit, startAfter}  from 'firebase/firestore'
import {db} from '../firebase.config'
import {toast} from 'react-toastify'
import Spinner from '../components/Spinner'
import ListingItem from '../components/ListingItem'
import { async } from '@firebase/util'

const Category = () => {


const [listings, setListings] = useState(null)
const [lastFetchedListing, setLastFetchedListing] = useState(null)
const [loading, setLoading] = useState(true)

const params = useParams()

useEffect(()=>{
	const fetchListings = async() =>{

try {
	// move to DB layer (getListings)
	// Get reference
	const listingsRef = collection(db, 'listings')
// Create a query

const q = query(
	listingsRef,
	 where('type', '==', params.categoryName),
	  orderBy('timestamp', 'desc'),
	  limit(1)
	  )
// Execute query
const querySnap = await getDocs(q)

const lastVisible = querySnap.docs[querySnap.docs.length - 1]
        setLastFetchedListing(lastVisible)

const listings = querySnap.map((doc)=>{
	return ({
		id: doc.id,
		data: doc.data()
	})
});


setListings(listings)
setLoading(false)
} catch (error) {
	toast.error('Could not fetch listings')
}
	}
	fetchListings()
}, [params.categoryName])



// Pagination / Load More
const onFetchMoreListings = async () => {
	try {
		// move to reusable function + db layer
	  // Get reference
	  const listingsRef = collection(db, 'listings')

	  // Create a query
	  const q = query(
		 listingsRef,
		 where('type', '==', params.categoryName),
		 orderBy('timestamp', 'desc'),
		 startAfter(lastFetchedListing),
		 limit(10)
	  )

	  // Execute query
	  const querySnap = await getDocs(q)

	  const lastVisible = querySnap.docs[querySnap.docs.length - 1]
	  setLastFetchedListing(lastVisible)

	  const listings = []

	  querySnap.forEach((doc) => {
		 return listings.push({
			id: doc.id,
			data: doc.data(),
		 })
	  })

	  setListings((prevState) => [...prevState, ...listings])
	  setLoading(false)
	} catch (error) {
	  toast.error('Could not fetch listings')
	}
 }


	const textList = {
		rent: 'Places for rent',
		sale: 'Places for sale',
		build: 'Places for build'
	}

	const content = null;


  return (
	// Create Layout component
	<div className='category'>
	<header>
	  <p className='pageHeader'>
		 {textList[params.categoryName]}
	  </p>
	</header>
	{loading ? (
	  <Spinner />
	) : listings && listings.length > 0 ? (
	  <>
		 <main>
			<ul className='categoryListings'>
			  {listings.map((listing) => (
				 <ListingItem
					listing={listing.data}
					id={listing.id}
					key={listing.id}
				 />
			  ))}
			</ul>
		 </main>


		 <br />
		 {lastFetchedListing && (
			<p className='loadMore' onClick={onFetchMoreListings}>
			  Load More
			</p>
		 )}
	  </>
	) : (
	  <p>No listings for {params.categoryName}</p>
	)}
 </div>
  )
}

export default Category