import axios from 'axios';

const API_KEY = '38734674-7bb0a4a530548aef0bc7ad612';
const BASE_URL = 'https://pixabay.com/api/';

const fetchImages = async (searchQuery, page = 1) => {
  try {
    const response = await axios.get(`${BASE_URL}?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`);
    return response.data.hits;
  } catch (error) {
    throw error;
  }
};

export default { fetchImages };