import { getCurrentUser } from './fetch.js';
import { playGame } from './playGame.js';

document.addEventListener('DOMContentLoaded', async function() {  
    const currentUser = await getCurrentUser();
    (currentUser) ? play() : login();
});

const play = async () => {
    await clear();
    document.getElementById('play').style.display = 'block';
    document.getElementById('play_game_button').addEventListener('click', () => playGame());
};

const login = async () => {
    await clear();
    document.getElementById('login').style.display = 'block';
};

const clear = () => {
    const views = ['progress_bar_container','play', 'login', 'problems'];
    views.forEach(element => document.getElementById(element).style.display = 'none');
};












