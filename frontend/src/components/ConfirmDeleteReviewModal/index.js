import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import ConfirmDeleteReview from './ConfirmDeleteReview';

function ConfirmDeleteReviewModal({reviewId}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => {
        setShowModal(true)
        }}>Delete</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ConfirmDeleteReview reviewId={reviewId}/>
        </Modal>
      )}
    </>
  );
}

export default ConfirmDeleteReviewModal;