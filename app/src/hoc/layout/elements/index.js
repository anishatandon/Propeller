import styled from 'styled-components';
import { Form } from 'formik';

export const Container = styled.div`
  width: 100%;
  max-width: 100%;
  margin: 0 0 0 0;
  height: 100%;
  background-color: var(--color-mainLight);
`;

export const FormWrapper = styled.div`
  width: 100%;
  max-width: 60rem;
  margin: 2rem 2rem 2rem 2rem;
  border-radius: 0.7rem;
  padding: 3rem 6rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--color-mainDark);
  box-shadow: 0rem 0.5rem 3.5rem var(--shadow);
`;

export const StyledForm = styled(Form)`
  display: flex;
  position: relative;
  align-items: center;
  width: 100%;
  flex-direction: column;
  max-width: 100%;
`;