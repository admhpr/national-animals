import scrapy
import pprint
import json


from national_animals.items import Item


class AnimalsSpider(scrapy.Spider):
    name = "animals"
    
    def start_requests(self):
        urls = ["https://en.wikipedia.org/wiki/List_of_national_animals"]

        for url in urls:
            yield scrapy.Request(url=url,callback=self.parse)

    # Testing connection leaving for future reference
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
        sci_name_list = []
        pic_list = []

        # arr = []
        # print(titles)
        # print("-------------------->>>>>")
        title_map = []
        for data in rows:
        
             # extract country 
             country = data.css('td>span.flagicon~a::attr(title)').extract_first()
             if(country):
                 country_list.append(country)

             # extract animal and attach animal to list 
             animal = data.css('td>a:first-child::attr(title)').extract_first()
             if(animal):
                    animal_list.append(animal)

             # scientific name 
             sci_name = data.css('td>i:only-child::text').extract_first()

             if(sci_name):
                 sci_name_list.append(sci_name)
             else:
                 sci_name_list.append("mythical")
             
             # picture
             pic = data.css('td>a>img::attr(src)').extract_first()
             
             if(pic):
                 pic_list.append(pic)
             else:
                 pic_list.append("none")
        
            # checking rowspan values
             n_row = data.css('td::attr(rowspan)').extract_first()
             if n_row:
                    title_map.extend(n_row)
             else:
                    title_map.extend('0')
        
        # imperatively looping through the data
        i = 0
        counter = 0
        del sci_name_list[0]
        del sci_name_list[0]
        del pic_list[0]
        del pic_list[0]
        # manually remove Kurdistan :( as it is a pesky edge case
        del country_list[41]

        # using the animals list length as is the larger of the list lengths
        while counter < len(animal_list):
            
            # create a new Item on each iteration
            item = Item()
            if(i < len(title_map) - 2):
                rowspan = title_map[i + 2]
            item['animal'] = []
            item['sci_name'] = []
            item['pic'] = []
            if counter < len(country_list):
                item['country'] = country_list[counter]

            if int(rowspan) > 0:
                count = 0
                if i < len(animal_list):
                    while count < int(rowspan):
                        item['animal'].append(animal_list[i + count])
                        item['sci_name'].append(sci_name_list[i + count])
                        item['pic'].append(pic_list[i + count])
                        count += 1
                    i = i + count - 1
            else:
                if i < len(animal_list):
                    item['animal'].append(animal_list[i])
                    item['sci_name'].append(sci_name_list[i])
                    item['pic'].append(pic_list[i])
            data_list.append(item.__dict__)
            i += 1
            counter += 1 
        
        pprint.pprint(data_list)
        
        clean_data = []
        counter = 0
        while counter < len(country_list):
            clean_data.append(data_list[counter])
            counter += 1

        with open('national_animals.json', 'w') as outfile:
            json.dump(clean_data, outfile, indent = 2)

  
            
