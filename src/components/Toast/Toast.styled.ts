import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'

import colors from '../../styles/colors'
import type { MsgType } from '../../utils/constants'

const rnShrinkWidth = keyframes`
  from {
    width: 100%;
  }
  to {
    width: 0%;
  }
`

const rnSpin = keyframes`
  to {
    transform: rotate(360deg);
  }
`

const rnEnter = keyframes`
  from {
    opacity: 0;
    transform: translateY(-12px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`

const rnLeave = keyframes`
  from {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  to {
    opacity: 0;
    transform: translateY(-8px) scale(0.96);
  }
`

// Loading spinner (rendered in place of a type icon for the `loading` type)
export const StyledSpinner = styled.span`
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: 50%;
  animation: ${rnSpin} 0.7s linear infinite;
`

// Root
export const StyledToast = styled('div', {
  shouldForwardProp: (prop) =>
    prop !== 'type' && prop !== 'isLeaving' && prop !== 'headless',
})<{ type?: MsgType; isLeaving?: boolean; headless?: boolean }>`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  color: var(--react-noti-color, ${colors.primary});

  /* Headless (custom render) toasts drop all default chrome; the caller styles
     the content themselves. They keep only the stacking gap and animation. */
  ${({ headless, type }) =>
    headless
      ? 'background-color: transparent;'
      : `
    min-height: 48px;
    max-height: 600px;
    background-color: ${
      type ? `var(--react-noti-bg-${type}, ${colors[type]})` : '#fff'
    };
    border-radius: var(--react-noti-radius, 4px);
    overflow: hidden;
    box-shadow: var(--react-noti-shadow, 0 3px 9px rgba(0, 0, 0, 0.175));
  `}

  &:not(:last-child) {
    margin-bottom: 8px;
  }

  /* Enter/exit motion is opt-in for users who don't ask to reduce motion. */
  @media (prefers-reduced-motion: no-preference) {
    animation: ${({ isLeaving }) => (isLeaving ? rnLeave : rnEnter)}
      ${({ isLeaving }) => (isLeaving ? '0.2s' : '0.25s')} ease both;
  }
`
// Icon
export const StyledIcon = styled.span`
  display: inline-block;
  color: currentColor;
  fill: currentColor;
  width: 16px;
  height: 16px;
`

export const StyledType = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  padding-top: 8px;
  padding-bottom: 8px;
  overflow: hidden;
`

export const StyledBody = styled('div', {
  shouldForwardProp: (prop) => prop !== 'icons',
})<{ icons: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: var(--react-noti-font-size, 14px);
  font-weight: 200;
  padding: ${({ icons }) => (icons ? '8px' : '8px 12px')};
  margin-right: 22px;

  > strong {
    font-size: 13px;
    font-weight: 600;
    margin-top: 0;
    margin-bottom: 4px;
  }
`

export const StyledBtnDismiss = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  flex-shrink: 0;
  background: transparent;
  color: inherit;
  border: 0;
  opacity: 0.6;
  padding: 8px;
  transition: opacity 0.15s ease;

  &:hover {
    opacity: 1;
  }

  > span {
    width: 9px;
    height: 9px;
  }

  svg {
    display: block;
    width: 100%;
    height: 100%;
  }
`

// Progress bar
export const StyledProgress = styled('div', {
  shouldForwardProp: (prop) => prop !== 'kind' && prop !== 'duration',
})<{ kind?: MsgType; duration: number }>`
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 4px;
  width: 100%;
  background-color: ${({ kind }) =>
    kind
      ? `var(--react-noti-progress-${kind}, ${colors[`${kind}Dark`]})`
      : '#fff'};
  animation: ${rnShrinkWidth} ${({ duration }) => duration}ms linear;
`
