const parachute_threshold = (base_amount) => {
    return 3 * base_amount;
};

const total_non_equity_payments = (non_equity_payments) => {
    const payment_values = non_equity_payments.map(payment => payment.value);
    return payment_values.reduce((a, b) => a + b);
};

const total_reasonable_compensation_after_change = (non_equity_payments) => {
    const reasonable_compensation_payments = non_equity_payments.filter(payment => payment.reasonable_compensation_after_change > 0);
    const reasonable_compensation = reasonable_compensation_payments.map(payment => payment.value);
    return reasonable_compensation.reduce((a, b) => a + b);
};

const black_scholes = (spot_price, exercise_price, volatility, remaining_term) => {
    volatility /= 100
    remaining_term /= 12
    risk_free_rate = update_treasury_rate()
    d_1 = (Math.log(spot_price / exercise_price) + (risk_free_rate + volatility**2 / 2)*remaining_term) / (volatility * Math.sqrt(remaining_term))
    d_2 = d_1 - volatility * Math.sqrt(remaining_term)
    return spot_price * cdf(d_1) - exercise_price * Math.exp(-risk_free_rate * remaining_term) * cdf(d_2)
};

const cdf = (x, mean, standardDeviation) => {
    const mathjs = require('mathjs')
    return (1 - mathjs.erf( -x / Math.sqrt(2) )) / 2;
};
    

const option_valuation = (spread_factors, spot_price, exercise_price, volatility, remaining_term) => {
    spread_factor = 100 * (spot_price / exercise_price - 1);
    valuation_rev_proc_value = get_spread_factor(spread_factors, volatility, remaining_term, spread_factor);
    if (valuation_rev_proc_value === 'N/A') {
        return black_scholes(spot_price, exercise_price, volatility, remaining_term)
    } else {
        return spot_price * valuation_rev_proc_value;
    }
};

const get_spread_factor = (spread_factors, volatility, term, spread_factor) => {
    if (term > 120 || spread_factor > 200 || spread_factor < -60) { 
        return 'N/A'; 
    }
    volatility = get_table_volatility(volatility);
    spread_factor = get_table_spread_factor(spread_factor);    
    term_column = get_term_column(term);
    return spread_factors.volatility.spread_factor.term_column;
};        

const get_table_volatility = (volatility) => {
    if (volatility <= 30) { 
        return 'low'; 
    } else if (volatility <= 70) { 
        return 'medium';
    } else { 
        return 'high'; 
    }
};

const get_term_column = (term) => {
    const available_terms = [120, 108, 96, 84, 72, 60, 48, 36, 24, 12, 3]
    for (let table_term in available_terms) {
        if (term >= table_term) { 
            return 10 - available_terms.indexOf(table_term); 
        }
    }
};

const get_table_spread_factor = (spread_factor) => {
    const spread_factors = [200, 180, 160, 140, 120, 100, 80, 60, 40, 20, 0, -20, -40, -60];
    for (let factor in spread_factors) {
        if (spread_factor >= factor) { 
            return factor; 
        }
    }
};

const get_applicable_federal_rate = (term, rates) => {
    if (term <= 36) { 
        return rates.short_term;
    } else if (term <= 108) {
        return rates.mid_term;
    } else {
        return rates.long_term;
    }
};       