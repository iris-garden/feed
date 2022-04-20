export const inflate = (
  parentElement,
  id,
  fields,
  data
) => {
  data.forEach(
    (item) => {
      const component =
        document.getElementById(id).content.cloneNode(true)
      fields.forEach(
        (field) => {
          const { clss, expr, attr } = field
          clss.forEach(
            (cls) => {
              const element = component.querySelector(`.${cls}`)
              const val = expr(item)
              if (attr !== undefined) {
                element.setAttribute(attr, val)
              } else {
                element.innerHTML = val
              }
            }
          )
        }
      )
      parentElement.appendChild(component)
    }
  )
}

export const Template = (
  id,
  fields,
  data
) => class extends HTMLElement {
  connectedCallback() {
    inflate(this, id, fields, data)
  }
}

export const display = (pages) => {
  pages.forEach(
    (page) => page.forEach(
      ([{ id, fields }, data]) =>
        customElements.define(id, Template(id, fields, data))
    )
  )
}
