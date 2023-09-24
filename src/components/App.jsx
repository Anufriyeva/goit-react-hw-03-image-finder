import React, { Component } from 'react';
import Service from 'Service/Service';

class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    page: 1,
  };

  handleInputChange = (e) => {
    this.setState({ searchQuery: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { searchQuery } = this.state;
    
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
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Search for images"
            value={searchQuery}
            onChange={this.handleInputChange}
          />
          <button type="submit">Search</button>
        </form>

        <div className="image-list">
          {images.map((image) => (
            <div key={image.id}>
              <img src={image.webformatURL} alt="" />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
