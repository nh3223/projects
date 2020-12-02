from .external_data import Get_External_Data_Files, Treasury_Rate, Applicable_Federal_Rates, Spread_Factor


def update_external_data():       
    Get_External_Data_Files.get_external_files()
    spread_factors = Spread_Factor.get_spread_factors()
    afrs = Applicable_Federal_Rates.get_applicable_federal_rates()
    treasury_rate = Treasury_Rate.get_treasury_rate()
    return spread_factors, afrs, treasury_rate

def get_spread_factors():
    return Spread_Factor.get_spread_factors()




def update_treasury_rate():
    return Treasury_Rate.get_treasury_rate()

def update_afrs():
    return Applicable_Federal_Rates.get_applicable_federal_rates()

def get_applicable_federal_rate(term):
    rates = update_afrs()
    if term <= 36:
        return rates['short-term']
    elif term <= 108:
        return rates['mid-term']
    else:
        return rates['long-term']

     