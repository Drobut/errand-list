const users = JSON.parse(localStorage.getItem('users') || '[]');

const username = document.getElementById('username') as HTMLInputElement;
const email = document.getElementById('email') as HTMLInputElement;
const passwordBuffer = document.getElementById('password') as HTMLInputElement;
const registerAlert = document.getElementById('registerAlert') as HTMLElement;
const signUpButtonLogin = document.getElementById(
  'signUpButtonLogin'
) as HTMLButtonElement;

const signInButtonNavigator = document.getElementById(
  'signInButtonNavigator'
) as HTMLButtonElement;

username.addEventListener('keyup', enableButton);
email.addEventListener('keyup', enableButton);
passwordBuffer.addEventListener('keyup', enableButton);

function emailvalidator() {
  const filter = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  if (!filter.test(email.value)) {
    return false;
  } else {
    return true;
  }
}

function passwordValidator() {
  const passFilter = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  if (!passFilter.test(passwordBuffer.value)) {
    return false;
  } else {
    return true;
  }
}

function enableButton() {
  if (
    username.value !== null &&
    passwordValidator() === true &&
    emailvalidator() === true
  ) {
    signUpButtonLogin.removeAttribute('disabled');
  } else {
    signUpButtonLogin.setAttribute('disabled', 'disabled');
    passwordValidator();
  }
}

signUpButtonLogin.onclick = () => {
  const userExists = users.some(
    (user: {email: string}) => user.email === email.value
  );
  if (userExists) {
    messageAlert();
    return;
  }
  const user = {
    passwordBuffer: passwordBuffer.value,
    username: username.value,
    email: email.value,
    cards: [],
  };
  users.push(user);
  localStorage.setItem('users', JSON.stringify(users));
  window.location.href = 'signIn-page.html';
};

signInButtonNavigator.onclick = () => {
  window.location.href = 'signIn-page.html';
};

function messageAlert() {
  const registerAlerts = document.createElement('div');
  if (registerAlert) {
    registerAlerts.innerHTML =
      '<div class="registerAlertInner" id="registerAlertInner">' +
      '<div class="alert alert-danger mt-3" role="alert">' +
      'Email already registered ' +
      '<a href="signIn-page.html" class="alert-link"' +
      '>click here to sign in</a>.';
    registerAlert?.append(registerAlerts);
    registerAlert.classList.toggle('fadeOut');
    signUpButtonLogin.setAttribute('disabled', 'disabled');
  }
  signUpButtonLogin.setAttribute('class', 'btn btn-primary mb-5');
  messageAlertFadeOut();
}

function messageAlertFadeOut() {
  setInterval(() => {
    document.getElementById('registerAlertInner')?.remove();
    registerAlert.classList.remove('fadeOut');
    signUpButtonLogin.setAttribute('class', 'btn btn-primary mb-5 mt-5');
  }, 5000);
}
