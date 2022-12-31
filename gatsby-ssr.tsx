import * as React from "react"

/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/ssr-apis/
 */

export const onRenderBody = ({ setHtmlAttributes, setHeadComponents }) => {
  setHtmlAttributes({ lang: `en` })
  setHeadComponents([
    <link
      key="vcr"
      rel="preload"
      href="/fonts/VCROSDMono.woff2"
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
    />
  ])
}
