document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const indexInput = document.getElementById('index');
    const dataTable = document.getElementById('dataTable').getElementsByTagName('tbody')[0];

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = nameInput.value;
        const email = emailInput.value;
        const index = indexInput.value;

        if (index === '') {
            createItem(name, email);
        } else {
            updateItem(index, name, email);
        }

        form.reset();
        indexInput.value = '';
        renderTable();
    });

    function createItem(name, email) {
        const items = getItems();
        items.push({ name, email });
        saveItems(items);
    }

    function updateItem(index, name, email) {
        const items = getItems();
        items[index] = { name, email };
        saveItems(items);
    }

    function deleteItem(index) {
        const items = getItems();
        items.splice(index, 1);
        saveItems(items);
        renderTable();
    }

    function editItem(index) {
        const items = getItems();
        const item = items[index];
        nameInput.value = item.name;
        emailInput.value = item.email;
        indexInput.value = index;
    }

    function getItems() {
        return JSON.parse(localStorage.getItem('items')) || [];
    }

    function saveItems(items) {
        localStorage.setItem('items', JSON.stringify(items));
    }

    function renderTable() {
        const items = getItems();
        dataTable.innerHTML = '';
        items.forEach((item, index) => {
            const row = dataTable.insertRow();
            row.insertCell(0).textContent = item.name;
            row.insertCell(1).textContent = item.email;
            const actionsCell = row.insertCell(2);
            const editButton = document.createElement('button');
            editButton.textContent = 'Editar';
            editButton.onclick = () => editItem(index);
            actionsCell.appendChild(editButton);
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Deletar';
            deleteButton.onclick = () => deleteItem(index);
            actionsCell.appendChild(deleteButton);
        });
    }

    renderTable();
});