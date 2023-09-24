import React, { Component } from 'react';
import Service from '../Service/Service';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import {
  StyledAppContainer,
  StyledImageList,
} from './App.styled';

class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    page: 1,
    isModalOpen: false, 
    selectedImage: null, 
  };

  handleInputChange = (e) => {
    this.setState({ searchQuery: e.target.value });
  };

  handleSubmit = async (searchQuery) => {
    try {
      const images = await Service.fetchImages(searchQuery);
      this.setState({ images, page: 1 });
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  openModal = (imageUrl) => {
    this.setState({ isModalOpen: true, selectedImage: imageUrl });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false, selectedImage: null });
  };

  render() {
    const { images, isModalOpen, selectedImage } = this.state;

    return (
      <StyledAppContainer>
        <Searchbar onSubmit={this.handleSubmit} />
        <StyledImageList>
          {images.map((image) => (
            <div key={image.id} onClick={() => this.openModal(image.largeImageURL)}>
              <img src={image.webformatURL} alt="" />
            </div>
          ))}
        </StyledImageList>

        {isModalOpen && (
          <Modal
            isOpen={isModalOpen}
            imageUrl={selectedImage}
            alt="Image"
            onClose={this.closeModal}
          />
        )}

        {images.length > 0 && (
          <ImageGallery
            hits={images}
            onClick={(imageUrl) => this.openModal(imageUrl)}
          />
        )}
      </StyledAppContainer>
    );
  }
}

export default App;
