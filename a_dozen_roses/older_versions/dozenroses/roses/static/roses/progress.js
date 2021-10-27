const TARGET = 100;

const showProgressBar = async (progress, numberOfProblems) => {
    progressBarValue = Math.floor(100 * totalProgress / problems.length);
    document.getElementById('progress_bar_container').style.display = 'block';
    progress_bar = document.getElementById('progress_bar');
    console.log(progressBarValule);
    progress_bar.setAttribute('aria-valuenow', progressBarValue);
    progress_bar.setAttribute('style', `width: ${progressBarValue}%`);
};

const getProgress = (problems) => {
    return problems.reduce((cumulativeProgress, problem) => Math.max(1, TARGET / problem.score), 0);
};

const updateProgress = (oldScore, newScore, progress) => {
    progressAdjustment = TARGET / newScore - TARGET / oldScore;
    return progress + progressAdjustment;
};

export {
    showProgressBar,
    getProgress,
    updateProgress
};