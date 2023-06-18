import Notiflix from 'notiflix';
import { ContactForm } from '../contactsForm/ContactForm';
import { SearchContact } from '../searchContact/SearchContact';
import { ContactList } from '../contactList/ContactList';
import { Notification } from '../notification/Notification';
import { Section } from '../section/Section';
import { Component } from 'react';
import css from './App.module.css';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidUpdate(_, prevState) {
    // console.log(prevProps);
    // console.log(prevState);
    if (prevState.contacts !== this.state.contacts) {
      // console.log('ghjk');
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  componentDidMount() {
    const contacts = localStorage.getItem('contatcs');
    const parsedContatcs = JSON.parse(contacts);
    if (parsedContatcs) {
      this.setState({ contacts: parsedContatcs });
    }
  }

  handleSubmit = contactItem => {
    const { name } = contactItem;
    if (
      this.state.contacts.some(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      Notiflix.Report.warning('Warning', `${name} is already in contacts.`);
    } else {
      this.setState(({ contacts }) => ({
        contacts: [contactItem, ...contacts],
      }));
    }
  };

  getVisibleContacts = idToDelete => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(({ id }) => id !== idToDelete),
    }));
  };

  onChangeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getFilterContact = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const filteredContacts = this.getFilterContact();
    // console.log(filteredContacts);
    return (
      <div className={css.container}>
        <Section title={'Phonebook'}>
          <ContactForm handleSubmit={this.handleSubmit} />
        </Section>
        <Section title={'Contacts'}>
          <SearchContact onChangeFilter={this.onChangeFilter} />
          {this.state.contacts.length ? (
            <ContactList
              VisibleContacts={filteredContacts}
              onDeleteBtn={this.getVisibleContacts}
            />
          ) : (
            <Notification message={'the phonebook is empty!'} />
          )}
        </Section>
      </div>
    );
  }
}
