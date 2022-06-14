const local = JSON.parse(localStorage.getItem('users') || '[]');

const emailLogin = document.getElementById('email') as HTMLInputElement;
const passwordBufferLogin = document.getElementById(
  'password'
) as HTMLInputElement;
const navigatorHome = document.getElementById(
  'navigatorHome'
) as HTMLButtonElement;
const signIpButton = document.getElementById(
  'signIpButton'
) as HTMLButtonElement;

emailLogin.addEventListener('keyup', enableButtonLogin);
passwordBufferLogin.addEventListener('keyup', enableButtonLogin);

function emailvalidatorLogin() {
  const filter = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  if (!filter.test(emailLogin.value)) {
    return false;
  } else {
    return true;
  }
}

function passwordValidatorLogin() {
  const passFilter = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  if (!passFilter.test(passwordBufferLogin.value)) {
    return false;
  } else {
    return true;
  }
}

function enableButtonLogin() {
  if (passwordValidatorLogin() === true && emailvalidatorLogin() === true) {
    signIpButton.removeAttribute('disabled');
  } else {
    signIpButton.setAttribute('disabled', 'disabled');
    passwordValidatorLogin();
  }
}

navigatorHome.onclick = () => {
  window.location.href = 'home-page.html';
};

signIpButton.onclick = () => {};
