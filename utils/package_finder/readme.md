# payload
_npm search CLI_ (max 230) 👎
  package name, version
  description
  last updated
  links.repository

_npm search API_ (20 by default, max 250) 👍
  same payload as CLI
  search score details
  if first search gives 250, following search should be from=250

# ref
- [npm search CLI](https://docs.npmjs.com/cli/v7/commands/npm-search)
  - [--long](https://docs.npmjs.com/cli/v8/commands/npm-search#long) makes no difference (--json or not)
  - does not have offset or count options
  - does not include npm registry score
- [npm search API](https://github.com/npm/registry/blob/master/docs/REGISTRY-API.md#get-v1search)
  - includes score
  - includes flags for offset and size
  - includes total
  - indexing is different from cli so you can offset from cli's default 230 size
- [ember observer](https://emberobserver.com/)
- [plugins listed in backstage microsite](https://github.com/backstage/backstage/tree/master/microsite/data/plugins)
- [plugins in backstage repo](https://github.com/backstage/backstage/tree/master/plugins)
- [npm follower for listening to new packages](https://github.com/npm/registry/blob/master/docs/follower.md)
- [github next](https://githubnext.com/projects/flat-data)
  - takes a source URL of a massive data file and writes it to a file
    - [GET request doesn't give us all the data we need](https://blog.npmjs.org/post/157615772423/deprecating-the-all-registry-endpoint.html)
