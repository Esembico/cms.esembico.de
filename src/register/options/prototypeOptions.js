import { required } from '../../helpers/validation';

const prototypeOptions = {
  columns: [
    {
      header: 'Title',
      display: 'title'
    },
    {
      header: 'Subtitle',
      display: 'subtitle'
    }
  ],
  primaryProperty: {
    header: 'Title',
    display: 'title'
  },
  editor: [
    {
      type: 'text',
      label: 'Title',
      name: 'title'
    },
    {
      type: 'text',
      label: 'Subtitle',
      name: 'subtitle'
    },
    {
      type: 'text',
      label: 'Url',
      name: 'url'
    },
    {
      type: 'reference',
      label: 'Image',
      name: 'image',
      to: 'images'
    },
    {
      type: 'text',
      label: 'Challenge',
      name: 'challenge',
      multiline: true
    },
    {
      type: 'text',
      label: 'Solution',
      name: 'solution',
      multiline: true
    },
    {
      type: 'text',
      label: 'Rough details',
      name: 'rough_details',
      multiline: true
    }
  ],
  validateData: (data) => {
    const errors = {};

    required(errors, 'Title', data, 'title');
    required(errors, 'Subtitle', data, 'subtitle');
    required(errors, 'Url', data, 'url');
    required(errors, 'Image', data, 'image');
    required(errors, 'Challenge', data, 'challenge');
    required(errors, 'Solution', data, 'solution');
    required(errors, 'Rough details', data, 'rough_details');

    return errors;
  }
};

export default prototypeOptions;
