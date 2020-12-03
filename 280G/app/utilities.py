from math import log, exp, sqrt
from scipy.stats import norm

from .external_data import Get_External_Data_Files, Treasury_Rate, Applicable_Federal_Rates, Spread_Factor

def update_spread_factors():
    return Spread_Factor.get_spread_factors()

def get_spread_factor(spread_factors, volatility, term, spread_factor):
    if term > 120 or spread_factor > 200 or spread_factor < -60:
        return 'N/A'
    volatility = get_table_volatility(volatility)
    spread_factor = get_table_spread_factor(spread_factor)    
    term_column = get_term_column(term)
    return spread_factors[volatility][spread_factor][term_column]        

def get_table_volatility(volatility):
    if volatility <= 30:
        return 'low'
    if volatility <= 70:
        return 'medium'
    return 'high'

def get_term_column(term):
    available_terms = [120, 108, 96, 84, 72, 60, 48, 36, 24, 12, 3]
    for table_term in available_terms:
        if term >= table_term:
            return 10 - available_terms.index(table_term)

def get_table_spread_factor(spread_factor):
    spread_factors = [200, 180, 160, 140, 120, 100, 80, 60, 40, 20, 0, -20, -40, -60]
    for factor in spread_factors:
        if spread_factor >= factor:
            return factor

def update_treasury_rate():
    return Treasury_Rate.get_treasury_rate()

def update_afrs():
    Get_External_Data_Files.get_afr_revenue_ruling()
    return Applicable_Federal_Rates.get_applicable_federal_rates()

def get_applicable_federal_rate(term):
    rates = update_afrs()
    if term <= 36:
        return rates['short-term']
    elif term <= 108:
        return rates['mid-term']
    else:
        return rates['long-term']

def black_scholes(spot_price, exercise_price, volatility, remaining_term):
    volatility /= 100
    risk_free_rate = update_treasury_rate() / 100
    remaining_term /= 12
    d_1 = (log(spot_price / exercise_price) + (risk_free_rate + volatility**2 / 2)*remaining_term) / (volatility * sqrt(remaining_term))
    d_2 = d_1 - volatility * sqrt(remaining_term)
    return spot_price * norm.cdf(d_1) - exercise_price * exp(-risk_free_rate * remaining_term) * norm.cdf(d_2)

def option_valuation(spread_factors, spot_price, exercise_price, volatility, remaining_term):
    spread_factor = 100 * (spot_price / exercise_price - 1)
    valuation_rev_proc = get_spread_factor(spread_factors, volatility, remaining_term, spread_factor)
    if valuation_rev_proc == 'N/A':
        return black_scholes(spot_price, exercise_price, volatility, remaining_term)
    else:
        return spot_price * valuation_rev_proc