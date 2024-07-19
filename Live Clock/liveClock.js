const hourEl = document.querySelector('.hour');
const minuteEl = document.querySelector('.minute');
const secondEl = document.querySelector('.second');
const timeEl = document.querySelector('.time');
const dateEl = document.querySelector('.date');
const timezoneSelect = document.getElementById('timezoneSelect');

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
}

setTime();
setInterval(setTime, 1000);


document.addEventListener('DOMContentLoaded', () => {
    const switchButton = document.getElementById('switch');
    let numToggle = 0;
    
    switchButton.addEventListener('change', () => {
      document.documentElement.classList.toggle('dark', switchButton.checked);

      if(numToggle === 0){
        var duration = 500;
        var animationEnd = Date.now() + duration;
        var skew = 1;

        function randomInRange(min, max) {
          return Math.random() * (max - min) + min;
        }

        (function frame() {
          var timeLeft = animationEnd - Date.now();
          var ticks = Math.max(200, 500 * (timeLeft / duration));
          skew = Math.max(0.8, skew - 0.001);

          confetti({
            particleCount: 1,
            startVelocity: 0,
            ticks: ticks,
            origin: {
              x: Math.random(),
              y: (Math.random() * skew) - 0.2
            },
            colors: ['#ffffff'],
            shapes: ['circle'],
            gravity: randomInRange(0.4, 0.6),
            scalar: randomInRange(0.4, 1),
            drift: randomInRange(-0.4, 0.4)
          });

          if (timeLeft > 0) {
            requestAnimationFrame(frame);
          }
        }());
        numToggle = 1;
      }else{
        numToggle = 0;
      }
      
    });
  });  