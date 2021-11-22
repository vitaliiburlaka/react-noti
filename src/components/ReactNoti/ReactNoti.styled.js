import styled, { css } from 'styled-components'

import typography from '../../styles/typography'
import breakpoints from '../../styles/breakpoints'
import colors from '../../styles/colors'
import { POSITION } from '../../utils/constants'

export const StyledReactNoti = styled.div`
  font-family: ${typography.fontFamily};
  font-weight: ${typography.fontWeight};
  line-height: ${typography.lineHeight};

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
`

function getPositionStyles(position) {
  switch (position) {
    case POSITION.TOP_CENTER:
      return css`
        top: 0;
      `
    case POSITION.TOP_RIGHT:
      return css`
        top: 0;

        @media screen and (min-width: ${breakpoints.medium}px) {
          left: initial;
          transform: initial;
          right: 0;
        }
      `
    case POSITION.TOP_LEFT:
      return css`
        top: 0;

        @media screen and (min-width: ${breakpoints.medium}px) {
          right: initial;
          left: 0;
          transform: initial;
        }
      `
    case POSITION.BOTTOM_CENTER:
      return css`
        bottom: 0;
      `
    case POSITION.BOTTOM_RIGHT:
      return css`
        bottom: 0;

        @media screen and (min-width: ${breakpoints.medium}px) {
          left: initial;
          right: 0;
          transform: initial;
        }
      `
    case POSITION.BOTTOM_LEFT:
      return css`
        bottom: 0;

        @media screen and (min-width: ${breakpoints.medium}px) {
          right: initial;
          left: 0;
          transform: initial;
        }
      `
    default:
      return {}
  }
}

export const StyledTray = styled.div`
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  color: ${colors.primary};
  text-align: left;
  padding: 8px;
  width: calc(100% - 32px);
  z-index: 4000;

  @media screen and (min-width: ${breakpoints.medium}px) {
    width: 360px;
  }

  ${(props) => getPositionStyles(props.position)}
`
