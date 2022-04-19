const page = {
  posts: {
    fields: [
      {
        cls: "feed-body-post-header-user-pic-image",
        expr: ({ username }) => `images/${username}/profile-picture.jpg`,
        attr: "src"
      },
      {
        cls: "feed-body-post-header-user-pic-profile-link",
        expr: ({ username }) => `users/${username}.html`,
        attr: "href"
      },
      // TODO multiple cls values for same expr/attr
      {
        cls: "feed-body-post-header-right-user-name-profile-link",
        expr: ({ username }) => `users/${username}.html`,
        attr: "href"
      },
      {
        cls: "feed-body-post-header-right-timestamp",
        expr: ({ day, time }) => `${day}, ${time}`,
      },
      // TODO split username and caps
      {
        cls: "feed-body-post-header-right-user-name-profile-link",
        expr: ({ username }) => "Sashi Summerfield",
      },
      {
        cls: "feed-body-post-image",
        expr: ({ image, username }) => `images/${username}/${image}.jpg`,
        attr: "src",
      },
      // TODO insert links to other profiles
      {
        cls: "feed-body-post-text",
        expr: ({ text }) => text
      }
    ],
    items: [
      {
        // user ID
        username: "sashi-summerfield",
        // day posted
        day: "Yesterday",
        // time of day posted
        time: "1:12 pm",
        // image file at the path images/<username>/<file>, if included, or null if not
        image: "valentines-picture",
        // post text
        text: 'Happy Valentine to my cutie patootie, <a class="feed-body-post-text-profile-link" href="users/blake-costa.html">@Blake Costa</a> ! 50 years and counting !!!'
      },
      {
        // user ID
        username: "sashi-summerfield",
        // day posted
        day: "Today",
        // time of day posted
        time: "11:41 am",
        // image file at the path images/<username>/<file>, if included, or null if not
        image: "valentines-picture",
        // post text
        text: 'Happy pre-Valentine to my cutie patootie, <a class="feed-body-post-text-profile-link" href="users/blake-costa.html">@Blake Costa</a> ! 50 years and counting !!!'
      }
    ]
  }
}

const useTemplate = (parentElement, templateId) => {
  const data = parentElement.getAttribute("data")
  if (data !== null) {
    const { items, fields } = page[data]
    items.forEach((item) => {
      const component = document.getElementById(templateId).content.cloneNode(true)
      fields.forEach((field) => {
        const { attr, cls, expr } = field
        const element = component.querySelector(`.${cls}`)
        const val = expr(item)
        if (attr !== undefined) {
          element.setAttribute(attr, val)
        } else {
          element.innerHTML = val
        }
      })
      parentElement.appendChild(component)
    })
  }
}

const TemplateClass = (templateId) => class extends HTMLElement {
  connectedCallback() {
    useTemplate(this, templateId)
  }
}

const templates = ["feed-body-post-list"]

templates.forEach((template) => customElements.define(template, TemplateClass(template)))
