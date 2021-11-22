import styled from 'styled-components'

const StyledFooter = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  font-size: 0.75rem;

  .footer-links {
    margin-top: 10px;
    font-size: 0.825rem;
  }

  @media screen and (min-width: 600px) {
    flex-direction: row;
    align-items: initial;

    .footer-links {
      margin-top: 0;
    }
  }
`

export default StyledFooter
