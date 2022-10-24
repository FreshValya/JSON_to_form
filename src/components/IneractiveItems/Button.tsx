import React from 'react';

import { ButtonAttributes } from '../FormGenerator/types';

import styles from './Button.module.scss';

interface Props extends ButtonAttributes {}

const Button: React.FC<Props> = ({ label, type }) => {
  return (
    <button type={type} className={styles.button}>
      {label}
    </button>
  );
};

export default Button;
