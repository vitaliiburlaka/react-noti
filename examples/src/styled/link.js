import styled from 'styled-components'
import colors from '../styles/colors'

const StyledLink = styled.a`
  color: inherit;
  text-decoration: none;
  padding-bottom: 0.15em;
  transition: all 0.2s ease;

  &:hover {
    color: ${colors.deppPurple};
    box-shadow: 0 1px 0 0 currentColor;
  }
`

export default StyledLink
