// Sélectionnez les éléments du DOM
const taskForm = document.getElementById("task-form");
const taskList = document.getElementById("task-list");

// Écoutez la soumission du formulaire
taskForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Récupérez les valeurs du formulaire
    const title = document.getElementById("task-title").value;
    const description = document.getElementById("task-description").value;
    const deadline = document.getElementById("task-deadline").value;
    const priority = document.getElementById("task-priority").value;

    // Créez un élément de tâche
    const taskItem = document.createElement("li");
    taskItem.innerHTML = `
        <h3>${title}</h3>
        <p>${description}</p>
        <p>Date limite : ${deadline}</p>
        <p>Priorité : ${priority}</p>
        <button class="complete-btn">Terminé</button>
        <button class="edit-btn">Modifier</button>
        <button class="delete-btn">Supprimer</button>
    `;

    // Ajoutez la tâche à la liste
    taskList.appendChild(taskItem);

    // Réinitialisez le formulaire
    taskForm.reset();
});

// Écoutez les clics sur les boutons "Terminé" et "Modifier"
taskList.addEventListener("click", function (e) {
    if (e.target.classList.contains("complete-btn")) {
        const taskItem = e.target.parentElement;
        // Mettez à jour l'état d'avancement de la tâche
        taskItem.classList.toggle("completed");
    } else if (e.target.classList.contains("edit-btn")) {
        const taskItem = e.target.parentElement;
        // Récupérez les éléments de tâche à modifier
        const titleElement = taskItem.querySelector("h3");
        const descriptionElement = taskItem.querySelector("p:nth-child(2)");
        const deadlineElement = taskItem.querySelector("p:nth-child(3)");
        const priorityElement = taskItem.querySelector("p:nth-child(4)");

        // Récupérez les valeurs actuelles
        const currentTitle = titleElement.textContent;
        const currentDescription = descriptionElement.textContent;
        const currentDeadline = deadlineElement.textContent.split(": ")[1];
        const currentPriority = priorityElement.textContent.split(": ")[1];

        // Affichez un formulaire de modification avec les valeurs actuelles
        const editForm = document.createElement("form");
        editForm.innerHTML = `
            <label for="edit-title">Titre :</label>
            <input type="text" id="edit-title" value="${currentTitle}" required>
            <label for="edit-description">Description :</label>
            <textarea id="edit-description" rows="4">${currentDescription}</textarea>
            <label for="edit-deadline">Date limite :</label>
            <input type="date" id="edit-deadline" value="${currentDeadline}" required>
            <label for="edit-priority">Priorité :</label>
            <select id="edit-priority">
                <option value="Faible" ${currentPriority === "Faible" ? "selected" : ""}>Faible</option>
                <option value="Moyenne" ${currentPriority === "Moyenne" ? "selected" : ""}>Moyenne</option>
                <option value="Forte" ${currentPriority === "Forte" ? "selected" : ""}>Forte</option>
            </select>
            <button type="submit">Enregistrer</button>
        `;

        // Remplacez l'élément de tâche par le formulaire de modification
        taskList.replaceChild(editForm, taskItem);
    } else if (e.target.classList.contains("delete-btn")) {
        // Supprimer la tâche lorsque le bouton "Supprimer" est cliqué
        const taskItem = e.target.parentElement;
        taskList.removeChild(taskItem);
    }
});

// Écoutez la soumission du formulaire de modification
taskList.addEventListener("submit", function (e) {
    e.preventDefault();

    if (e.target.tagName === "FORM") {
        // Récupérez les nouvelles valeurs du formulaire de modification
        const editedTitle = e.target.querySelector("#edit-title").value;
        const editedDescription = e.target.querySelector("#edit-description").value;
        const editedDeadline = e.target.querySelector("#edit-deadline").value;
        const editedPriority = e.target.querySelector("#edit-priority").value;

        // Créez un nouvel élément de tâche modifié
        const editedTaskItem = document.createElement("li");
        editedTaskItem.innerHTML = `
            <h3>${editedTitle}</h3>
            <p>${editedDescription}</p>
            <p>Date limite : ${editedDeadline}</p>
            <p>Priorité : ${editedPriority}</p>
            <button class="complete-btn">Terminé</button>
            <button class="edit-btn">Modifier</button>
            <button class="delete-btn">Supprimer</button>
        `;

        // Remplacez le formulaire de modification par le nouvel élément de tâche modifié
        taskList.replaceChild(editedTaskItem, e.target);

        // Réinitialisez le formulaire de modification
        e.target.reset();
    }
});
