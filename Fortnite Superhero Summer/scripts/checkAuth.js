function checkCalendarAccess(e) {
  const currentUser = localStorage.getItem('currentUser');
  
  if (!currentUser) {
    e.preventDefault();
    alert('Пожалуйста, войдите в систему для доступа к данной странице.');
    window.location.href = 'signin.html';
  }
}

document.addEventListener('DOMContentLoaded', function() {

  const calendarLinks = document.querySelectorAll('a.calendar');
  
  calendarLinks.forEach((link, index) => {
    link.id = `calendarLink${index}`;
    link.addEventListener('click', checkCalendarAccess);
  });
});