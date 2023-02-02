import {useState} from 'react'
import { Modal } from '../../context/Modal';
import './Footer.css';

function Footer() {

    const [showModal, setShowModal] = useState(false)

    return(
      <>
      <div id='footer'>
        <div>
          <a href='https://github.com/kmulloth'><i className='fa-brands fa-github'></i></a>
          <a href='https://github.com/kmulloth'><i className='fa-brands fa-linkedin'></i></a>
        </div>
        <button onClick={() => setShowModal(true)}>Credits</button>
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div><div>Icons made by <a href="https://www.flaticon.com/authors/justicon" title="justicon">justicon</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div><div>Icons made by <a href="https://www.flaticon.com/authors/flat-icons" title="Flat Icons">Flat Icons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div><div>Icons made by <a href="https://www.flaticon.com/authors/darius-dan" title="Darius Dan">Darius Dan</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
        </Modal>
      )}
      </>
    )
}

export default Footer;
