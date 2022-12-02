import { Scraper, Root, DownloadContent, CollectContent } from "nodejs-web-scraper";
import fs from "fs";

function getBaseURL(url) {
  return url;
}

async function scrape(url) {
  let articleHTML;
  const getRawHTML = (payload) => {
    let html = payload.html();
    articleHTML = html;
    fs.writeFileSync("./example/index.html", html);
    return true;
  }

  const scraper = new Scraper({
    baseSiteUrl: getBaseURL(url),
    startUrl: url,
    filePath: "./example/",
  });

  const root = new Root();
  const title = new CollectContent("article header h2", { name: "title" });
  const authors = new CollectContent("article header p:nth-of-type(1)", { name: "authors" });
  const date = new CollectContent("article header p:nth-of-type(2)", { name: "date" });
  const article = new CollectContent("article article div[class*=blog-post]", { condition: getRawHTML });

  [ title, authors, date, article ].forEach(operation => root.addOperation(operation));
  await scraper.scrape(root);

  return {
    title: title.getData(),
    authors: authors.getData(),
    date: date.getData(),
    article: articleHTML,
    url,
  }
}

async function main() {
  let results = await scrape("https://about.sourcegraph.com/blog/sourcegraph-backstage-bootstrapping-catalog-adoption-batch-changes");
  console.log(results)
}

main();

/*
- [ ] medium: https://john-tucker.medium.com/backstage-plugins-by-example-part-3-fd8b7d302b5b (image code github)
- [ ] frontside: https://frontside.com/blog/2022-05-03-backstage-entity-provider/ (image code)
- [ ] backstage: https://backstage.io/blog/2022/07/19/releasing-backstage-search-1.0 (image)
- [ ] humanitec: https://humanitec.com/blog/what-is-dynamic-configuration-management (table image github)
- [ ] sourcegraph: https://about.sourcegraph.com/blog/sourcegraph-backstage-bootstrapping-catalog-adoption-batch-changes (image code)
- [ ] platform-engineering: https://platformengineering.org/blog/shifting-kubernetes-policies-and-resources (image)
*/
