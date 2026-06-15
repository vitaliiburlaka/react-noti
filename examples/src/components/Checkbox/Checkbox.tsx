import type { InputHTMLAttributes } from 'react'

import { StyledCheckbox } from './Checkbox.styled'

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  checked?: boolean
}

function Checkbox({ checked, ...rest }: CheckboxProps) {
  return (
    <StyledCheckbox checked={checked}>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <input type="checkbox" checked={checked} {...rest} />
    </StyledCheckbox>
  )
}

export default Checkbox
