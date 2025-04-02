// Calendar functionality
document.addEventListener('DOMContentLoaded', function() {
    const calendarDays = document.getElementById('calendarDays');
    const currentMonth = document.getElementById('currentMonth');
    const prevMonthBtn = document.getElementById('prevMonth');
    const nextMonthBtn = document.getElementById('nextMonth');
    const eventList = document.getElementById('eventList');

    let currentDate = new Date();
    let currentMonthIndex = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();

    // Sample events data
    const events = [
        { date: '2024-03-15', title: 'Parent-Teacher Meeting', time: '2:00 PM' },
        { date: '2024-03-20', title: 'Sports Day', time: '9:00 AM' },
        { date: '2024-03-25', title: 'Cultural Festival', time: '10:00 AM' },
        { date: '2024-04-05', title: 'Science Fair', time: '11:00 AM' },
        { date: '2024-04-15', title: 'Annual Day', time: '3:00 PM' }
    ];

    function updateCalendar() {
        const firstDay = new Date(currentYear, currentMonthIndex, 1);
        const lastDay = new Date(currentYear, currentMonthIndex + 1, 0);
        const startingDay = firstDay.getDay();
        const totalDays = lastDay.getDate();

        // Update month and year display
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'];
        currentMonth.textContent = `${monthNames[currentMonthIndex]} ${currentYear}`;

        // Clear previous days
        calendarDays.innerHTML = '';

        // Add empty cells for days before the first day of the month
        for (let i = 0; i < startingDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'day empty';
            calendarDays.appendChild(emptyDay);
        }

        // Add days of the month
        for (let day = 1; day <= totalDays; day++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'day';
            dayElement.textContent = day;

            // Check if this day has events
            const dateString = `${currentYear}-${String(currentMonthIndex + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const dayEvents = events.filter(event => event.date === dateString);

            if (dayEvents.length > 0) {
                dayElement.classList.add('has-event');
                dayElement.addEventListener('click', () => showEvents(dayEvents));
            }

            calendarDays.appendChild(dayElement);
        }
    }

    function showEvents(dayEvents) {
        eventList.innerHTML = '';
        dayEvents.forEach(event => {
            const eventElement = document.createElement('div');
            eventElement.className = 'event-item';
            eventElement.innerHTML = `
                <div class="event-date">${event.date}</div>
                <div class="event-info">
                    <h3>${event.title}</h3>
                    <p class="event-time">${event.time}</p>
                </div>
            `;
            eventList.appendChild(eventElement);
        });
    }

    // Event listeners for month navigation
    prevMonthBtn.addEventListener('click', () => {
        currentMonthIndex--;
        if (currentMonthIndex < 0) {
            currentMonthIndex = 11;
            currentYear--;
        }
        updateCalendar();
    });

    nextMonthBtn.addEventListener('click', () => {
        currentMonthIndex++;
        if (currentMonthIndex > 11) {
            currentMonthIndex = 0;
            currentYear++;
        }
        updateCalendar();
    });

    // Initialize calendar
    updateCalendar();

    // News filtering functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const newsItems = document.querySelectorAll('.news-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.category;

            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filter news items
            newsItems.forEach(item => {
                if (category === 'all' || item.querySelector('.news-category').textContent.toLowerCase() === category) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}); 