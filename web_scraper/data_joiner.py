# the idea here is to take the scraped national data and add it as 
# props of the world geo data set.
# source of world data set: https://github.com/johan/world.geo.json

import json
import pprint


with open('world.geo.json', encoding='utf-8') as data_file:
    world_data = json.loads(data_file.read())

with open('national_animals.json', encoding='utf-8') as data_file:
    national_animals_data = json.loads(data_file.read())

# world data = 180
# national animals data = 80 
pprint.pprint(len(world_data['features']))
pprint.pprint(len(national_animals_data))

# for d in world_data['features']:
#     pprint.pprint(d['id'])