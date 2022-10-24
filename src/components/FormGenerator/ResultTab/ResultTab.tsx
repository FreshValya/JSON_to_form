import React from 'react';

import Input from '../../IneractiveItems/Input';
import Button from '../../IneractiveItems/Button';
import Textarea from '../../IneractiveItems/Textarea';

import { Json } from '../types';

import styles from './ResultTab.module.scss';

interface Props {
  json: Json;
}

const ResultTab: React.FC<Props> = ({ json }) => {
  const formItems =
    typeof json === 'object'
      ? json.items.map((item) => {
          if (item.type === 'textarea') {
            return <Textarea key={item.label + item.type} label={item.label} />;
          } else {
            return (
              <Input
                key={item.label + item.type}
                type={item.type}
                label={item.label}
              />
            );
          }
        })
      : null;
  const formButtons =
    typeof json === 'object'
      ? json.buttons.map((button) => (
          <Button
            key={button.label + button.type}
            type={button.type}
            label={button.label}
          />
        ))
      : null;
  const formHeader =
    typeof json === 'object' && 'header' in json ? json.header : null;

  const formSubmitHandler: React.FormEventHandler<HTMLFormElement> = (
    event
  ) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={formSubmitHandler} className={styles.resultTab}>
      {formHeader && <h1>{formHeader}</h1>}
      <div className={styles.formItems}>{formItems}</div>
      <div className={styles.formButtons}>{formButtons}</div>
    </form>
  );
};

export default ResultTab;
