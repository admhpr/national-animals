---
sectionid: parsing-data
sectionclass: h2
parent-id: web-scrape
title: Parsing & Serving Data
number: 2200
---

We have already seen some examples of parsing data with Python earlier in this documentation and here is another, After we have the clean national animal data we are going to join it with topology JSON data to allow use to render a glode.

### TopoJSON

**TopoJSON** is an extension of GeoJSON that encodes topology. Rather than representing geometries discretely, geometries in TopoJSON files are stitched together from shared line segments called _arcs_. This technique is similar to [Matt Bloch’s MapShaper](http://www.cartogis.org/docs/proceedings/2006/bloch_harrower.pdf) and the [Arc/Info Export format, .e00](https://web.archive.org/web/20140721114041/http://indiemaps.com:80/blog/2009/02/e00parser-an-actionscript-3-parser-for-the-arcinfo-export-topological-gis-format/).

TopoJSON eliminates redundancy, allowing related geometries to be stored efficiently in the same file. For example, the shared boundary between California and Nevada is represented only once, rather than being duplicated for both states. A single TopoJSON file can contain multiple feature collections without duplication, such as states and counties. Or, a TopoJSON file can efficiently represent both polygons (for fill) and boundaries (for stroke) as two feature collections that share the same arc mesh. See [How To Infer Topology](https://bost.ocks.org/mike/topology/) for a visual explanation of how TopoJSON works. See [Command-Line Cartography](https://medium.com/@mbostock/command-line-cartography-part-1-897aa8f8ca2c) for an introduction to TopoJSON and related tools.

See [/national_animals/web_scraper/data_joiner.py](https://github.com/harps116/national-animals/blob/master/web_scraper/data_joiner.py)
