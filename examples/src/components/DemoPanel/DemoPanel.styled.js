import styled from 'styled-components'

import colors from '../../styles/colors'

// eslint-disable-next-line import/prefer-default-export
export const StyledDemoPanel = styled.div`
  .DemoPanel__header {
    font-size: 48px;
    font-weight: bold;
    margin-bottom: 30px;

    .react-noti {
      font-size: 48px;
      color: ${colors.yellow};
      margin-bottom: 8px;
    }

    @media screen and (min-width: 1024px) {
      font-size: 56px;
      margin-bottom: 50px;

      .react-noti {
        font-size: 56px;
      }
    }

    @media screen and (min-width: 1200px) {
      font-size: 62px;

      .react-noti {
        font-size: 62px;
      }
    }
  }

  label {
    display: inline-block;
    min-width: 140px;

    &:not(:last-child) {
      margin-right: 32px;
    }
  }

  > section {
    display: flex;
    flex-direction: column;
  }

  .DemoPanel__buttons {
    margin-bottom: 16px;
  }

  .DemoPanel__props {
    section {
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
    }
  }

  @media screen and (min-width: 600px) {
    max-width: 593px;

    h2 {
      margin-bottom: 25px;
    }

    .DemoPanel__buttons {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-bottom: 32px;
    }

    .DemoPanel__props {
      display: block;
      flex-direction: unset;
    }
  }
`
