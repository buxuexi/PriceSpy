from lxml import html
import requests
import time
import threading
from traceback import format_exc

def run(product_name, source, extracted_data):
	while True:
		try:
			if source == 'Amazon':
				print (product_name)
				url = 'https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords={0}'.format(product_name)
				XPATH_LIST = '//li[contains(@id,"result_")]'
				XPATH_URL = './/a[contains(@class,"s-access-detail-page")]/@href'
				XPATH_TITLE = './/a[contains(@class,"s-access-detail-page")]/h2/text()'
				XPATH_PRICE = './/span[contains(@class,"a-offscreen")]/text()'
				# XPATH_IMAGE = './/div[contains(@class,"s-card")]/img/@src'
				XPATH_IMAGE = './/div[contains(@class,"s-item-container")]//img/@src'
			else:
				url = 'https://www.ebay.com/sch/i.html?_nkw={0}&_sacat=0'.format(product_name)
				XPATH_LIST = '//li[contains(@class,"s-item")]'
				XPATH_URL = './/a[@class="s-item__link"]/@href'
				XPATH_TITLE = './/h3[contains(@class,"s-item__title")]/text()'
				XPATH_PRICE = './/span[@class="s-item__price"]/text()'
				XPATH_IMAGE = './/img[@class="s-item__image-img"]/@data-src'

			headers = {'User-Agent': 'Mozilla/63.0.1 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/12.0.1'}
			response = requests.get(url, headers=headers)
			doc = html.fromstring(response.text)
			product_list = doc.xpath(XPATH_LIST)
			if source == 'Amazon':
				print (response.text)
				print ("source is %s and product length is %d" %(source, len(product_list)))

			for product in product_list:
				RAW_URL = product.xpath(XPATH_URL)
				RAW_TITLE = product.xpath(XPATH_TITLE)
				RAW_PRICE = product.xpath(XPATH_PRICE)
				RAW_IMAGE = product.xpath(XPATH_IMAGE)

				if len(RAW_URL) == 0 or len(RAW_TITLE) == 0 or len(RAW_IMAGE) == 0 or len(RAW_PRICE) == 0:
					continue
				URL = ' '.join(' '.join(RAW_URL).split())
				#may exist duplicate price in eBay
				PRICE  = ' '.join(' '.join(RAW_PRICE[0:1]).split())
				#may include sponsored tag in Amazon
				if source == 'Amazon' and len(RAW_PRICE) >= 2:
					PRICE  = ' '.join(' '.join(RAW_PRICE[1:2]).split())
				TITLE = ' '.join(' '.join(RAW_TITLE).split())
				IMAGE = ' '.join(' '.join(RAW_IMAGE[0:1]).split())
				data = {
						'URL':URL,
						'TITLE':TITLE,
						'PRICE':PRICE,
						'IMAGE':IMAGE,
						'SOURCE': source,
				}
				extracted_data.append(data)
			return
		except Exception as e:
			print (format_exc(e))

def crawl(product_name):
	extracted_data = []
	Amazon_Crawler = threading.Thread(target = run, args = (product_name, 'Amazon', extracted_data,))
	eBay_Crawler = threading.Thread(target = run, args = (product_name, 'eBay', extracted_data,))
	Amazon_Crawler.start()
	eBay_Crawler.start()
	Amazon_Crawler.join()
	eBay_Crawler.join()
	return extracted_data
