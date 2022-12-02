searchText="backstage plugin"

if [ -z $output ]; then
  echo You must provide an output path
  exit 1
fi

npmSearchCount=$(curl -s https://registry.npmjs.org/-/v1/search\?text\=$(echo $searchText\&size\=1 | sed -e 's/\ /%20/g') | jq -r ".total")
npmMaxSearchSize=250
loopCount=$((($npmSearchCount / $npmMaxSearchSize) + ($npmSearchCount % $npmMaxSearchSize ? 1 : 0)))

echo $(curl -s https://registry.npmjs.org/-/v1/search\?text\=$(echo $searchText | sed -e 's/\ /%20/g')\&size\=$npmMaxSearchSize) | jq '.' > $output
for (( i=1; i < $loopCount; i++ )); do
  from=$(($i * $npmMaxSearchSize))
  packages=$(curl -s https://registry.npmjs.org/-/v1/search\?text\=$(echo $searchText | sed -e 's/\ /%20/g')\&size\=$npmMaxSearchSize\&from\=$from | jq '.objects')
  echo $(jq --argjson pkgs "$packages" '.objects += $pkgs' $output) > $output
done

echo "npm reported total: $npmSearchCount"
echo "packages retrieved: $(jq '.objects | length' $output)"

echo $(jq '.objects |= map(select(.package.links.repository != null) | select(.package.links.repository | test("(.*)github.com\/(.+)\/(.+)")))' $output) > $output
echo $(jq --argjson count $(jq '.objects | length' $output) '.total = $count' $output) > $output

echo "packages with github URL: $(jq '.objects | length' $output)"
