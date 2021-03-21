function sendMail(contactForm) {
    emailjs.send('service_6txdjqc', 'premier-football', {
        "from_name": contactForm.name.value,
        "from_email": contactForm.emailaddress.value,
        "contact-number": contactForm.contactnumber.value,
        "contact-subject": contactForm.subject.value,
        "contact-message": contactForm.message.value
    })
    .then(
        function(response) {
            console.log("SUCCESS", response);
        },
        function(error) {
            console.log("FAILED", error);
        });
    contactForm.reset();
    return false;
}