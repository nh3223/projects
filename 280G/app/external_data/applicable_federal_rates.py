import os, pathlib
from pdfquery import PDFQuery

class Applicable_Federal_Rates:

    @staticmethod
    def get_pdf():
        return PDFQuery(os.path.join(pathlib.Path(__file__).parent.absolute(), 'current_afr_revenue_ruling.pdf'))

    @staticmethod
    def get_bbox_bounds(pdf):
        lines = pdf.extract([('afr',f'LTTextLineHorizontal:contains("120% AFR")')])
        bbox_bounds = list(set([(160, float(pdf.pq(line).attr('y0')), 310, float(pdf.pq(line).attr('y1'))) for line in lines['afr']]))
        return sorted(bbox_bounds, key=lambda x: x[1], reverse=True)

    @staticmethod
    def get_rates(pdf, bbox_bounds):
        afrs = {}
        for i, term in enumerate(['short-term', 'mid-term', 'long-term']):
            rates = pdf.pq(':in_bbox("%s, %s, %s, %s")' % bbox_bounds[i]).text().split('%')
            rate = round(float(rates[1]),3)
            afrs[term] = rate
        return afrs
    
    @staticmethod
    def get_applicable_federal_rates():
        pdf = Applicable_Federal_Rates.get_pdf()
        pdf.load(1)
        bbox_bounds = Applicable_Federal_Rates.get_bbox_bounds(pdf)
        return Applicable_Federal_Rates.get_rates(pdf, bbox_bounds)




