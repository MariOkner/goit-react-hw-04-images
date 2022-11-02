import axios from 'axios';

const IMAGE_BASE_URL = 'https://pixabay.com/api/';
const IMAGE_KEY = '29815717-e22672f4a65c97651fd180553';
const IMAGE_PER_PAGE = 12;
const IMAGE_PARAMETERS = `image_type=photo&orientation=horizontal&per_page=${IMAGE_PER_PAGE}`;

const fetchImages = async (query, page) => {
  const url = `${IMAGE_BASE_URL}?q=${query}&page=${page}&key=${IMAGE_KEY}&${IMAGE_PARAMETERS}`;

  try {
    const response = await axios.get(url);

    const normalizedImages = normalizeImages(response.data.hits);

    return {
      hits: normalizedImages,
      totalPages: Math.ceil(response.data.totalHits / IMAGE_PER_PAGE),
    };
  } catch (error) {
    throw new Error('Backend error');
  }
};

const normalizeImages = images => {
  return images.map(({ id, webformatURL, largeImageURL }) => {
    return {
      id: id,
      smallImageURL: webformatURL,
      largeImageURL: largeImageURL,
    };
  });
};

const helpers = {
  fetchImages,
};

export default helpers;
