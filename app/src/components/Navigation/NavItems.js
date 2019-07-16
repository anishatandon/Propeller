import React from 'react';
import styled from 'styled-components';

import NavItem from './NavItem';

const Nav = styled.nav`
  display: flex;
  margin-top: ${props => (props.mobile ? '-6rem' : null)};
`;

const Ul = styled.ul`
  display: flex;
  flex-direction: ${props => (props.mobile ? 'column' : 'row')};
  align-items: center;
  height: 100%;
`;

const NavItems = ({ mobile, clicked, signedIn }) => {
  let links;
  if (signedIn.uid) {
    links = (
      <Ul mobile={mobile}>
        <NavItem mobile={mobile} clicked={clicked} link="/">
          Home
        </NavItem>
        {/* <NavItem mobile={mobile} clicked={clicked} link="/todos">
          Add Tasks
        </NavItem> */}
        <NavItem mobile={mobile} clicked={clicked} link="/calendar">
          Calendar
        </NavItem>
        <NavItem mobile={mobile} clicked={clicked} link="/friends">
          Friends
        </NavItem>
        <NavItem mobile={mobile} clicked={clicked} link="/account">
          Edit Account
        </NavItem>
        <NavItem mobile={mobile} clicked={clicked} link="/signout">
          Signout
        </NavItem>
      </Ul>
    )
  } else {
    links = (
      <Ul mobile={mobile}>
        <NavItem mobile={mobile} clicked={clicked} link="/signin">
          Signin
        </NavItem>
        <NavItem mobile={mobile} clicked={clicked} link="/signup">
          Signup
        </NavItem>
      </Ul>
    )
  }
  return <Nav mobile={mobile}>{links}</Nav>
}
//   return (
//     <Nav mobile={mobile}>
//       <Ul mobile={mobile}>
//         <NavItem mobile={mobile} clicked={clicked} link="/">
//           Home
//         </NavItem>
//         <NavItem mobile={mobile} clicked={clicked} link="/todos">
//           Todos
//         </NavItem>
        
        
//       </Ul>
//     </Nav>
//   );
// };

export default NavItems;