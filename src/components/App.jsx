import React, { useEffect, useState } from 'react';
import { fetchImages } from 'services/api';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { Searchbar } from './Searchbar/Searchbar';

export const App = ({ onBackdropClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [perPage, setPerPage] = useState(12);

  const [largeImageURL, setLargeImageURL] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tags, setTags] = useState('');

  const startLoader = () => {
    setIsLoading(true);
  };

  const stopLoader = () => {
    setIsLoading(false);
  };

  const onLoadMore = () => {
    this.setState(state => {
      return { page: state.page + 1 };
    });
  };

  // function async componentDidUpdate(prevProps, prevState) {
  //   if (page !== prevState.page || searchQuery !== searchQuery) {
  //     try {
  //       startLoader();
  //       const response = await fetchImages(searchQuery, page, perPage);
  //       const {
  //         data: { hits: items, totalHits },
  //       } = response;
  //       const totalPages = Math.ceil(totalHits / perPage);

  //       setItems(() => {
  //         return { items: [...state.items, ...items], totalPages };
  //       });
  //     } catch (error) {
  //       console.log(error);
  //       setError(error.message);
  //     } finally {
  //       stopLoader();
  //     }
  //   }
  // };

  useEffect(() => {
    async function fetchData() {
      try {
        startLoader();
        const response = await fetchImages(searchQuery, page, perPage);
        const {
          data: { hits: items, totalHits },
        } = response;
        const totalPages = Math.ceil(totalHits / perPage);

        // setItems(() => {
        //   return { items: [...items], totalPages };
        // });
        setItems(prev => [...prev, items, totalPages]);
      } catch (error) {
        setError(error.message);
      } finally {
        stopLoader();
      }
    }
    fetchData();
  }, [page, perPage, searchQuery]);

  // const onSubmit = searchQuery => {
  //   if (searchQuery.trim() !== searchQuery) {
  //     this.setState(prev => ({
  //       searchQuery,
  //       items: [],
  //       page: 1,
  //     }));
  //   }
  // };

  const onSubmit = () => {
    setSearchQuery(searchQuery);
    setItems(items);
    setPage(1);
  };

  const onImageClick = ({ largeImageURL, tags }) => {
    setTags(prev => [...prev, tags], largeImageURL);
    showModal();
  };

  const showModal = () => {
    setIsLoading(true);
  };

  const hideModal = () => {
    setIsLoading(false);
  };

  return (
    <>
      <Searchbar onSubmit={onSubmit} />
      <ImageGallery images={items} onClick={onImageClick}></ImageGallery>
      {items.length > 1 && page > 0 && page < totalPages && !isLoading && (
        <Button onClick={onLoadMore} />
      )}
      {isLoading && <Loader />}
      {isModalOpen && (
        <Modal
          url={largeImageURL}
          tags={tags}
          onClick={onBackdropClick}
          hideModal={hideModal}
        />
      )}
    </>
  );
};
