import { Form, SearchHeader } from './Searchbar.styled';

export const Searchbar = ({ onSubmit, SetSearchQuery, searchQuery }) => {
  const handleSubmit = e => {
    e.preventDefault();
    const {
      search: { value: searchQuery },
    } = e.target.elements;
    if (searchQuery.trim() === '') {
      return;
    }
    onSubmit();
  };

  // const handleSubmit = e => {
  //   e.preventDefault();

  //   const searchQueryData = e.currentTarget.elements.searchQuery.value;

  //   SetSearchQuery(searchQueryData);
  //   onsubmit(searchQuery);
  // };

  return (
    <SearchHeader>
      <Form onSubmit={handleSubmit}>
        <button type="submit" className="button">
          <span>Search</span>
        </button>

        <input
          name="search"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </Form>
    </SearchHeader>
  );
};
