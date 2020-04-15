const samplePosts = {
  _links: {
    next: null,
    prev: null,
    self: "/api/posts?page=1&per_page=10",
  },
  _meta: {
    page: 1,
    per_page: 10,
    total_items: 6,
    total_pages: 1,
  },
  items: [
    {
      _links: {
        self: "/api/posts/10",
      },
      author: {
        _links: {
          avatar:
            "https://www.gravatar.com/avatar/6a73e4d51fe958e9d4d688108560e3d1?d=robohash&s=128",
          followed: "/api/users/1/followed",
          followers: "/api/users/1/followers",
          self: "/api/users/1",
        },
        about_me: "I am a Web Developer.",
        followed_count: 1,
        follower_count: 1,
        id: 1,
        isFollowing: false,
        last_seen: "2020-04-11T11:37:10Z",
        post_count: 5,
        username: "cyogian",
      },
      body: "Enough is enough!",
      created_at: "2020-04-15T15:38:45Z",
      id: 10,
      language: "",
    },
    {
      _links: {
        self: "/api/posts/9",
      },
      author: {
        _links: {
          avatar:
            "https://www.gravatar.com/avatar/6a73e4d51fe958e9d4d688108560e3d1?d=robohash&s=128",
          followed: "/api/users/1/followed",
          followers: "/api/users/1/followers",
          self: "/api/users/1",
        },
        about_me: "I am a Web Developer.",
        followed_count: 1,
        follower_count: 1,
        id: 1,
        isFollowing: false,
        last_seen: "2020-04-11T11:37:10Z",
        post_count: 5,
        username: "cyogian",
      },
      body: "Enough is enough. WTF",
      created_at: "2020-04-15T15:20:05Z",
      id: 9,
      language: "af",
    },
    {
      _links: {
        self: "/api/posts/8",
      },
      author: {
        _links: {
          avatar:
            "https://www.gravatar.com/avatar/6a73e4d51fe958e9d4d688108560e3d1?d=robohash&s=128",
          followed: "/api/users/1/followed",
          followers: "/api/users/1/followers",
          self: "/api/users/1",
        },
        about_me: "I am a Web Developer.",
        followed_count: 1,
        follower_count: 1,
        id: 1,
        isFollowing: false,
        last_seen: "2020-04-11T11:37:10Z",
        post_count: 5,
        username: "cyogian",
      },
      body: "Random post from a random user.",
      created_at: "2020-04-15T15:17:10Z",
      id: 8,
      language: "hr",
    },
    {
      _links: {
        self: "/api/posts/7",
      },
      author: {
        _links: {
          avatar:
            "https://www.gravatar.com/avatar/6a73e4d51fe958e9d4d688108560e3d1?d=robohash&s=128",
          followed: "/api/users/1/followed",
          followers: "/api/users/1/followers",
          self: "/api/users/1",
        },
        about_me: "I am a Web Developer.",
        followed_count: 1,
        follower_count: 1,
        id: 1,
        isFollowing: false,
        last_seen: "2020-04-11T11:37:10Z",
        post_count: 5,
        username: "cyogian",
      },
      body: "Full-Moon in the night is such a great sight.",
      created_at: "2020-04-15T15:16:43Z",
      id: 7,
      language: "en",
    },
    {
      _links: {
        self: "/api/posts/6",
      },
      author: {
        _links: {
          avatar:
            "https://www.gravatar.com/avatar/6a73e4d51fe958e9d4d688108560e3d1?d=robohash&s=128",
          followed: "/api/users/1/followed",
          followers: "/api/users/1/followers",
          self: "/api/users/1",
        },
        about_me: "I am a Web Developer.",
        followed_count: 1,
        follower_count: 1,
        id: 1,
        isFollowing: false,
        last_seen: "2020-04-11T11:37:10Z",
        post_count: 5,
        username: "cyogian",
      },
      body: "Let the journey begin!",
      created_at: "2020-04-15T13:01:04Z",
      id: 6,
      language: "en",
    },
    {
      _links: {
        self: "/api/posts/5",
      },
      author: {
        _links: {
          avatar:
            "https://www.gravatar.com/avatar/4d28ef25a1ad576c2f1fd93ea15526da?d=robohash&s=128",
          followed: "/api/users/2/followed",
          followers: "/api/users/2/followers",
          self: "/api/users/2",
        },
        about_me: null,
        followed_count: 1,
        follower_count: 1,
        id: 2,
        isFollowing: true,
        last_seen: "2020-04-04T17:50:26Z",
        post_count: 1,
        username: "cynix",
      },
      body: "Hello",
      created_at: "2020-04-04T17:50:22Z",
      id: 5,
      language: "",
    },
  ],
};

export default samplePosts;
