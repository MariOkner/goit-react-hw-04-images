import { Component } from 'react';
import helpers from '../../helpers';

import { SearchBar } from '../SearchBar/SearchBar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Button } from '../Button/Button';
import { Loader } from '../Loader/Loader';
import { Modal } from '../Modal/Modal';

import { ContainerHTML, ErrorHTML } from './App.styled';

export class App extends Component {
  state = {
    images: [],
    query: '',
    page: 0,
    isLoading: false,
    showModal: false,
    hasMoreImages: false,
    error: null,
    largeImageURL: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.fetchImages();
    }
  }

  fetchImages = async () => {
    const { query, page } = this.state;

    this.setState({
      isLoading: true,
      hasMoreImages: false,
      error: null,
    });

    try {
      const { hits, totalPages } = await helpers.fetchImages(query, page);

      if (!hits.length) {
        throw new Error('No images');
      }

      this.setState(prevState => {
        return {
          images: [...prevState.images, ...hits],
        };
      });

      this.setState({ hasMoreImages: page < totalPages });
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleImageFormSubmit = query => {
    if (query.trim() === '') {
      this.setState({ error: 'The search field is empty' });
      return;
    }

    this.setState({
      images: [],
      query: query,
      page: 1,
      error: null,
    });
  };

  handleButtonClick = () => {
    this.setState(({ page }) => ({
      page: page + 1,
    }));
  };

  handleImageClick = largeImageURL => {
    this.setState({
      largeImageURL: largeImageURL,
      showModal: true,
    });
  };

  handleModalClose = () => {
    this.setState({
      showModal: false,
    });
  };

  render() {
    const {
      images,
      isLoading,
      showModal,
      hasMoreImages,
      error,
      largeImageURL,
    } = this.state;

    return (
      <ContainerHTML>
        <SearchBar handleSubmit={this.handleImageFormSubmit}></SearchBar>

        {error && <ErrorHTML>{error}</ErrorHTML>}

        {isLoading && <Loader />}

        {!error && (
          <ImageGallery
            images={images}
            onClick={this.handleImageClick}
          ></ImageGallery>
        )}

        {hasMoreImages && <Button handleClick={this.handleButtonClick} />}

        {showModal && (
          <Modal onClose={this.handleModalClose}>
            <img src={largeImageURL} alt="" />
          </Modal>
        )}
      </ContainerHTML>
    );
  }
}
