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
import { CircularProgress, withStyles } from '@material-ui/core';

import { COLORS } from 'jupyter-extensions-shared';

// tslint:disable:enforce-name-casing
const StyledProgress = withStyles({
  root: {
    color: COLORS.link,
  },
})(CircularProgress);

/** Styled Progress indicator */
export function Progress() {
  return <StyledProgress size="18px" />;
}
