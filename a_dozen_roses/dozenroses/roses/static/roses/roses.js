document.addEventListener('DOMContentLoaded', async function() {  
    current_user = await get_current_user()
    console.log('after_return', current_user)
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
        console.log('in fetch', current_user)
    })
    console.log('in function', current_user)
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




