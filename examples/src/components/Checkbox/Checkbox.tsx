import type { InputHTMLAttributes } from 'react'

import { StyledCheckbox } from './Checkbox.styled'

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  checked?: boolean
}

function Checkbox({ checked, ...rest }: CheckboxProps) {
  return (
    <StyledCheckbox checked={checked}>
      <input type="checkbox" checked={checked} {...rest} />
    </StyledCheckbox>
  )
}

export default Checkbox
