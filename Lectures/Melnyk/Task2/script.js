// local time
setInterval(() => {
    const locale = navigator.language;
  const clockOptions = {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZoneName: 'short',
    timeZone: 'Europe/Kiev'
  };
  const date = new Date();
  
  document.getElementById('local-time').textContent =
      new Intl.DateTimeFormat(locale, clockOptions).format(date);
  }, 1000);
  
  // Initialize Firebase
  const config = {
    apiKey: "AIzaSyCg_QzbIBnaxFaEXuwFAagiKXRwZmJpQeA",
    authDomain: "resume-71a39.firebaseapp.com",
    databaseURL: "https://resume-71a39.firebaseio.com",
    projectId: "resume-71a39",
    storageBucket: "resume-71a39.appspot.com",
    messagingSenderId: "239929733867"
  };
  firebase.initializeApp(config);
  
  // form handler
  const contactForm = document.querySelector('.contact-form');
  
  contactForm.onsubmit = (event) => {
    event.preventDefault();
  
    const formData = new FormData(contactForm);
  
    firebase.database().ref('messages').push({
      name: formData.get('name').trim(),
      email: formData.get('email').trim(),
      message: formData.get('message').trim(),
      date: Date.now()
    });
  
    contactForm.reset();
  
    const msgSent = document.createElement('p');
    msgSent.textContent = 'Message sent!';
  
    contactForm.parentElement.appendChild(msgSent);
  
    setTimeout(() => {
        msgSent.remove();
    }, 5000);
  };