document.addEventListener('DOMContentLoaded', async function() {  
    const current_user = await get_current_user();
    const number_list = await get_number_list();
    if (current_user) ? logged_in_welcome() : log_in_welcome();
  });

const clear_view = () => {
    views = ['progress_bar_container','logged_in_welcome', 'log_in_welcome', 'problems'];
    views.forEach(element => document.getElementById(element).style.display = 'none');
};

const get_current_user = ()  => {
    fetch('/user')
    .then(response => response.json())
    .then(response => current_user = response.user)
};

const logged_in_welcome = async () => {
    await clear_view();
    document.getElementById('logged_in_welcome').style.display = 'block';
    document.getElementById('play_game').addEventListener('click', () => play_game());
};

const log_in_welcome = async () => {
    await clear_view();
    document.getElementById('log_in_welcome').style.display = 'block';
};

const play_game = async () => {
    
    // Set up browser window
    document.getElementById('logged_in_welcome').style.display = 'none';
    document.getElementById('problems').style.display = 'block';
    await show_progress_bar();

    // Fetch problems and scores from server
    const scores = await get_scores();

    // Play round
    const scores = await play_round(problems, scores);

    // Save Results to Server
    save_scores(scores);
    
    // Return to Welcome Screen
    logged_in_welcome()
}

const get_problems = () => {
    return fetch('/problems')
      .then(response => response.json())
};

const get_scores = () => {
    return fetch('/scores')
      .then(response = response.json());
};

const save_scores = (scores) => {
    fetch('/scores', {
        method: 'PUT',
        body: JSON.stringify(scores)
    });
};

const play_round = async (scores) => {
    
    const selected_problems = await select_problems(problems);
    let results = []
    for (const problem of selected_problems) {
        const time = await solve_problem(problem);
        results.push({'id': problem.id, 'time': time})
    }
};

const select_problems = async () => {
    
    // Load all problems
    const problems = await get_problems();
    
    // Find available problems

    
    // Pick problems

}


async function solve_problem(current_problem, number_list) {
    recognition = await get_speech_recognition(number_list)
    document.getElementById('show_problem').innerHTML = current_problem.problem
    start_time = performance.now()
    recognition.start()
    console.log('speech on')
    return new Promise((resolve) => {
        time = get_time(current_problem, start_time, recognition)
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
    document.getElementById('progress_bar_container').style.display = 'block'
    const progress = await get_progress()
    progress_bar = document.getElementById('progress_bar')
    console.log(progress)
    progress_bar.setAttribute('aria-valuenow', progress)
    progress_bar.setAttribute('style',`width: ${progress}%`)
}

