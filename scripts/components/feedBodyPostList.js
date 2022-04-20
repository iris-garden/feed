export const usernameToName = (username) =>
  username
    .split("-")
    .map((subname) => subname.charAt(0).toUpperCase() + subname.slice(1))
    .join(" ")

export const feedBodyPostList = {
  id: "feed-body-post-list",
  fields: [
    {
      clss: ["feed-body-post-header-user-pic-image"],
      expr: ({ username }) => `images/${username}/profile-picture.jpg`,
      attr: "src"
    },
    {
      clss: [
        "feed-body-post-header-user-pic-profile-link",
        "feed-body-post-header-right-user-name-profile-link"
      ],
      expr: ({ username }) => `users/${username}.html`,
      attr: "href"
    },
    {
      clss: ["feed-body-post-header-right-timestamp"],
      expr: ({ day, time }) => `${day}, ${time}`,
    },
    {
      clss: ["feed-body-post-header-right-user-name-profile-link"],
      expr: ({ username }) => usernameToName(username),
    },
    {
      clss: ["feed-body-post-image"],
      expr: ({ image, username }) => `images/${username}/${image}.jpg`,
      attr: "src",
    },
    {
      clss: ["feed-body-post-text"],
      expr: ({ text }) => {
        let index = 0
        let isTag = false
        let username = ""
        let tagged = ""
        while (index < text.length) {
          const current = text.charAt(index)
          if (current === "@") {
            isTag = true
          } else if (isTag && current !== "-" && current.match(/\W/)) {
            // TODO add subcomponents to templating and extract the html
            tagged += [
              `<a class="feed-body-post-text-profile-link" href="users/`,
              username,
              `.html">`,
              "@",
              usernameToName(username),
              "</a>",
              current
            ].join("")
            username = ""
            isTag = false
          } else if (isTag) {
            username += current
          } else {
            tagged += current
          }
          ++index
        }
        return tagged
      }
    }
  ]
}
