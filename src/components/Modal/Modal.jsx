import React, { Component } from 'react';
import { Overlay, ModalContainer } from '../Modal/Modal.styled';
import { disablePageScroll, enablePageScroll } from 'scroll-lock';

class Modal extends Component {

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
        disablePageScroll();
    }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
    enablePageScroll(); 
  }

  handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      this.props.onClose();
    }
  };

  handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    const { isOpen, largeImageURL, tags } = this.props;

    if (!isOpen) {
      return null;
    }

    return (
      <Overlay onClick={this.handleOverlayClick}>
        <ModalContainer>
          <img src={largeImageURL} alt={tags} />
        </ModalContainer>
      </Overlay>
    );
  }
}

export default Modal;