from .external_data import Get_External_Data_Files, Treasury_Rate, Applicable_Federal_Rates, Spread_Factor

def update_spread_factors():
    return Spread_Factor.get_spread_factors()

def update_treasury_rate():
    return Treasury_Rate.get_treasury_rate() / 100

def update_afrs():
    Get_External_Data_Files.get_afr_revenue_ruling()
    return Applicable_Federal_Rates.get_applicable_federal_rates()
