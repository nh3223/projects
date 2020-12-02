import requests
from lxml import html

class Get_External_Data_Files:

    @staticmethod
    def get_afr_revenue_ruling():
        Get_External_Data_Files.get_file(Get_External_Data_Files.get_pdf_path(),'current_afr_revenue_ruling.pdf')

    @staticmethod
    def get_option_valuation_rev_proc():
        Get_External_Data_Files.get_file('https://www.irs.gov/pub/irs-drop/rp-03-68.pdf','revenue_procedure_2003-68.pdf')

    @staticmethod
    def get_file(url, name):
        r = requests.get(url, allow_redirects=True)
        open(name,'wb').write(r.content)

    @staticmethod
    def get_pdf_path():
        page = requests.get('https://apps.irs.gov/app/picklist/list/federalRates.html')
        tree = html.fromstring(page.content)
        path = tree.xpath('//td[@class="LeftCellSpacer"]/a/@href')[0]
        return path

