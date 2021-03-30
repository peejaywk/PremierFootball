/**
 * On form submission send information to emailJS. Add spinner to the button whilst waiting for a response from emailJS
 * On success display the modal, clear the form and remove the spinner.
 * On error display an alert for the user.
 * @param {*} contactForm 
 */
function sendMail(contactForm) {
    // CREDIT: Adding a spinner to a button (https://bbbootstrap.com/snippets/loading-spinner-button-click-32423058)
    // Disable button
    $("#send-button").prop("disabled", true);
    // Add spinner to button
    $("#send-button").html(
        '<i class="fa fa-circle-o-notch fa-spin"></i> Sending...'
    );
    // Extract information for the email from the contact form.
    emailjs.send('service_6txdjqc', 'premier-football', {
        "from_name": contactForm.name.value,
        "from_email": contactForm.emailaddress.value,
        "contact-number": contactForm.contactnumber.value,
        "contact-subject": contactForm.subject.value,
        "contact-message": contactForm.message.value
    })
        .then(
            function (response) { // If email sent successfully then open modal
                // Re-enable the button and remove spinner
                $("#send-button").prop("disabled", false);
                $("#send-button").html('Send');
                $('#success-modal').modal('show');
                contactForm.reset();
            },
            function (error) { // If emailed failed to send then log to console.
                alert("Email failed to send. Please contact premierfootball.ci@gmail.com if the problem persists.");
                // Re-enable the button and remove spinner
                $("#send-button").prop("disabled", false);
                $("#send-button").html('Send');
            });

    return false;
}
