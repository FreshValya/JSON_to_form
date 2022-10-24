import React from 'react';

import { InputAttributes } from '../FormGenerator/types';

import styles from './Input.module.scss';

interface Props extends InputAttributes {}

const Input: React.FC<Props> = ({ type, label }) => {
  return (
    <div className={styles.inputItem}>
      <label>{label}</label>
      <input type={type} />
    </div>
  );
};

export default Input;
