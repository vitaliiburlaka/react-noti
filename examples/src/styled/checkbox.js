import styled from 'styled-components'

import colors from '../styles/colors'

const StyledCheckbox = styled.input`
  position: relative;
  top: 5px;
  width: 15px;
  height: 15px;
  background: transparent;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;

  &::before {
    position: absolute;
    content: '';
    width: 15px;
    height: 15px;
    border: 1px solid ${colors.primary};
    border-radius: 3px;
  }

  &:checked {
    &::before {
      background-color: ${colors.offYellow};
    }

    &::after {
      position: absolute;
      top: -2px;
      left: 4px;
      content: 'L';
      font-size: 13px;
      font-weight: bold;
      color: ${colors.primary};
      transform: rotate(40deg) scaleX(-1);
    }
  }
`

export default StyledCheckbox
