import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import ReactMde from 'react-mde';
import { CodeHighlighter, languageVBA, languagePython } from 'esembico-common';

import 'react-mde/lib/styles/css/react-mde-editor.css';
import 'react-mde/lib/styles/css/react-mde-toolbar.css';
import 'react-mde/lib/styles/css/react-mde.css';
import '../../css/MarkdownEditor.css';
import InputErrors from './InputErrors';

const languages = {
  vba: languageVBA,
  python: languagePython
};

const renderers = {
  code: ({ language, value }) => {
    return (
      <CodeHighlighter
        getLanguageFunction={(language, callback) =>
          callback(languages[language])
        }
        language={language}
      >
        {value}
      </CodeHighlighter>
    );
  },
  image: (params) => {
    return <img className='responsive-image' {...params}></img>;
  }
};

export default function MarkdownEditor({ label, value, onChange, errors }) {
  const [selectedTab, setSelectedTab] = useState('write');
  return (
    <div className='form-group'>
      <label className={`markdown-label ${errors ? 'has-errors' : ''}`}>
        {label}
      </label>
      <ReactMde
        value={value}
        onChange={onChange}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={(markdown) => {
          return Promise.resolve(
            <ReactMarkdown renderers={renderers} source={markdown} />
          );
        }}
      />
      <InputErrors errors={errors} />
    </div>
  );
}
