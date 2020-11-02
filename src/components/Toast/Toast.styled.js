import styled from 'styled-components'

import colors from '../../styles/colors'
import closeIconSrc from '../../assets/close-16.svg'

// Root
export const StyledToast = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  min-height: 48px;
  max-height: 600px;
  color: ${colors.primary};
  background-color: ${({ type }) => (type ? colors[type] : '#fff')};
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 3px 9px rgba(0, 0, 0, 0.175);

  /* IE 11 min-height bug workaround */
  @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
    &::after {
      content: '';
      min-height: inherit;
    }
  }

  &:not(:last-child) {
    margin-bottom: 8px;
  }
`
// Icon
export const StyledRNIcon = styled.span`
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

export const StyledBody = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 14px;
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
    background-image: url(${closeIconSrc});
    background-repeat: no-repeat;
    background-position: center;
  }
`

// Progress bar
export const StyledProgress = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 4px;
  width: 100%;
  background-color: ${({ kind }) => (kind ? colors[`${kind}Dark`] : '#fff')};

  @keyframes rnShrinkWidth {
    from {
      width: 100%;
    }

    to {
      width: 0%;
    }
  }
`
