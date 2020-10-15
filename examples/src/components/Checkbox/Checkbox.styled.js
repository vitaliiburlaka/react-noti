import styled, { css } from 'styled-components'

import colors from '../../styles/colors'

// eslint-disable-next-line import/prefer-default-export
export const StyledCheckbox = styled.span`
  display: inline-block;
  position: relative;
  /* top: 5px; */
  width: 15px;
  height: 15px;
  vertical-align: middle;
  background: transparent;

  &::before {
    position: absolute;
    content: '';
    width: 15px;
    height: 15px;
    border: 1px solid ${colors.primary};
    border-radius: 3px;
  }

  ${({ checked }) =>
    checked &&
    css`
      &::before {
        background-color: ${colors.offYellow};
      }

      &::after {
        position: absolute;
        top: -1px;
        left: 4px;
        content: 'L';
        font-size: 13px;
        font-weight: bold;
        color: ${colors.primary};
        transform: rotate(40deg) scaleX(-1);
      }
    `}

  /* &:checked {
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
  } */

  input[type='checkbox'] {
    display: none;
  }
`
