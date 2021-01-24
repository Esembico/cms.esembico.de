import { required } from '../../helpers/validation';

const teamOptions = {
  endpoint: 'members',
  columns: [
    {
      header: 'Name',
      display: 'name'
    },
    {
      header: 'Artist name',
      display: 'artist_name'
    },
    {
      header: 'Title',
      display: 'titles'
    }
  ],
  primaryProperty: {
    display: (entry) => {
      return `${entry.name} (${entry.artist_name})`;
    },
    header: 'Name'
  },
  editor: [
    {
      type: 'text',
      label: 'Name',
      name: 'name'
    },
    {
      type: 'text',
      label: 'Artist name',
      name: 'artist_name'
    },
    {
      type: 'text',
      label: 'Titles',
      name: 'titles'
    },
    {
      type: 'text',
      label: 'Bio',
      name: 'bio',
      multiline: true
    },
    {
      type: 'reference',
      label: 'Image',
      name: 'image',
      to: 'images'
    }
  ],
  validateData: (data) => {
    const errors = {};

    required(errors, 'Name', data, 'name');
    required(errors, 'Artist name', data, 'artist_name');
    required(errors, 'Titles', data, 'titles');
    required(errors, 'Bio', data, 'bio');
    required(errors, 'Image', data, 'image');

    return errors;
  }
};

export default teamOptions;
