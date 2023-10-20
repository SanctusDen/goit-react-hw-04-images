import React, { useEffect, useState } from 'react';
import { fetchImages } from 'services/api';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { Searchbar } from './Searchbar/Searchbar';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [perPage] = useState(12);
  const [largeImageURL, setLargeImageURL] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tags, setTags] = useState('');

  const startLoader = () => {
    setIsLoading(true);
  };

  const stopLoader = () => {
    setIsLoading(false);
  };

  const onLoadMore = () => {
    setPage(page => page + 1);
  };

  useEffect(() => {
    if (!searchQuery) return;
    async function fetchData() {
      try {
        startLoader();
        const response = await fetchImages(searchQuery, page, perPage);
        const {
          data: { hits: items, totalHits },
        } = response;
        const totalPages = Math.ceil(totalHits / perPage);

        setItems(prev => [...prev, ...items]);
        setTotalPages(totalPages);
      } catch (error) {
        console.log(error);
      } finally {
        stopLoader();
      }
    }
    fetchData();
  }, [page, perPage, searchQuery]);

  const onSubmit = query => {
    setSearchQuery(query);
    setItems([]);
    setPage(1);
  };

  const onImageClick = ({ largeImageURL, tags }) => {
    setTags(prev => [...prev, tags]);
    setLargeImageURL(largeImageURL);
    showModal();
  };

  const showModal = () => setIsModalOpen(true);

  const hideModal = () => setIsModalOpen(false);

  return (
    <>
      <Searchbar onSubmit={onSubmit} />
      <ImageGallery images={items} onClick={onImageClick}></ImageGallery>
      {items.length > 1 && page > 0 && page < totalPages && !isLoading && (
        <Button onClick={onLoadMore} />
      )}
      {isLoading && <Loader />}
      {isModalOpen && (
        <Modal url={largeImageURL} tags={tags} hideModal={hideModal} />
      )}
    </>
  );
};
