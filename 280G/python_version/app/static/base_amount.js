const base_amount = (start_date, transaction_date, executive_compensation, first_year_non_recurring_compensation) => {
    const start_year = start_date.getFullYear();
    const transaction_year = transaction_date.getFullYear();
    if (start_year == transaction_year) {
        return current_year_base_amount()
    } else {
        return standard_base_amount()
    }
};

const current_year_base_amount = (start_date, transaction_date, executive_compensation, first_year_non_recurring_compensation) => {
    const worked_days = transaction_date - start_date + 1;
    const current_year_compensation = executive_compensation.start_year;
    return annualized_compensation(start_year, worked_days, current_year_compensation, first_year_non_recurring_compensation);
};

const standard_base_amount = (start_date, transaction_date, executive_compensation, first_year_non_recurring_compensation) => {
    let yearly_compensation = [];
    for (let [year, compensation] of Object.entries(executive_compensation)) {
        if (year !== start_year) {
            yearly_compensation.push(compensation)
        } else {
            const worked_days = new Date(start_year, 12, 31) - start_date + 1
            yearly_compensation.push(annualized_compensation(start_year, worked_days, compensation, first_year_non_recurring_compensation));    
        }
    }
    return yearly_compensation.reduce((a, b) => a + b) / yearly_compensation.length;
};

const annualized_compensation = (start_year, worked_days, compensation, non_recurring_compensation) => {
    const percentage_of_days_worked = worked_days / days_in_year(start_date);
    return (compensation - non_recurring_compensation) / percentage_of_days_worked + non_recurring_compensation;
};

const days_in_year = (start_year) => {
    return new Date(start_year, 11, 31) - new Date(start_year, 1, 1);
};