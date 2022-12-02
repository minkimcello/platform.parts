import json

TEMPLATE ="""kind: Component
  metadata:
    name: {}
    description |
      {}
    

"""

f = open("./backstage_plugins_v2.json")
data = json.load(f)
print(data["total"])
f.close()