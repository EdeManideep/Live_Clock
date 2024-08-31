const hourEl = document.querySelector('.hour');
const minuteEl = document.querySelector('.minute');
const secondEl = document.querySelector('.second');
const timeEl = document.querySelector('.time');
const dateEl = document.querySelector('.date');
const timezoneSelect = document.getElementById('timezoneSelect');
const switchButton = document.getElementById('switch');

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function setTime() {
    const selectedTimeZone = timezoneSelect.value;
    const time = new Date().toLocaleString('en-US', { timeZone: selectedTimeZone });
    const timeObj = new Date(time);
    
    const month = timeObj.getMonth();
    const day = timeObj.getDay();
    const date = timeObj.getDate();
    const hours = timeObj.getHours();
    const hoursForClock = hours >= 13 ? hours % 12 : hours;
    const minutes = timeObj.getMinutes();
    const seconds = timeObj.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hourEl.style.transform = `translate(-50%, -100%) rotate(${scale(hoursForClock, 0, 12, 0, 360)}deg)`;
    minuteEl.style.transform = `translate(-50%, -100%) rotate(${scale(minutes, 0, 60, 0, 360)}deg)`;

    // Directly set the rotation for the second hand without animation
    secondEl.style.transition = seconds === 0 ? 'none' : 'all 0.05s ease-in-out';
    secondEl.style.transform = `translate(-50%, -100%) rotate(${scale(seconds, 0, 60, 0, 360)}deg)`;

    timeEl.innerHTML = `${hoursForClock}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds} ${ampm}`;
    dateEl.innerHTML = `${days[day]}, ${months[month]} <span class="circle">${date}</span>`;
}

const scale = (num, in_min, in_max, out_min, out_max) => {
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
};

setTime();
setInterval(setTime, 1000);

timezoneSelect.addEventListener('change', setTime);

document.addEventListener('DOMContentLoaded', () => {
    switchButton.addEventListener('change', (e) => {
        document.documentElement.classList.toggle('dark', e.target.checked);
    });

    // Set the toggle state to match the dark mode state on load
    switchButton.checked = document.documentElement.classList.contains('dark');
});
