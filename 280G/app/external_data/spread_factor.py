from pdfquery import PDFQuery

def get_spread_factors():
    pdf = get_pdf()
    pdf.load(5)
    bbox_bounds = get_bbox_bounds(pdf)
    return get_factors(pdf, bbox_bounds)

def get_pdf():
    return PDFQuery("revenue_procedure_2002-13.pdf")

def get_bbox_bounds(pdf):
    lines = pdf.extract([('spread_ratio',f'LTTextLineHorizontal:contains("0%")')])
    bbox_bounds = list(set([(168, float(pdf.pq(line).attr('y0')), 466, float(pdf.pq(line).attr('y1'))) for line in lines['spread_ratio']]))
    return sorted(bbox_bounds, key=lambda x: x[1], reverse=True)

def get_factors(pdf, bbox_bounds):
    spread_factors = {'low': {}, 'medium': {}, 'high': {}}
    spread_ratios = [200, 180, 160, 140, 120, 100, 80, 60, 40, 20, 0, -20, -40, -60]
    i = 0
    for volatility in ['low', 'medium', 'high']:
        for ratio in spread_ratios:
            factors = pdf.pq(':in_bbox("%s, %s, %s, %s")' % bbox_bounds[i]).text().split('% ')
            if factors[-1] == '':
                factors.pop()
            factors = [round(float(factor[0:4])/100,3) for factor in factors]
            spread_factors[volatility][ratio] = factors
            i += 1
    return spread_factors

print(get_spread_factors())

