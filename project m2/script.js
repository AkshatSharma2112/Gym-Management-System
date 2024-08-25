document.addEventListener('DOMContentLoaded', () => {
    const addMemberForm = document.getElementById('addMemberForm');
    const membersList = document.getElementById('membersList');

    // Fetch members
    function fetchMembers() {
        fetch('http://localhost:5000/api/members')
            .then(response => response.json())
            .then(data => {
                membersList.innerHTML = '';
                data.forEach(member => {
                    const li = document.createElement('li');
                    li.textContent = `${member.name} - ${member.email} - ${member.membership_type}`;
                    membersList.appendChild(li);
                });
            })
            .catch(error => console.error('Error fetching members:', error));
    }

    // Add new member
    addMemberForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const membershipType = document.getElementById('membershipType').value;

        fetch('http://localhost:5000/api/members', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, membership_type: membershipType }),
        })
        .then(response => response.json())
        .then(() => {
            fetchMembers();
            addMemberForm.reset();
        })
        .catch(error => console.error('Error adding member:', error));
    });

    // Initial fetch
    fetchMembers();
});