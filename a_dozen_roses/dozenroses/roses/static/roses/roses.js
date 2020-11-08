document.addEventListener('DOMContentLoaded', async function() {  
    current_user = await get_current_user()
    if (current_user) {
        logged_in_welcome()
    } else {
        log_in_welcome()
    }
  });

function clear_view() {
    views = ['progress_bar','logged_in_welcome', 'log_in_welcome', 'problems']
    views.forEach(element => {
        document.getElementById(element).style.display = 'none'
    });
}

async function get_current_user() {
    await fetch('/user')
    .then(response => response.json())
    .then(response => {
        current_user = response.user
    })
    return current_user
}

async function logged_in_welcome() {
    await clear_view()
    document.getElementById('logged_in_welcome').style.display = 'block'
    document.getElementById('log_in_welcome').style.display = 'none'
    document.getElementById('play_game').addEventListener('click', () => play_game())
}

async function log_in_welcome() {
    await clear_view()
    document.getElementById('logged_in_welcome').style.display = 'none'
    document.getElementById('log_in_welcome').style.display = 'block'
}

async function play_game() {
    document.getElementById('logged_in_welcome').style.display = 'none'
    document.getElementById('problems').style.display = 'block'
    const problems = await get_problems()
    results = []
    for (const problem of problems) {
        console.log('in main function', problem)
        const time = await solve_problem(problem);
        console.log('time', time)
        results.push({'id': problem.id, 'time': time})
    }
}

function get_problems() {
    return fetch('/problems')
    .then(response => response.json())
}

async function solve_problem(current_problem) {
    await show_problem(current_problem)
    start_time = performance.now() / 1000
    end_time = await get_end_time(current_problem)
    return new Promise((resolve) => {
        time = end_time - start_time
        resolve(time)
    });
}

async function show_problem(current_problem) {
    document.getElementById('show_problem').innerHTML = current_problem.problem
    await remove_form_elements()
    await add_input_box()
    add_submit_button()
}

function remove_form_elements() {
    old_input_box = document.getElementById('answer_value')
    old_input_box.parentNode.removeChild(old_input_box)
    old_button = document.getElementById('answer_button')
    old_button.parentNode.removeChild(old_button)
}

function add_input_box() {
    entry_form_input_box = document.createElement('input')
    entry_form_input_box.classList.add("form-control")
    entry_form_input_box.id = "answer_value"
    entry_form_input_box.placeholder = "Answer"
    document.getElementById('answer_value_div').appendChild(entry_form_input_box)
}

function add_submit_button() {
    entry_form_submit_button = document.createElement('input')
    entry_form_submit_button.type = "button"
    entry_form_submit_button.classList.add("form-control")
    entry_form_submit_button.id = "answer_button"
    entry_form_submit_button.value = "Submit Answer"
    document.getElementById('answer_button_div').appendChild(entry_form_submit_button)
}


function get_end_time(current_problem) {
    let time = 0
    end_time = new Promise((resolve) => {
        document.getElementById('answer_button').addEventListener('click', () => {
            time = performance.now() / 1000;
        resolve(time)
        });
    });
    
    end_time.then(end_time => {
        if (document.getElementById('answer_value').value != current_problem.answer) {
            end_time = end_time + 5;
        }
    });

    return end_time
}