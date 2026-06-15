import React from 'react'

import StyledFooter from './Footer.styled'
import { StyledLink } from '../../styled'

function Footer() {
  return (
    <StyledFooter className="Footer">
      <span>
        © {new Date().getFullYear()} Vitalii Burlaka | Designed by{' '}
        <a
          href="https://www.behance.net/tetianaburlaka"
          target="_blank"
          rel="noreferrer"
        >
          Tetiana Burlaka
        </a>
      </span>
      <div className="footer-links">
        <StyledLink
          href="https://github.com/vitaliiburlaka"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </StyledLink>
        <span> / </span>
        <StyledLink
          href="https://twitter.com/vitaliiburlaka"
          target="_blank"
          rel="noopener noreferrer"
        >
          Twitter
        </StyledLink>
        <span> / </span>
        <StyledLink
          href="https://www.linkedin.com/in/vitaliiburlaka/"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </StyledLink>
      </div>
    </StyledFooter>
  )
}

export default Footer
