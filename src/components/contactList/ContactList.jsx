import PropTypes from 'prop-types';
import { ContactItem } from 'components/contatcItem/ContactItem';

export function ContactList({ VisibleContacts, onDeleteBtn }) {
  return (
    <ul>
      {VisibleContacts.map(({ id, name, number }) => (
        <ContactItem
          key={id}
          id={id}
          name={name}
          number={number}
          deleteContact={onDeleteBtn}
        />
      ))}
    </ul>
  );
}

ContactList.propTypes = {
  onVisibleContacts: PropTypes.array,
  onDeleteContact: PropTypes.func,
};
