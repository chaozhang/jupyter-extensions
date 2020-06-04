/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as React from 'react';
import { classes } from 'typestyle';

import { css } from 'jupyter-extensions-shared';

interface TextInputProps {
  disabled?: boolean;
  type?: string;
  min?: string;
  max?: string;
  label?: string;
  name?: string;
  value?: string;
  placeholder?: string;
  hasError?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

/** Funtional Component for text input fields */
// tslint:disable-next-line:enforce-name-casing
export function TextInput(props: TextInputProps) {
  const { label, hasError, ...inputProps } = props;

  return (
    <div className={classes(css.inputContainer, hasError && 'error')}>
      {label && <label>{label}</label>}
      <input
        className={classes(css.input, hasError && 'error')}
        {...inputProps}
      />
    </div>
  );
}
