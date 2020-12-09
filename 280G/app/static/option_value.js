const option_value_280G = () => {
    payment_date_difference = new_vesting_date - transaction_date
    daily_rate = get_daily_rate()
    present_value_adjustment = (1 + daily_rate)**payment_date_difference
    if (change_of_control) {
        return option_value() * present_value_adjustmnet;
    } else {
        return acceleration_value() * present_value_adjustment;
    }
};

const get_daily_rate = (days, afrs) => {
    if (days < 3 * 365) {
        applicable_federal_rate = afrs['short_term'];
    } else if (days < 7 * 365 + 1) {
        applicable_federal_rate = afrs['mid_term'];
    } else {
        applicable_federal_rate = afrs['long_term'];
    }
    daily_rate = (1 + applicable_federal_rate)**(1/183) - 1;
}

const option_value = () => {
    if (roll_over) {
        return utilities.option_valuation()
    } else {
        return spread_value()
    }
};

const spread_value = () => {
    return shares * (deal_price - strike_price);
}

const acceleration_value = () => {
    if (original_vesting_date === new_vesting_date) {
        return 0.0;
    } else {
        return present_value_component() + foregone_services_component();
    }
};

const present_value_component = (option_value, old_vesting_date, new_vesting_date, afrs) => {
    days_accelerated = new_vesting_date - old_vesting_date
    daily_rate = get_daily_rate(days_acclerated, afrs);
    return option_value * (1 - 1/(( 1 + daily_rate )**days_accelerated));
};

const foregone_services_component = (option_value, old_vesting_date, new_vesting_date) => {
    const full_months = () => {
        const years = old_vesting_date.getFullYear() - new_vesting_date.getFullYear();
        const months = old_vesting_date.getMonth() - new_vesting_date.getMonth();
        const day_adjustment = (old_vesting_date.getDate() < new_vesting_date.getDate()) ? -1 : 0;
        return years * 12 + months + day_adjustment;
    };
    return 0.01 * option_value * full_months;
};
