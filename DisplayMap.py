from arcgis.gis import *

dev_gis = GIS("https://www.arcgis.com")

webscene_search = dev_gis.content.search(query = "LA Trails *", item_type = "Web Scene")
webscene_search

webscene_item = webscene_search[0]
webscene_item

from arcgis.mapping import WebScene
la_trails = WebScene(webscene_item)
la_trails