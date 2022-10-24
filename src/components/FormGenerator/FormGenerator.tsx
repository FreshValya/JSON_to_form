import React, { useState } from 'react';

import ConfigTab from './ConfigTab/ConfigTab';
import ResultTab from './ResultTab/ResultTab';

import { Json } from './types';

import styles from './FormGenerator.module.scss';

enum Tabs {
  CONFIG = 'config',
  RESULT = 'result',
}

const FormGenerator: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<Tabs>(Tabs.CONFIG);
  const [json, setJson] = useState<Json>('');

  const tabChangeHandler = (tab: Tabs) => {
    setCurrentTab(tab);
  };

  const jsonChangeHandler = (json: Json) => {
    setJson(json);
    tabChangeHandler(Tabs.RESULT);
  };

  const contentArea =
    currentTab === Tabs.CONFIG ? (
      <ConfigTab onJsonChange={jsonChangeHandler} />
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
