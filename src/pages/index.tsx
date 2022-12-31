import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"
import * as styles from "../components/index.module.css"

const links = [
  // {
  //   text: "Photo",
  //   url: "/photo",
  // },
  // {
  //   text: "Performance",
  //   url: "/performance",
  // },
  {
    text: "music",
    url: "/music",
  },
  {
    text: "video art",
    url: "/videoart",
  },
  // {
  //   text: "Poetry",
  //   url: "/poetry",
  // },
]

const IndexPage = () => (
  <Layout>
    <Seo title="Home" />
      <h1 className={styles.header}>
        Welcome to <b>Nicoco</b>
      </h1>
    <ul className={styles.list}>
      {links.map(link => (
        <li key={link.url} className={styles.listItem}>
          <a
            className={styles.listItemLink}
            href={`${link.url}`}
          >
            {link.text}
          </a>
        </li>
      ))}
    </ul>
  </Layout>
)

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Home" />

export default IndexPage
