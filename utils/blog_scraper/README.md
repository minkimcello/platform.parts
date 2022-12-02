## usage (WIP)

```yaml
blogposts:
  - type: "url"
    source: "https://website.com/blog/a-blog-post"
  - type: "file"
    source: "./blog/original-platform-parts-blog-post.md"
```
> YAML file for Backstage to ingest - to add to its catalog and search index
>   - url sources are processed by the blog_scraper and then passed to the entity provider
>   - file sources are fed directly into the entity provider

```js
// backstage/plugins/blogpost_scraper
import { scraper } from "@minkimcello/blog_scraper";

const URLposts = backstage_app_config_blogpost_urls.forEach(url => scraper(url));
const filePosts = backstage_app_config_blogpost_files.forEach(() => {});
const allPosts = [...urlPosts, filePosts];

// add to search
// add to catalog
// const newPost = () => delta();
// const refreshOnSchedule = () => full();
```

## notes

- compared [`website-scraper`](https://www.npmjs.com/package/website-scraper) and [`nodejs-web-scraper`](https://www.npmjs.com/package/nodejs-web-scraper)
  - `website-scraper` is useful for downloading _all_ files (js, css, html)
    - they have a plugin interface where it might be possible to filter out only the relevant information and turn that into a markdown but that requires quite a bit of work
  - `nodejs-web-scraper` can be more explicit in what we need
    - this would allow us to create profiles of different hosts:
      ```json
      {
        "website-a": {
          title: "body article h1",
          authors: "body article div[class=authors]"
        },
        "website-b": {
          title: "div h2",
          authors: "div[class=blog_author]"
        }
      }
      ```

## TODOs

- [ ] convert html to markdown format with code snippet and images in correct order (for now use external URLs for image srcs)
- [ ] create configs to auto detect profile based on URL
- [ ] export example YAML files for blog entities
- [ ] ingest example YAML files into backstage through a custom blog entity provider
- [ ] backstage frontend to display blog posts
- [ ] process and ingest blogpost URLs without creating individual YAML files
- [ ] add blogposts to search index
- [ ] add tags for blogposts (take it as an argument when adding individual URLs to central YAML file)
- [ ] configure delta for adding new posts
- [ ] configure full mutation for refreshing and syncing previous blog posts (in case of edits from source)
