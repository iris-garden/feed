export const feedBodyPostList = {
  id: "feed-body-post-list",
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
  ]
}
