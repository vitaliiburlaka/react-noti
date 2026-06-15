import styled from '@emotion/styled'

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 1280px;
  margin: 0 auto;
  padding: 16px;
  min-height: 100vh;

  @media screen and (min-width: 600px) {
    padding: 16px 30px;
  }
`

export default StyledApp
