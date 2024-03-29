/**
 * Helper function that generates media queries based on breakpoint, e.g.
 * getMediaQuery(720) => '@media screen and (min-width: 720px)'
 */
export const getMediaQuery = (breakpoint) =>
  `@media screen and (min-width: ${breakpoint}px)`

export const getMediaQueries = (breakpoints) =>
  Object.keys(breakpoints)
    .map((key) => breakpoints[key])
    .sort((a, b) => a - b)
    .map(getMediaQuery)
