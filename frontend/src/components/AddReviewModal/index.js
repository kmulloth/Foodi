import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import AddReview from './AddReview';

function AddReviewModal({businessId}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='review-button' onClick={() => {
        setShowModal(true)
        }}>Add Review</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <AddReview businessId={businessId} setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default AddReviewModal;
