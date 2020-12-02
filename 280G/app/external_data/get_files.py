import requests
from lxml import html

class Get_External_Data_Files:

    def get_external_files(self):
        self.get_file('https://www.irs.gov/pub/irs-drop/rp-02-13.pdf','revenue_procedure_2002-13.pdf')
        self.get_file(self.get_pdf_path(),'current_afr_revenue_ruling.pdf')

    def get_file(self, url, name):
        r = requests.get(url, allow_redirects=True)
        open(name,'wb').write(r.content)

    def get_pdf_path(self):
        page = requests.get('https://apps.irs.gov/app/picklist/list/federalRates.html')
        tree = html.fromstring(page.content)
        path = tree.xpath('//td[@class="LeftCellSpacer"]/a/@href')[0]
        return path

