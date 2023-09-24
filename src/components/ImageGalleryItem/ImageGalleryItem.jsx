import { Component } from "react";
import { GalleryImage, GalleryItemWrapper } from "./ImageGalleryItem.styled";

class ImageGalleryItem extends Component {
  handleClick = () => {
    const { largeImageURL, tags, onClick } = this.props;
    onClick({ largeImageURL, tags });
  };

  render() {
    const { webformatURL, tags } = this.props;

    return (
      <GalleryItemWrapper>
        <GalleryImage
          src={webformatURL}
          alt={tags}
          onClick={this.handleClick}
        />
      </GalleryItemWrapper>
    );
  }
}

// ImageGalleryItem.propTypes = {
//   imageUrl: PropTypes.string.isRequired,
//   alt: PropTypes.string.isRequired,
// };

export default ImageGalleryItem;