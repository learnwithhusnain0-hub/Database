// Load dashboard stats on page load
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.href.includes('dashboard.html')) {
        loadDashboardStats();
    }
});

// Load dashboard statistics
async function loadDashboardStats() {
    try {
        // Get all students
        const studentsSnapshot = await db.collection('students').get();
        const totalStudents = studentsSnapshot.size;
        document.getElementById('totalStudents').textContent = totalStudents;

        // Count boys
        let boysCount = 0;
        let girlsCount = 0;
        const classStats = {};

        studentsSnapshot.forEach(doc => {
            const student = doc.data();
            
            // Count gender
            if (student.gender === 'Male') {
                boysCount++;
            } else if (student.gender === 'Female') {
                girlsCount++;
            }

            // Class-wise count
            const className = student.class || 'Unknown';
            classStats[className] = (classStats[className] || 0) + 1;
        });

        document.getElementById('totalBoys').textContent = boysCount;
        document.getElementById('totalGirls').textContent = girlsCount;

        // Display class stats
        const classGrid = document.getElementById('classStats');
        classGrid.innerHTML = '';
        
        for (let className in classStats) {
            classGrid.innerHTML += `
                <div class="class-item">
                    <h4>${className}</h4>
                    <span>${classStats[className]} Students</span>
                </div>
            `;
        }

    } catch (error) {
        console.error('Error loading dashboard:', error);
    }
}
