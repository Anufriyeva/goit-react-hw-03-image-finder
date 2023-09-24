import React, { Component } from 'react';
import Service from 'Service/Service';
import Searchbar from './Searchbar/Searchbar';
import {
  StyledAppContainer,
  StyledImageList,
} from './App.styled';

class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    page: 1,
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

  render() {
    const { searchQuery, images } = this.state;

    return (
      <StyledAppContainer>
        <Searchbar onSubmit={this.handleSubmit} /> 
        <StyledImageList>
          {images.map((image) => (
            <div key={image.id}>
              <img src={image.webformatURL} alt="" />
            </div>
          ))}
        </StyledImageList>
      </StyledAppContainer>
    );
  }
}

export default App;
