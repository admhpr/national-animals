import scrapy
import pprint
import numpy as np
from national_animals.items import Item

class AnimalsSpider(scrapy.Spider):
    name = "animals"
    
    def start_requests(self):
        urls = ["https://en.wikipedia.org/wiki/List_of_national_animals"]

        for url in urls:
            yield scrapy.Request(url=url,callback=self.parse)

    def chunks(context,l, n):
        """Yield successive n-sized chunks from l."""
        for i in range(0, len(l), n):
            yield l[i:i + n]

    # def parse(self, response):
    #     page = response.url.split("/")[-1]
    #     filename = 'test-%s.html' % page 
    #     with open(filename, 'wb') as f:
    #         f.write(response.body)
    #     self.log('saved file %s' % filename)

    def parse(self, response):
        rows = response.xpath('//tr')
        # print(rows)
        titles = response.xpath('//tr//td/a/@title').extract()
        data_list = []
        country_list = []
        animal_list = []
        print("OUR DATA")
        # arr = []
        # print(titles)
        # print("-------------------->>>>>")
        title_map = []
        for data in rows:
        
             # extract country 
             country = data.css('td>span.flagicon~a::attr(title)').extract_first()
             if(country):
                 country_list.append(country)

             #extract animal and attach animal to list 
             animal = data.css('td>a:first-child::attr(title)').extract_first()
             if(animal):
                    animal_list.append(animal)
             # check for rowspans
             n_row = data.css('td::attr(rowspan)').extract_first()
             if n_row:
                    title_map.extend(n_row)
             else:
                    title_map.extend('0')
        # pprint.pprint(title_map)
        # chunked = list(self.chunks(title_map,4))
        # pprint.pprint(chunked)

        print(country_list)
        print(animal_list)
        for i in range(len(country_list)):
            item = Item()
            rowspan = title_map[i + 2]
            item['animal'] = []
            item['country'] = country_list[i]
            if int(rowspan) > 0:
                count = 0
                while count < int(rowspan):
                    print(count)
                    item['animal'].append(animal_list[i + count])
                    count = count + 1
            else:
                item['animal'].append(animal_list[i])
            
            data_list.append(item)
        
        pprint.pprint(data_list)


        ## NOT IN USE CURRENTLY
        # for i in range(len(title_map) + 1):
        #     offset = 2
        #     item = Item()
        #     item['animal'] = []
        
        #     if int(title_map[i + offset]) > 0:
        #         print(title_map[i + offset])
        #         offset += 2
        #         # counter = int(title_map[i + offset])
        #         # while counter:
        #         #     print(counter)
        #         #     item['animal'].append(titles[i + int(counter + 1)])
        #         #     count + int(rowspan)er -= 1
        #     else:
        #         print('0')
            # print(item)
            # else:
            # print(titles[i])
            # print("--------------")
            # item['country'] = titles[i]
            # item['animal'] = titles[i + 1]
            
            # print(item)
            # print(title_map[i])
            # print(titles[i])
            # if title_map[i]:
                
        # print(titles)
        # print("------")
        
        # print(title_map)
        # print(title_list)
        
            
        #     n_row = data.css('td::attr(rowspan)').extract_first()
            
        #     # item = Item()
        #     # item['country'] = data.css('span[class=flagicon] + a::attr(title)').extract_first()
        #     print(n_row)

        #     if n_row:
        #         n_row = int(n_row)
        #         while n_row > 0:
        #             arr.extend(data.xpath('/td//following-sibling::td[1]').extract()) 
        #             n_row -= 1 
        #     # else: 
        #         # arr.append(data.css('a::attr(title)').extract()) 
           
        # print(arr)
            
            # item['animal'] = arr[len(arr) - 1]
           
            # print(item)
            
