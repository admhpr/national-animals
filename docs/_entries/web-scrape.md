---
sectionid: web-scrape
sectionclass: h1
is-parent: yes
title: Web Scraping
number: 2000
---

Web scraping also known as web extraction or web crawling refers to the process of obtaining various unstructured information from any websites and turning that into structured, clean data such as JSON, CSV,you can also transfer the captured data to a database directly. Some common uses of web scraping include lead generation,data collection for academic researches, price monitoring from competitors’ websites, product catalogue scraping and much more.

In this case web scraping was used to capture data from a wikipedia page to be used in a data visualisation.

See [/national_animals/web_scraper](https://github.com/harps116/national-animals/tree/master/web_scraper)

{% highlight bash %}
cd /national_animals/web_scraper/national_animals/
{% endhighlight %}

{% highlight bash %}
scrapy crawl animals
{% endhighlight %}

See [spider file](https://github.com/harps116/national-animals/blob/master/web_scraper/national_animals/spiders/animals_spider.py)

This will send a request out to the URL and return the data, in this case it will be parsed and output into a json file

## Raw Data

![Raw Data](./img/data_set_scrapy.png)

## Parsed Data

[Parsed Data](https://github.com/harps116/national-animals/blob/master/web_scraper/national_animals.json)

## Example

![Example](./img/national_animals_scrape.gif)
