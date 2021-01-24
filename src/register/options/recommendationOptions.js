import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm, faOtter } from '@fortawesome/free-solid-svg-icons';
import { required } from '../../helpers/validation';

const recommendationOptions = {
  columns: [
    {
      header: 'Type',
      display: (entry) => {
        switch (entry.type) {
          case 'movie':
            return <FontAwesomeIcon icon={faFilm} />;
          case 'misc':
            return <FontAwesomeIcon icon={faOtter} />;
          default:
            return entry.type;
        }
      }
    },
    {
      header: 'Title',
      display: 'title'
    },
    {
      header: 'Description',
      display: 'description'
    }
  ],
  primaryProperty: {
    header: 'Title',
    display: 'title'
  },
  editor: [
    {
      type: 'select',
      label: 'Type',
      name: 'type',
      options: [
        { value: 'misc', display: 'Misc' },
        { value: 'movie', display: 'Movie' }
      ]
    },
    {
      type: 'text',
      label: 'Url',
      name: 'url'
    },
    {
      type: 'text',
      label: 'Title',
      name: 'title'
    },
    {
      type: 'reference',
      label: 'Image',
      name: 'image',
      to: 'images'
    },
    {
      type: 'text',
      label: 'Description',
      name: 'description',
      if: (data) => {
        return data.type === 'misc';
      }
    },
    {
      type: 'text',
      label: (data) => {
        if (data.type === 'movie') {
          return 'FSK Rating';
        }
      },
      name: 'field1',
      if: (data) => {
        return data.type === 'movie';
      }
    },
    {
      type: 'text',
      label: (data) => {
        if (data.type === 'movie') {
          return 'Release year';
        }
      },
      name: 'field2',
      if: (data) => {
        return data.type === 'movie';
      }
    },
    {
      type: 'text',
      label: 'Field3',
      name: 'field3',
      if: () => false
    },
    {
      type: 'text',
      label: 'Field4',
      name: 'field4',
      if: () => false
    },
    {
      type: 'text',
      label: 'Field5',
      name: 'field5',
      if: () => false
    }
  ],
  validateData: (data) => {
    const errors = {};
    required(errors, 'Type', data, 'type');
    required(errors, 'Url', data, 'url');
    required(errors, 'Title', data, 'title');
    required(errors, 'Image', data, 'image');
    if (data.type === 'misc') {
      required(errors, 'Description', data, 'description');
    } else if (data.type === 'movie') {
      required(errors, 'FSK Rating', data, 'field1');
      required(errors, 'Release year', data, 'field2');
    }
    return errors;
  }
};

export default recommendationOptions;
