
const bookButton = document.getElementById('book-button');

bookButton.addEventListener('click', (e) => {
    e.preventDefault();

    const name = document.getElementById('name');
    const age = document.getElementById('age');
    const adhaar = document.getElementById('adhaar');
    const city = document.querySelector('select[name="city"]');
    const date = document.getElementById('date');
    const seat = document.querySelector('select[name="seat"]');
    const type = document.querySelector('input[name="busType"]:checked');
    const ticketContainer = document.getElementById('ticket-container');

    if (!name.value.trim() || !age.value || !adhaar.value.trim() || !date.value || !type) {
        alert('Please fill in all fields before booking.');
        return;
    }

    const busType = type.value === 'ac' ? 'AC Bus' : 'Non-AC Bus';
    const seatNumber = Number(seat.options[seat.selectedIndex].text);
    const farePerSeat = type.value === 'ac' ? 2000 : 1500;
    const fare = farePerSeat * seatNumber;

    ticketContainer.innerHTML = `
        <div style="background-color: white; color: black; border: 2px dashed green; padding: 20px; margin-top: 20px; border-radius: 10px;">
            <h2 style="color: green; margin-top: 0;">Ticket Booked Successfully</h2>
            <p><strong>Passenger:</strong> ${name.value.trim()}</p>
            <p><strong>Age:</strong> ${age.value}</p>
            <p><strong>Adhaar Number:</strong> ${adhaar.value}</p>
            <p><strong>City:</strong> ${city.options[city.selectedIndex].text}</p>
            <p><strong>Travel Date:</strong> ${date.value}</p>
            <p><strong>Bus Type:</strong> ${busType}</p>
            <p><strong>Seat Number:</strong> ${seat.options[seat.selectedIndex].text}</p>
            <p><strong>Fare:</strong> Rs. ${fare}</p>
        </div>`;

});