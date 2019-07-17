import React from 'react';
import styled from 'styled-components';
import blueProp from './blueProp.png';
import greenProp from './greenProp.png';
import redProp from './redProp.png';
import yellowProp from './yellowProp.png';
import { NavLink } from 'react-router-dom';

const LogoWrapper = styled.div`
  color: var(--color-white);
  height: ${({size}) => size === 'small' ? '20rem' : '100%'};
  display: flex;
  align-items: center;
  font-weight: 700;
  font-size: 1.2rem;
  padding: 1rem;
`;

const bluePropel = <img src={blueProp} height='100%' alt="Propeller - Propel to Excel" />
const greenPropel = <img src={greenProp} height='100%' alt="Propeller - Propel to Excel" />
const redPropel = <img src={redProp} height='100%' alt="Propeller - Propel to Excel" />
const yellowPropel = <img src={yellowProp} height='100%' alt="Propeller - Propel to Excel" />


const coloredLogo = ({color, onClick}) => {
  if (color==='blue') {
    return bluePropel
  } else if (color==='green') {
    return greenPropel
  } else if (color==='red') {
    return redPropel
  } else if (color==='yellow') {
    return yellowPropel
  } else {
    return bluePropel
  }
}


const Logo = ({color, size}) => {
  return (
    <LogoWrapper size={size}>
      {coloredLogo({color})}
    </LogoWrapper>
  )
};

export default Logo;