import React from 'react'
import PropTypes from 'prop-types'

import { StyledCheckbox } from './Checkbox.styled'

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  checked?: boolean
}

function Checkbox({ checked, ...rest }: CheckboxProps) {
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
