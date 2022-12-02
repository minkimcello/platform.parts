jq -c '.objects[].package.links.repository' backstage_plugins_v2.json

# URLs from this list gives us the root; many of them backstage/backstage.
# Need to use sourcegraph to take the name of the package listed in json and the URL to search the right path
#   From the correct package.json, take the name, description, and path of the package.json for components.yaml
