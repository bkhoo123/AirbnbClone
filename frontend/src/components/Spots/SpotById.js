import React from 'react'
import { useParams, Link, Redirect } from 'react-router-dom'
import {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSpotById } from '../../store/spots'
import * as sessionActions from "../../store/session"
import { deleteSpot } from '../../store/spots'
import { useHistory } from 'react-router-dom'
import OpenModalButton from '../OpenModalButton'
import EditFormModal from '../EditFormModal'
import { getSpotReviews } from '../../store/reviews'
import ReviewFormModal from '../Reviews/ReviewFormModal'
import { deleteSpotReview } from '../../store/reviews'

const SpotById = () => {
  const history = useHistory()
  const {spotId} = useParams()
  const dispatch = useDispatch()
  const spot = useSelector(state => state.spots[spotId])
  const user = useSelector(state => state.session.user)
  const review = useSelector(state => state.reviews)

  useEffect(() => {
    dispatch(getSpotById(spotId))
    dispatch(getSpotReviews(spotId))
  }, [dispatch, spotId])
  
  const reviewArr = Object.values(review)

  
  if (!spot) return null
  if (!user) return null
  if (!spot.SpotImages) return null
  if (!review) return null
  if (!reviewArr) return null
  

  //! Detail Arrays
  let title = ['Invisible House Joshua Tree | Modern Masterpiece', 'Dome Sweet Dome: An OMG! Experience', 'Honey Silo Retreat', 'Paradise Ranch Inn', ' Emotional Healing', 'Fjord Mountains Great Views', 'Barn Stay in a Hedge Maze Free Range Chicken Farm', 'Gaudi Style House', 'On The Rocks Architectural Estate Dramatic Ocean', 'Tahoe Beach & Ski Club', 'Forest of Death Experienced Directly with the Forest', 'Perfect Home of Your Dreams Perfect for Parties' ]
  
  const handleClickDelete = () => {
      dispatch(deleteSpot(spotId))
      history.push(`/deleted/success`)
  }


  
  return (
    <>
    <h1>{title[spotId - 1]}</h1>
    <span style={{fontSize: 20}}><i style={{color: 'gold'}} className="fa-solid fa-star"></i> {spot.avgStarRating} 
    <span> {spot.numReviews} Reviews </span>
    <span style={({textDecoration: "underline"})}>{spot.address}, {spot.city} {spot.state} {spot.country}</span></span>

    <span className="spotid-buttons">
      <div id={user.id === spot.ownerId ? "" : "delete-hidden"}>
        <OpenModalButton
        buttonText="Edit Location"
        modalComponent={<EditFormModal spot={spot}/>}
        />
      </div>
      <button id={user.id === spot.ownerId ? "" : "delete-hidden"} className="insidespot-idbuttons" onClick={handleClickDelete} style={{fontFamily: 'Helvetica'}}>Delete Location</button>
      </span>
      
      {spot.SpotImages.length !== 0 ? (
        <div className ='spot-idcontainer' style={{paddingTop: 5}}>       
        <img className="spot-idimages" src={spot.SpotImages[0].url} alt="Server undergoing Maintenence" />
        <div className = "right-spotidcontainer">
            <img className="spotidright-image" src={spot.SpotImages[1].url}  alt="" />
            <img className="spotidright-image" src={spot.SpotImages[2].url}  alt="" />
            <img className="spotidright-image" src={spot.SpotImages[3].url}  alt="" />
            <img className="spotidright-image" src={spot.SpotImages[4].url}  alt="" />
        </div>    
      </div>
      ) : (
        <div className ='spot-idcontainer' style={{paddingTop: 5}}>       
        <img className="spot-idimages" src="https://a0.muscache.com/im/pictures/d4993a5e-b986-4183-a3e4-244f8be66ed9.jpg?im_w=720" alt="Server undergoing Maintenence" />
        <div className = "right-spotidcontainer">
            <img className="spotidright-image" src="https://a0.muscache.com/im/pictures/cc01a848-de55-48b3-87f1-8950bc5a822c.jpg?im_w=720" alt="" />
            <img className="spotidright-image" src="https://a0.muscache.com/im/pictures/66c19a34-2e46-4f32-b78a-b399d6ad48cd.jpg?im_w=720"  alt="" />
            <img className="spotidright-image" src="https://a0.muscache.com/im/pictures/5ae05267-bf5f-4999-9084-7ce64ef1f836.jpg?im_w=1200" alt="" />
            <img className="spotidright-image" src="https://a0.muscache.com/im/pictures/04ccf07c-7cbf-4b02-aaba-93452796fba1.jpg?im_w=720"  alt="" />
        </div>    
      </div>
      )}
    
    <div>
    <h2>Hosted By: {spot.name}</h2>
    <h2>Price Per Night: ${spot.price}</h2>
    </div>
     
    <div className="spot-bottomcontainer">
    <div>5 guests 1 bedroom 1 bed 1 bath</div>
    <div style={{marginTop: 10}}>{spot.description}</div>
    </div>
    <div className="spotreview-container">
      <h1 style={{textDecoration: 'underline'}}>Reviews<span style={{paddingLeft: 10}}>
        <OpenModalButton
        buttonText="Post Review"
        modalComponent={<ReviewFormModal spotId={spotId} userId={user.id}/>}
        />
      </span>
      </h1>
      {/* history.push(`/api/spots/${spotId}`) */}
      
      <div>
        {reviewArr.map(review => (
          <>
          <h3> {review.User?.firstName} {review.User?.lastName} {review.stars} Star Review <i style={{color: 'gold'}} className="fa-solid fa-star"></i> 
          {review.User.id === user.id && (<button style={{marginLeft: 10}} 
          onClick={() => dispatch(deleteSpotReview(review.id)).then(history.push(`/api/spots/${Number(spotId)}`))} className="insidespot-idbuttons">Delete Review</button>)}
          </h3>
          <h3 style={{fontFamily: 'sans-serif', fontSize: '1.5rem', fontWeight: 'normal'}}>{review.review}</h3>
          <span style={{fontFamily: 'monospace'}}>Posted On: {review.createdAt}</span>
          </>
        ))}
      </div>
    </div>
    </>
  ) 
}
// const reviewArray = reviewArr[0].Reviews
export default SpotById