import { getMediaQuery } from '../heplers/responsive-helpers'
import breakpoints from './breakpoints'

const mediaQuery = {
  small: getMediaQuery(breakpoints.small),
  medium: getMediaQuery(breakpoints.medium),
  large: getMediaQuery(breakpoints.large),
}

export default mediaQuery
