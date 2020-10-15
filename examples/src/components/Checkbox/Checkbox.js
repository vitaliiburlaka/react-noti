/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import PropTypes from 'prop-types'

import { StyledCheckbox } from './Checkbox.styled'

function Checkbox({ checked, ...rest }) {
  return (
    <StyledCheckbox checked={checked}>
      <input type="checkbox" checked={checked} {...rest} />
    </StyledCheckbox>
  )
}

Checkbox.propTypes = {
  checked: PropTypes.bool,
}

export default Checkbox
