import React, {useContext, useState} from "react";
import ReviewModal from "./Modals/ReviewModal.jsx";
import ProductContext from "../context/ProductContext.jsx";



export const ProductReview = (props) => {
  const [reviewModalOpen, setReviewModalOpen] = useState(false)
  const {reviews} = useContext(ProductContext)
  const {id} = props.item;
  return (
    <>
      <div
        className="max-w-[1000px] p-6 bg-white border border-gray-200 rounded-lg shadow mx-auto min-w-[300px] mt-16 flex flex-col gap-4">
        <div className="flex justify-between">
          <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Review
            ({reviews.length})</h5>
          <button
            className={`px-4 py-[4px] text-white font-bold bg-redBase rounded-[20px] transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110`}
            onClick={(e) => {
              e.stopPropagation();
              setReviewModalOpen(true);
            }}
            aria-controls="review-item-modal"
          >
            Review
          </button>
        </div>
        {
          reviews.length === 0 ? <div>No review yet !</div> : null
        }
        {
          reviews.filter((review) => review.product_id === id).map((review, key) => {
            return (
              <div>
                <div className="flex flex-col">
                  <div className="flex gap-4">
                    <div>
                      <img className="max-w-[50px] rounded-3xl shadow-xl" src={`https://robohash.org/${review.user[0].username}`} />
                    </div>
                    <div>
                      <div className="text-blackFactory font-semibold">
                        {review.user[0].username}
                      </div>
                      <div className="text-slate-400">
                        {review.created_at.slice(0, 10)}
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 ml-16 ">
                    <h1 className="font-bold text-xl text-blackFactory">{review.title}</h1>
                    <p className="font-semibold text-blackFactory">{review.description}</p>
                  </div>
                </div>
              </div>
            )
          })
        }
        <ReviewModal id="review-item-modal" modalOpen={reviewModalOpen} setModalOpen={setReviewModalOpen}
                     productID={id}/>
      </div>
    </>
  )
}
