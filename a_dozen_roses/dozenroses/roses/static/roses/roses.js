document.addEventListener('DOMContentLoaded', async function() {  
    const current_user = await get_current_user();
    if (current_user) {
        logged_in_welcome()
    } else {
        log_in_welcome()
    }
  });

function clear_view() {
    views = ['progress_bar_container','logged_in_welcome', 'log_in_welcome', 'problems']
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
    document.getElementById('progress_bar_container').style.display = 'block'
    const progress = await get_progress()
    await show_progress_bar(progress.progress)
    const number_text = await get_number_text()
    const number_list = await get_number_list(number_text)
    const problems = await get_problems()
    let results = []
    for (const problem of problems) {
        const time = await solve_problem(problem, number_list, number_text);
        results.push({'id': problem.id, 'time': time})
    }
    fetch('/results', {
        method: 'PUT',
        body: JSON.stringify(results)
    })
    .then(logged_in_welcome())
}

function get_problems() {
    return fetch('/problems')
    .then(response => response.json())
}

async function solve_problem(current_problem, number_list, number_text) {
    recognition = await get_speech_recognition(number_list)
    document.getElementById('show_problem').innerHTML = current_problem.problem
    start_time = performance.now()
    recognition.start()
    console.log('speech on')
    return new Promise((resolve) => {
        time = get_time(current_problem, start_time, recognition, number_text)
        resolve(time)
    });
}

function get_time(current_problem, start_time, recognition, number_text) {
    return new Promise((resolve) => {
        recognition.onresult = function(event) {
            console.log(event)
            end_time = performance.now()
            const number = event.results[0][0].transcript;
            console.log(number);
            time = (end_time - start_time) / 1000;
            if (number != current_problem.answer) {
                time = time + 5
            }
            recognition.stop()
            console.log(time)
            resolve(time)
        }
        recognition.onerror = function(event) {
            console.log(event)
        }

        recognition.onnomatch = function(event) {
            console.log(event)
        }
    });
}

function get_progress() {
    return fetch('/progress')
    .then(response => response.json())
}

function show_progress_bar(progress) {
    progress_bar = document.getElementById('progress_bar')
    console.log(progress)
    progress_bar.setAttribute('aria-valuenow', progress)
    progress_bar.setAttribute('style',`width: ${progress}%`)
}

