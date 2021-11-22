import React from 'react'

import { StyledHeader, StyledLogo } from './Header.styled'
import { StyledLink } from '../../styled'

import reactNotiLogo from '../../assets/react-noti-logo.png'

function Header() {
  return (
    <StyledHeader className="Header">
      <StyledLogo className="logo">
        <a href="https://vitaliiburlaka.github.io/react-noti">
          <img src={reactNotiLogo} alt="React Noti logo" />
        </a>
      </StyledLogo>
      <StyledLink
        className="github"
        href="https://github.com/vitaliiburlaka/react-noti"
        target="_blank"
        rel="noopener noreferrer"
      >
        GitHub
      </StyledLink>
    </StyledHeader>
  )
}

export default Header
