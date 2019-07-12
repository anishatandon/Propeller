import React from 'react';
import styled from 'styled-components';

const LogoWrapper = styled.div`
  color: var(--color-white);
  height: 100%;
  display: flex;
  align-items: center;
  font-weight: 700;
  font-size: 1.2rem;
  padding: 1rem;
`;

const Logo = () => {
  return (
    <LogoWrapper>
      <img src="https://image.flaticon.com/icons/svg/267/267711.svg" alt="Propeller--Propel to Excel" />
    </LogoWrapper>
  )
};

export default Logo;