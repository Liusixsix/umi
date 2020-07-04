import React, { memo } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

import { HamburgerProps } from './index';
import './index.less'


function Hamburger({ isActive, onTrigger }: HamburgerProps) {
  return (
    <div className="header-bar__hamburger" onClick={onTrigger}>
      {isActive ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
    </div>
  );
}

export default memo(Hamburger);
