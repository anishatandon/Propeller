import React from 'react';
import styled from 'styled-components';
// import { withAuthorization } from '../Session';

import Heading from '../UI/Heading';
import { Container } from '../../hoc/layout/elements';
import moment from 'moment';
// import { Link } from 'react-router-dom';
// import * as ROUTES from '../../constants/routes';
import Todos from '../Todos/Todos';


const Wrapper = styled.div`
    width: 100%;
    align-self: flex-start;
    height: 100%;
    min-height: calc(100vh - 6rem);
    background-color: var(--color-mainLighter);
`;

const InnerWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 3rem 4rem;
`;

const HomePage = () => {
  return(
      <Wrapper>
          <Container>
              <InnerWrapper>
                <Heading noMargin size="h1" color="white">Home</Heading>
                <img src="https://image.flaticon.com/icons/svg/267/267711.svg" alt="Home" />
                <Heading bold size="h2" color="white">
                  Tasks for {moment().format('dddd, LL')}
                </Heading>
                <Todos />
              </InnerWrapper>
          </Container>
      </Wrapper>
    )
};


// const HomePage = () => (
//   <div>
//     <h1>Home</h1>
//     <img src="https://image.flaticon.com/icons/svg/267/267711.svg" alt="Home" />
//     <h1>
//       Tasks for {moment().format('dddd, LL')}
//     </h1>
//     <h1>
//       Fix this freaking app!!
//     </h1>
//   </div>
// );

// const condition = authUser => !!authUser;

// export default withAuthorization(condition)(HomePage);

export default HomePage;