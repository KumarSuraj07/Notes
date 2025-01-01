function delFunction(taskName) {
    // Send a POST request to the server to delete the file
    fetch('/delete', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ taskName }), // Send the task name as the payload
    })
        .then((response) => {
            if (response.ok) {
                console.log(`Task "${taskName}" deleted successfully.`);
                
                // Remove the task element from the DOM
                const taskElement = document.querySelector(`.task h1`).parentElement; 
                if (taskElement) taskElement.remove();
            } else {
                console.error(`Failed to delete task "${taskName}".`);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}
