function sendMail(contactForm) {
    // Extract information for the email from the contact form.
    emailjs.send('service_6txdjqc', 'premier-football', {
        "from_name": contactForm.name.value,
        "from_email": contactForm.emailaddress.value,
        "contact-number": contactForm.contactnumber.value,
        "contact-subject": contactForm.subject.value,
        "contact-message": contactForm.message.value
    })
    .then(
        function(response) { // If email sent successfully then open modal
            console.log("SUCCESS", response);
            $('#success-modal').modal('show');
            contactForm.reset();
        },
        function(error) { // If emailed failed to send then log to console.
            console.log("FAILED", error);
        });
    
    return false;
}