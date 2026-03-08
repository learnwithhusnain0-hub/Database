// Load dashboard stats
async function loadDashboardStats() {
    try {
        // Total students
        const studentsSnapshot = await db.collection('students').get();
        document.getElementById('totalStudents').textContent = studentsSnapshot.size;

        // Boys count
        const boysSnapshot = await db.collection('students').where('gender', '==', 'Male').get();
        document.getElementById('totalBoys').textContent = boysSnapshot.size;

        // Girls count
        const girlsSnapshot = await db.collection('students').where('gender', '==', 'Female').get();
        document.getElementById('totalGirls').textContent = girlsSnapshot.size;

        // Class-wise stats
        const classStats = {};
        studentsSnapshot.forEach(doc => {
            const student = doc.data();
            classStats[student.class] = (classStats[student.class] || 0) + 1;
        });

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

// Load when page loads
if (window.location.href.includes('dashboard.html')) {
    document.addEventListener('DOMContentLoaded', loadDashboardStats);
}
