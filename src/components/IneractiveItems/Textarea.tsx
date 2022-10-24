import React from 'react';

import styles from './Textarea.module.scss';

interface Props {
  label: string;
}

const Textarea: React.FC<Props> = ({ label }) => {
  return (
    <div className={styles.textareaItem}>
      <label>{label}</label>
      <textarea />
    </div>
  );
};

export default Textarea;
