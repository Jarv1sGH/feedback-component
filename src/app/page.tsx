"use client"
import React, { useEffect, useState } from 'react'
import { FaStar, FaThumbsDown, FaThumbsUp } from 'react-icons/fa'
import { FaX } from 'react-icons/fa6'
import "./rating.css"

const page = () => {
  type FeedbackType = {
    userId: string,
    safetyRating: number
    communicationRating: number
    praises: Array<string>
    recommend: boolean
  }
  const [safetyRating, setsafetyRating] = useState<number>(0)
  const [communicationRating, setCommunicationRating] = useState<number>(0)
  const [recommend, setRecommend] = useState<boolean | null>(null);
  const [selectedPraises, setSelectedPraises] = useState<string[]>([]);

  const [feedback, setFeedback] = useState<FeedbackType | {}>({})


  const starArray: Array<{ id: string }> = [
    {
      id: `star1`
    },
    {
      id: `star2`
    },
    {
      id: `star3`
    },
    {
      id: `star4`
    },
    {
      id: `star5`
    }
  ]
  const praiseOptArray: Array<string> = [
    'Adventurous',
    'Clean',
    'Good Listener',
  ]

  const ratingHandler = (index: number, setRating: React.Dispatch<React.SetStateAction<number>>): void => {
    setRating(index + 1);
  }

  const praiseOptHandler = (item: string): void => {
    setSelectedPraises((prevSelected) => {
      if (prevSelected.includes(item)) {
        // Removes if already selected
        return prevSelected.filter((option) => option !== item);
      } else {
        // Adds the item if not already selected
        return [...prevSelected, item];
      }
    });
  }
  const submitHandler = () => {
    if (safetyRating === 0 || communicationRating === 0 || recommend === null) {
      alert('please select all fields')
      return;
    }
    alert('Review submitted')
    console.log(feedback);
  }

  useEffect(() => {
    setFeedback((prevFeedback) => {
      return {
        ...prevFeedback,
        safetyRating,
        communicationRating,
        recommend,
        selectedPraises
      }

    })
  }, [safetyRating, communicationRating, selectedPraises, recommend])

  return (

    <div className='main'>

      <div className="container">
        <div className="close">
          <FaX className='closeBtn' />
        </div>
        <div className="ratingInner">
          <div className="ratingHeader">
            <h1>Leave a Review</h1>
          </div>

          {/* Safety Section */}
          <div className="ratingSection">
            <div className="title">Safety</div>
            <div className="subTitle">How Safe did you feel with Trausti?</div>
            <div className="stars">

              {
                starArray.map((item, index) => (
                  <FaStar onClick={() => { ratingHandler(index, setsafetyRating) }} key={item.id} className='star' size={35}
                    color={safetyRating >= index + 1 ? 'gold' : '#E0DEDA'}
                  />
                ))
              }
            </div>
          </div>
          {/* Communication Section */}
          <div className="ratingSection">
            <div className="title">Communication</div>
            <div className="subTitle">How easy was to communicate with Trausti?</div>
            <div className="stars">

              {
                starArray.map((item, index) => (
                  <FaStar key={item.id} onClick={() => { ratingHandler(index, setCommunicationRating) }} className='star' size={35}
                    color={communicationRating >= index + 1 ? 'gold' : '#E0DEDA'} />
                ))
              }
            </div>
          </div>


          {/* Recommendation Section */}
          <div className="ratingSection">
            <div className="title">Would you recommend Trausti?</div>
            <div className="subTitle">Your opinion won't be posted publicly.</div>
            <div className="recommendation stars">
              <div className="recommendOpt">
                <FaThumbsDown className='yesNoIcon' onClick={() => { setRecommend(false) }}
                  color={recommend === null || recommend === true ? '#E0DEDA' : '#6BB383'} size={28} />
                <p> No </p>
              </div>


              <div className="recommendOpt">
                <FaThumbsUp className='yesNoIcon' onClick={() => { setRecommend(true) }}
                  color={recommend === null || recommend === false ? '#E0DEDA' : '#6BB383'} size={28} />
                <p> Yes </p>
              </div>

            </div>
          </div>

          {/* Praise Section */}
          <div className="ratingSection" style={{ "border": "none" }} >
            <div className="title">Praise</div>
            <div className="subTitle">What traits best describe Truasti?</div>
            <div className="praiseOptContainer">
              {
                praiseOptArray.map((item) => (
                  <div key={item} onClick={() => { praiseOptHandler(item) }}
                    className={selectedPraises.includes(item) ? "praiseOpt praiseOptSelected" : "praiseOpt"}>
                    <p>{item}</p>
                  </div>
                ))
              }
            </div>
          </div>

          <div className="submitButton">
            <button onClick={submitHandler}>Submit</button>
          </div>
        </div>


      </div>
    </div>
  )
}

export default page