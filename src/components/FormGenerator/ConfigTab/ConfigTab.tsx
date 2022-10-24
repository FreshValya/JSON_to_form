import React, { useState } from 'react';

import Button from '../../IneractiveItems/Button';

import { Json } from '../types';

import styles from './ConfigTab.module.scss';

const inputTypes = ['number', 'text', 'textarea', 'checkbox', 'date', 'radio'];
const buttonTypes = ['reset', 'submit', 'button'];

interface Props {
  storedJson: Json;
  onJsonSubmit: (json: Json) => void;
}

const ConfigTab: React.FC<Props> = ({ storedJson, onJsonSubmit }) => {
  const [textArea, setTextArea] = useState(JSON.stringify(storedJson));
  const [jsonError, setJsonError] = useState<string | null>(null);

  const textAreaChangeHandler: React.ChangeEventHandler<HTMLTextAreaElement> = (
    event
  ) => {
    setTextArea(event.target.value);
  };

  const formSubmitHandler: React.FormEventHandler<HTMLFormElement> = (
    event
  ) => {
    event.preventDefault();

    let errorLog: string[] = [];
    let textAreaValue: Json = '';
    try {
      textAreaValue = JSON.parse(textArea);
    } catch (err) {
      setJsonError('Invalid JSON format');
      return;
    }

    if (typeof textAreaValue === 'object') {
      if (!('items' in textAreaValue)) {
        errorLog.push('Missed items');
      }
      if (!(textAreaValue?.items instanceof Array)) {
        errorLog.push('Items is not an array');
      }
      if (textAreaValue?.items?.length === 0) {
        errorLog.push('Items is empty');
      }

      if (!('buttons' in textAreaValue)) {
        errorLog.push('Missed buttons');
      }
      if (!(textAreaValue?.buttons instanceof Array)) {
        errorLog.push('Buttons is not an array');
      }
      if (textAreaValue?.buttons?.length === 0) {
        errorLog.push('Buttons is empty');
      }

      for (let i = 0; i < textAreaValue?.items?.length; i++) {
        if (!('label' in textAreaValue.items[i])) {
          errorLog.push(`Missed label in ${i + 1} item`);
        }
        if (!('type' in textAreaValue.items[i])) {
          errorLog.push(`Missed type in ${i + 1} item`);
        } else if (!inputTypes.includes(textAreaValue.items[i].type)) {
          errorLog.push(`Wrong type in ${i + 1} item`);
        }
      }

      for (let i = 0; i < textAreaValue?.buttons?.length; i++) {
        if (!('label' in textAreaValue.buttons[i])) {
          errorLog.push(`Missed label in ${i + 1} button`);
        }
        if (!('type' in textAreaValue.buttons[i])) {
          errorLog.push(`Missed type in ${i + 1} button`);
        } else if (!buttonTypes.includes(textAreaValue.buttons[i].type)) {
          errorLog.push(`Wrong type in ${i + 1} button`);
        }
      }
    }

    const isValid = errorLog.length === 0;

    if (isValid) {
      setJsonError(null);
      onJsonSubmit(textAreaValue as Json);
    } else {
      setJsonError(errorLog.join(',\n'));
    }
  };

  return (
    <form className={styles.configTab} onSubmit={formSubmitHandler}>
      <textarea value={textArea} onChange={textAreaChangeHandler} />
      <div className={styles.utils}>
        <pre>{jsonError}</pre>
        <Button type="submit" label="Apply" />
      </div>
    </form>
  );
};

export default ConfigTab;
