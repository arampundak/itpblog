import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/footer.scss"
import { version } from "../../package.json"
import { i18n } from "../i18n"

interface Options {
  links?: Record<string, string>
  customAttribution?: {
    beforeAuthor: string
    authorName: string
    authorUrl: string
    between: string
    productName: string
    productUrl: string
  }
}

export default ((opts?: Options) => {
  const Footer: QuartzComponent = ({ displayClass, cfg }: QuartzComponentProps) => {
    const year = new Date().getFullYear()
    const links = opts?.links ?? {}
    const customAttribution = opts?.customAttribution
    return (
      <footer class={`${displayClass ?? ""}`}>
        {customAttribution ? (
          <p>
            {customAttribution.beforeAuthor}{" "}
            <a href={customAttribution.authorUrl}>{customAttribution.authorName}</a>{" "}
            {customAttribution.between}{" "}
            <a href={customAttribution.productUrl}>{customAttribution.productName}</a>
          </p>
        ) : (
          <p>
            {i18n(cfg.locale).components.footer.createdWith}{" "}
            <a href="https://quartz.jzhao.xyz/">Quartz v{version}</a> © {year}
          </p>
        )}
        {Object.keys(links).length > 0 && (
          <ul>
            {Object.entries(links).map(([text, link]) => (
              <li>
                <a href={link}>{text}</a>
              </li>
            ))}
          </ul>
        )}
      </footer>
    )
  }

  Footer.css = style
  return Footer
}) satisfies QuartzComponentConstructor
