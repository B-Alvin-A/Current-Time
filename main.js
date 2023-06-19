const dayjs = require('dayjs');
const timezone = require('dayjs/plugin/timezone');
const utc = require('dayjs/plugin/utc');

dayjs.extend(utc);
dayjs.extend(timezone);

// Get the DOM elements
const timeZoneElement = document.getElementById('time-zone');
const currentTimeElement = document.getElementById('current-time');
const currentDateElement = document.getElementById('current-date');

const modal = document.querySelector('#my-modal');
const modalBtn = document.querySelector('#modal-btn');
const saveBtn = document.querySelector('#saveBtn');
const closeBtn = document.querySelector('.close');
const timezoneSelect = document.getElementById('timezone-select');

// Events
modalBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
saveBtn.addEventListener('click', saveTimezone);
window.addEventListener('click', outsideClick);

let selectedTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

// Open
function openModal() {
  modal.style.display = 'block';
}

// Close
function closeModal() {
  modal.style.display = 'none';
}

// Close If Outside Click
function outsideClick(e) {
  if (e.target == modal) {
    modal.style.display = 'none';
  }
}

// Save Timezone and Update the Page
function saveTimezone() {
  const newTimezone = timezoneSelect.value;
  selectedTimezone = newTimezone;
  timeZoneElement.textContent = 'Time Zone: ' + selectedTimezone;
  closeModal();
}

// Update the content of each item
timeZoneElement.textContent = 'Time Zone: ' + selectedTimezone;

// Update the current time and date every second
function updateTime() {
  const currentTime = dayjs().tz(selectedTimezone).format('HH:mm:ss A');
  const currentDate = dayjs().tz(selectedTimezone).format('DD-MM-YYYY');
  currentTimeElement.textContent = 'Current Time: ' + currentTime;
  currentDateElement.textContent = 'Current Date: ' + currentDate;
}

setInterval(updateTime, 1000);
updateTime();
