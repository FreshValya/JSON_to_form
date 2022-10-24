import React from 'react';

interface InputAttributes {
  label: string;
  type: React.HTMLInputTypeAttribute;
}

interface ButtonAttributes {
  label: string;
  type: 'submit' | 'reset' | 'button';
}

type Json =
  | {
      items: InputAttributes[];
      buttons: ButtonAttributes[];
      header?: string;
    }
  | '';

export type { Json, InputAttributes, ButtonAttributes };
