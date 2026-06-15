import styled from 'styled-components'

import colors from '../../styles/colors'

export const StyledDemoPanel = styled.div`
  @media screen and (min-width: 600px) {
    max-width: 593px;
  }
`

export const StyledDemoHeader = styled.div`
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 30px;

  > h2 {
    font-size: 48px;
    color: ${colors.yellow};
    margin-bottom: 8px;
  }

  @media screen and (min-width: 1024px) {
    font-size: 56px;
    margin-bottom: 50px;

    > h2 {
      font-size: 56px;
    }
  }

  @media screen and (min-width: 1200px) {
    font-size: 62px;

    > h2 {
      font-size: 62px;
    }
  }
`
export const StyledDemoButtons = styled.div`
  margin-left: -8px;
  margin-right: -8px;
  margin-bottom: 16px;

  @media screen and (min-width: 600px) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 32px;
  }
`

export const StyledDemoProps = styled.div`
  label {
    display: inline-block;
    min-width: 140px;
    margin-bottom: 8px;

    &:not(:last-child) {
      margin-right: 32px;
    }
  }

  section {
    display: flex;
    flex-direction: column;
    margin-bottom: 8px;

    &:nth-child(2) {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;

      input[type='text'] {
        width: 120px;

        &:last-child {
          margin-right: 0;
        }
      }
    }

    @media screen and (min-width: 600px) {
      display: block;
      flex-direction: unset;
    }
  }
`
