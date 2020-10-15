import styled from 'styled-components'
import colors from '../styles/colors'

const StyledButton = styled.button`
  display: inline-block;
  cursor: pointer;
  color: #fff;
  font-family: inherit;
  font-size: inherit;
  font-weight: 600;
  line-height: 2em;
  text-transform: capitalize;
  border: 0;
  border-radius: 4px;
  padding: 3px 16px;
  margin: 8px;
  min-width: 8rem;
  transition: all 0.15s ease;
  background-color: ${({ kind }) =>
    colors[kind] ? colors[kind] : colors.deppPurple};

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }

  &[disabled] {
    cursor: not-allowed;
    filter: grayscale(100%);
  }
`

export default StyledButton
