import React from 'react';

import { InputAttributes } from '../FormGenerator/types';

import styles from './Input.module.scss';

interface Props extends InputAttributes {}

const InputRadio: React.FC<Props> = ({ type, name, label }) => {
  return (
    <div className={styles.inputItem}>
      <input type={type} id={label} name={name} />
      <label htmlFor={label}>{label}</label>
    </div>
  );
};

export default InputRadio;
