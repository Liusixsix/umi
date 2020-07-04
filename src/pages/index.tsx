import React from 'react';
import { Redirect } from 'umi';

export default () => (
    <Redirect
      exact
      from='/'
      to={{
        pathname: '/dashboard',
        state: {},
      }}
    />
);
