import React from "react";
import ReactMarkdown from "react-markdown";
import ReactMde from "react-mde";
import { useState } from "react/cjs/react.development";
import { CodeHighlighter, languageVBA, languagePython } from "esembico-common";

import "react-mde/lib/styles/css/react-mde-editor.css";
import "react-mde/lib/styles/css/react-mde-toolbar.css";
import "react-mde/lib/styles/css/react-mde.css";

const languages = {
  vba: languageVBA,
  python: languagePython,
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
    // eslint-disable-next-line jsx-a11y/alt-text
    return <img className="responsive-image" {...params}></img>;
  },
};

export default function MarkdownEditor({ value, onChange }) {
  const [selectedTab, setSelectedTab] = useState("write");
  return (
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
  );
}
