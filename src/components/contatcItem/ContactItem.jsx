import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './ContactItem.module.css';

export class ContactItem extends Component {
  state = {
    id: this.props.id,
  };

  onDeleteBtn = () => {
    this.props.deleteContact(this.state.id);
  };

  render() {
    return (
      <li key={this.state.id} className={css.item__contact}>
        <p>
          {this.props.name}: <span>{this.props.number}</span>
        </p>
        <button
          className={css.contact__btn}
          type="button"
          onClick={this.onDeleteBtn}
        >
          Delete
        </button>
      </li>
    );
  }
}

ContactItem.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  number: PropTypes.string,
  deleteContact: PropTypes.func,
};
