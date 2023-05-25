document.getElementById('filterBar').addEventListener('submit', function(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new URLSearchParams(new FormData(form));

    fetch('/filterBar', {
        method: 'POST',
        body: formData,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
    })
    .then(response => {
        if (response.ok) {
        // Form submitted successfully
        console.log('Form submitted successfully');
        } else {
        // Handle error response
        console.error('Form submission failed');
        }
    })
    .catch(error => {
        // Handle any errors that occurred during the request
        console.error('An error occurred:', error);
      });
})