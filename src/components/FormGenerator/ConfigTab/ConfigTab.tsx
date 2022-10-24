import React, { useState } from 'react';

import Button from '../../IneractiveItems/Button';

import { Json } from '../types';

import styles from './ConfigTab.module.scss';

const inputTypes = ['number', 'text', 'textarea', 'checkbox', 'date', 'radio'];
const buttonTypes = ['reset', 'submit', 'button'];

const JSON_temp = {
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
};

interface Props {
  onJsonChange: (json: Json) => void;
}

const ConfigTab: React.FC<Props> = ({ onJsonChange }) => {
  const [txtArea, setTxtArea] = useState(JSON.stringify(JSON_temp));
  const [jsonError, setJsonError] = useState<string | null>(null);

  const textAreaChangeHandler: React.ChangeEventHandler<HTMLTextAreaElement> = (
    event
  ) => {
    setTxtArea(event.target.value);
  };

  const formSubmitHandler: React.FormEventHandler<HTMLFormElement> = (
    event
  ) => {
    event.preventDefault();

    let isValid = true;
    let errorLog: string[] = [];
    let txtAreaValue: Json = '';
    try {
      txtAreaValue = JSON.parse(txtArea);
    } catch (err) {
      setJsonError('Невалидный формат JSON');
      return;
    }

    if (typeof txtAreaValue === 'object') {
      if (!('items' in txtAreaValue)) {
        errorLog.push('Missed items');
        isValid = false;
      }
      if (!(txtAreaValue?.items instanceof Array)) {
        errorLog.push('Items is not an array');
        isValid = false;
      }
      if (txtAreaValue?.items?.length === 0) {
        errorLog.push('Items is empty');
        isValid = false;
      }

      if (!('buttons' in txtAreaValue)) {
        errorLog.push('Missed buttons');
        isValid = false;
      }
      if (!(txtAreaValue?.buttons instanceof Array)) {
        errorLog.push('Buttons is not an array');
        isValid = false;
      }
      if (txtAreaValue?.buttons?.length === 0) {
        errorLog.push('Buttons is empty');
        isValid = false;
      }

      for (let i = 0; i < txtAreaValue?.items?.length; i++) {
        if (!('label' in txtAreaValue.items[i])) {
          errorLog.push(`Missed label in ${i + 1} item`);
          isValid = false;
        }
        if (!('type' in txtAreaValue.items[i])) {
          errorLog.push(`Missed type in ${i + 1} item`);
          isValid = false;
        } else if (!inputTypes.includes(txtAreaValue.items[i].type)) {
          errorLog.push(`Wrong type in ${i + 1} item`);
          isValid = false;
        }
      }

      for (let i = 0; i < txtAreaValue?.buttons?.length; i++) {
        if (!('label' in txtAreaValue.buttons[i])) {
          errorLog.push(`Missed label in ${i + 1} button`);
          isValid = false;
        }
        if (!('type' in txtAreaValue.buttons[i])) {
          errorLog.push(`Missed type in ${i + 1} button`);
          isValid = false;
        } else if (!buttonTypes.includes(txtAreaValue.buttons[i].type)) {
          errorLog.push(`Wrong type in ${i + 1} button`);
          isValid = false;
        }
      }
    }

    if (isValid) {
      setJsonError(null);
      onJsonChange(txtAreaValue as Json);
    } else {
      setJsonError(errorLog.join(',\n'));
    }
  };

  return (
    <form className={styles.configTab} onSubmit={formSubmitHandler}>
      <textarea value={txtArea} onChange={textAreaChangeHandler} />
      <div className={styles.utils}>
        <pre>{jsonError}</pre>
        <Button type="submit" label="Apply" />
      </div>
    </form>
  );
};

export default ConfigTab;
