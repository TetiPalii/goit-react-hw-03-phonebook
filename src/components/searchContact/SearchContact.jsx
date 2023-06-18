import PropTypes from 'prop-types';
import css from './SearchContact.module.css';

export const SearchContact = ({ onChangeFilter }) => {
  return (
    <div>
      <label className={css.label__search}>
        Find contact by name
        <input type="text" onChange={onChangeFilter} />
      </label>
    </div>
  );
};

SearchContact.propTypes = {
  onChangeFilter: PropTypes.func.isRequired,
};
