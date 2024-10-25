document.addEventListener('DOMContentLoaded', () => {
    const dateForm = document.getElementById('date-form');
    const summaryForm = document.getElementById('summary-form');
    const tableContainer = document.getElementById('table-container');
    const dateInput = document.getElementById('date');

    // Event listener for date form
    dateForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Prevent form from submitting the traditional way
        const selectedDate = dateInput.value;

        if (selectedDate) {
            try {
                const response = await axios.get(`http://localhost:3000/attendance/${selectedDate}`);

                if (response.data) {
                    // Clear previous table (if any)
                    tableContainer.innerHTML = '';

                    // Create table dynamically
                    const table = document.createElement('table');
                    const headerRow = table.insertRow();

                    // Add headers
                    const headers = ['Student Name', 'Attendance Status'];
                    headers.forEach(headerText => {
                        const th = document.createElement('th');
                        th.textContent = headerText;
                        headerRow.appendChild(th);
                    });

                    // Add rows from the response data
                    if (response.data['message']) {
                        response.data['students'].forEach(record => {
                            const row = table.insertRow();
                            const nameCell = row.insertCell(0);
                            const statusCell = row.insertCell(1);

                            nameCell.textContent = record.name;
                            statusCell.innerHTML = `
                                <div>
                                    <input type="radio" id="present-${record.id}" name="attendance-${record.id}" value="Present" checked>
                                    <label for="present-${record.id}">Present</label>
                                </div>
                                <div>
                                    <input type="radio" id="absent-${record.id}" name="attendance-${record.id}" value="Absent">
                                    <label for="absent-${record.id}">Absent</label>
                                </div>
                            `;
                        });
                    } else {
                        response.data.forEach(record => {
                            const row = table.insertRow();
                            const nameCell = row.insertCell(0);
                            const statusCell = row.insertCell(1);

                            nameCell.textContent = record.Student.name;
                            statusCell.textContent = record.status;
                        });
                    }

                    // Append table to the container
                    tableContainer.appendChild(table);

                    // Add a submit button below the table
                    const submitBtn = document.createElement('button');
                    submitBtn.textContent = 'Submit Attendance';
                    submitBtn.className = 'btn';
                    tableContainer.appendChild(submitBtn);

                    // Add event listener to the submit button
                    submitBtn.addEventListener('click', async () => {
                        const attendanceArray = [];

                        response.data['students'].forEach(record => {
                            const attendance = {
                                studentId: record.id,
                                date: selectedDate,
                                status: document.querySelector(`input[name="attendance-${record.id}"]:checked`).value
                            };
                            attendanceArray.push(attendance);
                        });
                        console.log(attendanceArray);


                        try {
                            // Send the attendance data to the server
                            await axios.post('http://localhost:3000/attendance', { attendanceArray });
                            alert('Attendance submitted successfully!');
                        } catch (error) {
                            console.error('Error submitting attendance:', error);
                        }
                    });
                }
            } catch (error) {
                console.error('Error fetching attendance data:', error);
            }
        } else {
            alert('Please select a date.');
        }
    });


     // Event listener for summary form
     summaryForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Prevent traditional form submission

        try {
            const response = await axios.get('http://localhost:3000/summary'); // Adjusted URL

            if (response.data) {
                // Clear any existing table
                tableContainer.innerHTML = '';

                // Create table dynamically
                const table = document.createElement('table');
                const headerRow = table.insertRow();

                // Define headers
                const headers = ['Student Name', 'Attendance Percentage'];
                headers.forEach(headerText => {
                    const th = document.createElement('th');
                    th.textContent = headerText;
                    headerRow.appendChild(th);
                });

                // Populate table with response data
                response.data.forEach(record => {
                    const row = table.insertRow();
                    const nameCell = row.insertCell(0);
                    const attendanceCell = row.insertCell(1);

                    nameCell.textContent = record.name;
                    attendanceCell.textContent = `${(record.attendance * 100).toFixed(2)}%`;
                });

                tableContainer.appendChild(table);
            }
        } catch (error) {
            console.error('Error fetching attendance summary:', error);
        }
    });

});