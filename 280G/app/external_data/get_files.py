import requests

def get_file(url, name):
    r = requests.get(url, allow_redirects=True)
    open(name,'wb').write(r.content)

get_file('https://www.irs.gov/pub/irs-drop/rp-02-13.pdf','revenue_procedure_2002-13.pdf')
get_file('https://www.irs.gov/pub/irs-drop/rr-20-26.pdf','revenue_ruling_2020-26.pdf')