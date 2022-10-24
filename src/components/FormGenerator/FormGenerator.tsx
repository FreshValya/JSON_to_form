import React, { useState } from 'react';

import ConfigTab from './ConfigTab/ConfigTab';
import ResultTab from './ResultTab/ResultTab';

import { Json } from './types';

import styles from './FormGenerator.module.scss';

enum Tabs {
  CONFIG = 'config',
  RESULT = 'result',
}

const JSON_TEMP = {
  header: 'Form header',
  items: [
    { label: 'Count', type: 'number' },
    { label: 'Text', type: 'text' },
    { label: 'Text long', type: 'textarea' },
    { label: 'Check', type: 'checkbox' },
    { label: 'Data', type: 'date' },
    { label: 'Radio', type: 'radio' },
  ],
  buttons: [
    { label: 'Reset', type: 'reset' },
    { label: 'Submit', type: 'submit' },
    { label: 'Button', type: 'button' },
  ],
} as Json;

const FormGenerator: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<Tabs>(Tabs.CONFIG);
  const [json, setJson] = useState<Json>(JSON_TEMP);

  const tabChangeHandler = (tab: Tabs) => {
    setCurrentTab(tab);
  };

  const jsonChangeHandler = (json: Json) => {
    setJson(json);
    tabChangeHandler(Tabs.RESULT);
  };

  const contentArea =
    currentTab === Tabs.CONFIG ? (
      <ConfigTab storedJson={json} onJsonSubmit={jsonChangeHandler} />
    ) : (
      <ResultTab json={json} />
    );

  return (
    <div className={styles.formCreator}>
      <div className={styles.tabs}>
        <div
          className={currentTab === Tabs.CONFIG ? styles.active : ''}
          onClick={tabChangeHandler.bind(null, Tabs.CONFIG)}
        >
          Config
        </div>
        <div
          className={currentTab === Tabs.RESULT ? styles.active : ''}
          onClick={tabChangeHandler.bind(null, Tabs.RESULT)}
        >
          Result
        </div>
      </div>
      <div className={styles.content}>{contentArea}</div>
    </div>
  );
};

export default FormGenerator;
