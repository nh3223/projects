from lxml import html
import requests

def get_treasury_rate():
    page = requests.get('https://finance.yahoo.com/bonds')
    tree = html.fromstring(page.content)
    risk_free_rate = round(float(tree.xpath('//td[@class="data-col2 Ta(end) Pstart(20px)"]/text()')[0]),5)
    return risk_free_rate
