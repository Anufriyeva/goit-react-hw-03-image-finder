import React, { Component } from 'react';
import Service from '../Service/Service';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Button from './Button/Button';
import {
  StyledAppContainer,
  // StyledImageList,
} from './App.styled';

class App extends Component {
  state = {
  searchQuery: '',
  images: [],
  page: 1,
  isModalOpen: false,
  largeImageURL: null,
  tags: null,
  perPage: 12,
};

  handleInputChange = (e) => {
    this.setState({ searchQuery: e.target.value });
  };

  // handleSubmit = async (searchQuery) => {
  //   try {
  //     const images = await Service.fetchImages(searchQuery);
  //     this.setState({ images, page: 1 });
  //   } catch (error) {
  //     console.error('Error fetching images:', error);
  //   }
  // };

  handleSubmit = async (searchQuery) => {
  try {
    const images = await Service.fetchImages(searchQuery);
    const slicedImages = images.slice(0, this.state.perPage); // Обрізати до першого perPage елементів
    this.setState({ images: slicedImages, page: 1 });
  } catch (error) {
    console.error('Error fetching images:', error);
  }
};

  openModal = (largeImageURL, tags) => {
    this.setState({ isModalOpen: true, largeImageURL, tags });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false, largeImageURL: null, tags: null });
  };

  // loadMoreImages = async () => {
  //   const { searchQuery, page } = this.state;
  //   try {
  //     const newImages = await Service.fetchImages(searchQuery, page + 1);
  //     this.setState((prevState) => ({
  //       images: [...prevState.images, ...newImages],
  //       page: prevState.page + 1,
  //     }));
  //   } catch (error) {
  //     console.error('Error fetching more images:', error);
  //   }
  // };

  loadMoreImages = async () => {
  const { searchQuery, page, perPage } = this.state;
  try {
    const newImages = await Service.fetchImages(searchQuery, page + 1);
    this.setState((prevState) => ({
      images: [...prevState.images, ...newImages.slice(0, perPage)], 
      page: prevState.page + 1,
    }));
  } catch (error) {
    console.error('Error fetching more images:', error);
  }
};

  render() {
    const { searchQuery, images, isModalOpen, largeImageURL, tags } = this.state;


    return (
      <StyledAppContainer>
        <Searchbar onSubmit={this.handleSubmit} />
        {/* <StyledImageList>
          {images.map((image) => (
            <div key={image.id} onClick={() => this.openModal(image.largeImageURL)}>
              <img src={image.webformatURL} alt="" />
            </div>
          ))}
        </StyledImageList> */}

        {isModalOpen && (
          <Modal
            isOpen={isModalOpen}
            largeImageURL={largeImageURL}
            alt={tags}
            onClose={this.closeModal}
          />
        )}        

        {images.length > 0 && (
          <ImageGallery
            hits={images}
            // onClick={(imageUrl, tags) => this.openModal(imageUrl, tags)}
            onClick={this.openModal}
          />
        )}

        {images.length > 0 && (
  <Button
    onClick={this.loadMoreImages}
    isHidden={images.length < this.state.perPage}
  />
)}

      </StyledAppContainer>
    );
  }
}

export default App;
