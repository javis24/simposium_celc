function updateCountdown(targetDate) {
    const now = new Date().getTime();
    const distance = targetDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').innerText = days;
    document.getElementById('hours').innerText = hours;
    document.getElementById('minutes').innerText = minutes;
    document.getElementById('seconds').innerText = seconds;
}

// Configura la fecha objetivo: Viernes 6 de junio, 7:30 PM
const eventDate = new Date('June 6, 2025 19:30:00').getTime();

setInterval(() => updateCountdown(eventDate), 1000);


const schedules = [
    [
        { time: "09:00 am - 10:00 am", topic: "Derecho", speaker: "Sarah Johnson", venue: "Menores Infractores" },
        { time: "10:00 am - 11:00 am", topic: "Derecho", speaker: "Mike Brown", venue: "Feminicidio" },
        { time: "11:00 am - 12:00 am", topic: "Derecho", speaker: "Mike Brown", venue: "Registro Nacional de Deudores Alimentarios" }
    ],
    [
        { time: "09:00 am - 10:00 am", topic: "Women in Business Conference", speaker: "Ashton Porter", venue: "Manhattan Club NYC" },
        { time: "10:00 am - 11:00 am", topic: "Entrepreneurship Growth", speaker: "Laura Smith", venue: "Manhattan Club NYC" }
    ],
    [
        { time: "09:00 am - 10:00 am", topic: "AI in Marketing", speaker: "Alan Turing", venue: "Tech Hub" },
        { time: "10:00 am - 11:00 am", topic: "Future of Work", speaker: "Elena White", venue: "Main Auditorium" }
    ],
    [
        { time: "09:00 am - 10:00 am", topic: "Business Networking", speaker: "John Doe", venue: "Grand Hall" },
        { time: "10:00 am - 11:00 am", topic: "Marketing Funnels", speaker: "Emily Clark", venue: "Grand Hall" }
    ],
     [
        { time: "09:00 am - 10:00 am", topic: "Business Networking", speaker: "John Doe", venue: "Grand Hall" },
        { time: "10:00 am - 11:00 am", topic: "Marketing Funnels", speaker: "Emily Clark", venue: "Grand Hall" }
    ]
];

function showSchedule(dayIndex) {
    const scheduleDiv = document.getElementById('schedule');
    scheduleDiv.innerHTML = '';

    document.querySelectorAll('.day-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.day-btn')[dayIndex].classList.add('active');

    schedules[dayIndex].forEach(event => {
        scheduleDiv.innerHTML += `
            <div class="schedule-item">
                <div class="schedule-time">${event.time}</div>
                <div class="schedule-info">
                    <strong>Topic:</strong> ${event.topic}<br/>
                    <strong>Speaker:</strong> ${event.speaker}<br/>
                    <strong>Venue:</strong> ${event.venue}
                </div>
                <a href="#inscripcionForm" class="details-btn">incrisbete</a>
            </div>
        `;
    });
}

// Load Day 02 by default
showSchedule(1);

document.getElementById('inscripcionForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const carrera = document.getElementById('carrera').value;
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('telefono').value;

    console.log({ nombre, carrera, email, telefono }); // ✅ Verifica que tenga datos

    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('carrera', carrera);
    formData.append('email', email);
    formData.append('telefono', telefono);

    fetch('registrar.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log(data); // ✅ Verifica la respuesta de PHP
        if (data.success) {
            const mensaje = `Hola, soy ${nombre} y me inscribo en ${carrera}. Mi email es ${email} y mi teléfono ${telefono}.`;
            const whatsappURL = `https://wa.me/5218715986114?text=${encodeURIComponent(mensaje)}`;
            window.open(whatsappURL, '_blank');
        } else {
            alert('Error al guardar el registro.');
        }
    })
    .catch(err => console.error('Error en la petición:', err));
});

