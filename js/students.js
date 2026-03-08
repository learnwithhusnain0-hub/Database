// Global variables
let allStudents = [];

// Load students on page load
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.href.includes('students.html')) {
        loadStudents();
        setupEventListeners();
    }
});

// Setup event listeners
function setupEventListeners() {
    // Search input
    document.getElementById('searchInput').addEventListener('input', function(e) {
        filterStudents();
    });

    // Class filter
    document.getElementById('classFilter').addEventListener('change', function(e) {
        filterStudents();
    });

    // Student form submit
    document.getElementById('studentForm').addEventListener('submit', addStudent);
}

// Load students from Firebase
async function loadStudents() {
    try {
        const snapshot = await db.collection('students').get();
        allStudents = [];
        snapshot.forEach(doc => {
            allStudents.push({
                id: doc.id,
                ...doc.data()
            });
        });
        displayStudents(allStudents);
    } catch (error) {
        console.error('Error loading students:', error);
        alert('Error loading students');
    }
}

// Display students in table
function displayStudents(students) {
    const tbody = document.getElementById('studentsTableBody');
    tbody.innerHTML = '';

    if (students.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align: center;">No students found</td></tr>';
        return;
    }

    students.forEach(student => {
        tbody.innerHTML += `
            <tr>
                <td>${student.name || ''}</td>
                <td>${student.fatherName || ''}</td>
                <td>${student.class || ''}</td>
                <td>${student.gender || ''}</td>
                <td>${student.phone || ''}</td>
                <td>
                    <button class="btn-edit" onclick="editStudent('${student.id}')">Edit</button>
                    <button class="btn-delete" onclick="deleteStudent('${student.id}')">Delete</button>
                </td>
            </tr>
        `;
    });
}

// Filter students based on search and class
function filterStudents() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const classValue = document.getElementById('classFilter').value;

    const filtered = allStudents.filter(student => {
        const matchesSearch = searchTerm === '' || 
            (student.name && student.name.toLowerCase().includes(searchTerm)) ||
            (student.fatherName && student.fatherName.toLowerCase().includes(searchTerm)) ||
            (student.class && student.class.toLowerCase().includes(searchTerm));
        
        const matchesClass = classValue === '' || student.class === classValue;
        
        return matchesSearch && matchesClass;
    });

    displayStudents(filtered);
}

// Add new student
async function addStudent(e) {
    e.preventDefault();
    
    const studentData = {
        name: document.getElementById('name').value,
        fatherName: document.getElementById('fatherName').value,
        class: document.getElementById('class').value,
        gender: document.getElementById('gender').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        admissionDate: document.getElementById('admissionDate').value,
        createdAt: new Date().toISOString()
    };

    try {
        await db.collection('students').add(studentData);
        closeModal();
        loadStudents();
        alert('Student added successfully!');
    } catch (error) {
        console.error('Error adding student:', error);
        alert('Error adding student');
    }
}

// Edit student
async function editStudent(id) {
    alert('Edit feature coming soon!');
}

// Delete student
async function deleteStudent(id) {
    if (confirm('Are you sure you want to delete this student?')) {
        try {
            await db.collection('students').doc(id).delete();
            loadStudents();
            alert('Student deleted successfully!');
        } catch (error) {
            console.error('Error deleting student:', error);
            alert('Error deleting student');
        }
    }
}

// Modal functions
function openAddStudentModal() {
    document.getElementById('studentModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('studentModal').style.display = 'none';
    document.getElementById('studentForm').reset();
                  }
