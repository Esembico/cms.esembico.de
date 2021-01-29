import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import ReactMde from 'react-mde';
import { CodeHighlighter, languageVBA, languagePython } from 'esembico-common';
import { makeStyles } from '@material-ui/core';

import 'react-mde/lib/styles/css/react-mde-editor.css';
import 'react-mde/lib/styles/css/react-mde-toolbar.css';
import 'react-mde/lib/styles/css/react-mde.css';
import InputErrors from './InputErrors';
import clsx from 'clsx';
import { CodeRendererParams, MarkdownEditorProps } from '../types/components';

const useStyles = makeStyles((theme) => {
  return {
    formGroup: {
      marginBottom: theme.spacing(2)
    },
    error: {
      color: theme.palette.error.main
    },
    editor: {
      '& .react-mde': {
        border: `1px solid ${theme.palette.primary.main}`
      },
      '& .mde-header': {
        backgroundColor: theme.palette.primary.main,
        '& .mde-tabs button': {
          color: theme.palette.text.primary,
          '&.selected': {
            border: `1px solid ${theme.palette.text.primary}`
          }
        }
      },
      '& li.mde-header-item button svg': {
        color: theme.palette.text.primary
      },
      '& .mde-textarea-wrapper textarea.mde-text': {
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary
      },
      // FIXME: Find a better way to make the editor responsive
      '& .mde-preview-content': {
        maxWidth: '85vw'
      }
    },
    editorError: {
      '& .react-mde': {
        border: `1px solid ${theme.palette.error.main}`
      }
    }
  };
});

interface LanguageDictionary {
  [language: string]: any;
}

const languages: LanguageDictionary = {
  vba: languageVBA,
  python: languagePython
};

const renderers = {
  code: ({ language, value }: CodeRendererParams) => {
    return (
      <CodeHighlighter
        getLanguageFunction={(language: string, callback: any) =>
          callback(languages[language])
        }
        language={language}
      >
        {value}
      </CodeHighlighter>
    );
  },
  image: (params: any) => {
    return <img className='responsive-image' {...params}></img>;
  }
};

export default function MarkdownEditor({
  label,
  value,
  onChange,
  errors
}: MarkdownEditorProps): JSX.Element {
  const classes = useStyles();

  const [selectedTab, setSelectedTab] = useState<'write' | 'preview'>('write');
  return (
    <div className={classes.formGroup}>
      <label
        className={clsx({
          [classes.error]: !!errors
        })}
      >
        {label}
      </label>
      <div
        className={clsx(classes.editor, {
          [classes.editorError]: !!errors
        })}
      >
        <ReactMde
          value={value || ''}
          onChange={onChange}
          selectedTab={selectedTab}
          onTabChange={setSelectedTab}
          generateMarkdownPreview={(markdown) => {
            return Promise.resolve(
              <ReactMarkdown renderers={renderers} source={markdown} />
            );
          }}
        />
      </div>
      <InputErrors errors={errors} />
    </div>
  );
}
