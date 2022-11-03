import PropTypes from 'prop-types';

import {
  SearchBarHTML,
  FormHTML,
  ButtonHTML,
  ButtonLabelHTML,
  InputHTML,
  SearchIcon,
} from './SearchBar.styled';

export const SearchBar = ({ handleSubmit }) => {
  const onSubmit = event => {
    event.preventDefault();

    const form = event.currentTarget;
    const query = form.elements.query.value;

    // if (query.trim() === '') {
    //   alert('The search field is empty');
    //   return;
    // }

    handleSubmit(query);
    form.reset();
  };

  return (
    <SearchBarHTML>
      <FormHTML onSubmit={onSubmit}>
        <ButtonHTML type="submit">
          <SearchIcon />
          <ButtonLabelHTML>Search</ButtonLabelHTML>
        </ButtonHTML>

        <InputHTML
          name="query"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </FormHTML>
    </SearchBarHTML>
  );
};

SearchBar.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};
