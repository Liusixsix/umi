import React from 'react';
import Hamburger from './Hamburger'
import Breadcrumb from './Breadcrumb'

export interface HamburgerProps {
  isActive: boolean;
  onTrigger: () => void;
}


const HeaderContent: React.FC<HamburgerProps> = ({ isActive, onTrigger }) => {
  return (
      <div className='header-main'>
          <Hamburger isActive={isActive} onTrigger={onTrigger}></Hamburger>
          <Breadcrumb></Breadcrumb>
      </div>
  );
}

export default HeaderContent