import { useState, useEffect } from 'react';
import helpers from '../../helpers';

import { SearchBar } from '../SearchBar/SearchBar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Button } from '../Button/Button';
import { Loader } from '../Loader/Loader';
import { Modal } from '../Modal/Modal';

import { ContainerHTML, ErrorHTML, LargeImageHTML } from './App.styled';

export const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [hasMoreImages, setHasMoreImages] = useState(false);
  const [error, setError] = useState(null);
  const [largeImageURL, setLargeImageURL] = useState('');

  useEffect(() => {
    if (!query) return;
    fetchImages(query, page);
  }, [query, page]);

  const fetchImages = async (query, page) => {
    setIsLoading(true);
    setHasMoreImages(false);
    setError(null);

    try {
      const { hits, totalPages } = await helpers.fetchImages(query, page);

      if (!hits.length) {
        throw new Error('No images');
      }

      setImages(images => [...images, ...hits]);

      setHasMoreImages(page < totalPages);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageFormSubmit = query => {
    if (query.trim() === '') {
      setError('The search field is empty');
      return;
    }

    setImages([]);
    setPage(1);
    setQuery(query);
    setError(null);
  };

  const handleButtonClick = () => {
    setPage(page => page + 1);
  };

  const handleImageClick = largeImageURL => {
    setLargeImageURL(largeImageURL);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <ContainerHTML>
      <SearchBar handleSubmit={handleImageFormSubmit}></SearchBar>

      {error && <ErrorHTML>{error}</ErrorHTML>}

      {isLoading && <Loader />}

      {!error && (
        <ImageGallery images={images} onClick={handleImageClick}></ImageGallery>
      )}

      {hasMoreImages && <Button handleClick={handleButtonClick} />}

      {showModal && (
        <Modal onClose={handleModalClose}>
          <LargeImageHTML src={largeImageURL} alt="" />
        </Modal>
      )}
    </ContainerHTML>
  );
};
