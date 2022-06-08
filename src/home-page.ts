const users = JSON.parse(localStorage.getItem('users') || '[]');

const username = document.getElementById('username') as HTMLInputElement;
const email = document.getElementById('email') as HTMLInputElement;
const passwordBuffer = document.getElementById('password') as HTMLInputElement;
const signUpButton = document.getElementById(
  'signUpButton'
) as HTMLButtonElement;
const signInButton = document.getElementById(
  'signInButton'
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
    signUpButton.removeAttribute('disabled');
  } else {
    signUpButton.setAttribute('disabled', 'disabled');
    emailvalidator();
    passwordValidator();
  }
}

signUpButton.onclick = () => {
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

signInButton.onclick = () => {
  window.location.href = 'signIn-page.html';
};
