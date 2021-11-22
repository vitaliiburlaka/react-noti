import styled from 'styled-components'

export const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  left: 16px;
  right: 16px;

  @media screen and (min-width: 600px) {
    position: static;
    left: initial;
    right: initial;
  }
`

export const StyledLogo = styled.h1`
  font-size: 1.25rem;
  font-weight: normal;
  margin-bottom: 0;
  height: 40px;

  a {
    color: inherit;
    outline: 0;
    box-shadow: none;
    padding-bottom: initial;
  }

  img {
    max-height: 100%;
  }
`
