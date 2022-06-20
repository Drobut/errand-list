const local = JSON.parse(localStorage.getItem('users') || '[]');

const emailLogin = document.getElementById('email') as HTMLInputElement;
const registerAlertLogin = document.getElementById(
  'registerAlert'
) as HTMLElement;
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

signIpButton.onclick = () => {
  let indexUserLogged = null;
  local.forEach(
    (user: {email: string; passwordBuffer: string}, index: unknown) => {
      if (
        user.email === emailLogin.value &&
        user.passwordBuffer === passwordBufferLogin.value
      ) {
        indexUserLogged = index;
      }
    }
  );

  if (indexUserLogged === null) {
    messageAlertLogin();
  } else {
    localStorage.setItem('indexUserLogged', indexUserLogged);
    window.location.href = 'errand-list.html';
  }
};

function messageAlertLogin() {
  const registerAlerts = document.createElement('div');
  if (registerAlertLogin) {
    registerAlerts.innerHTML =
      '<div class="registerAlertInner" id="registerAlertInner">' +
      '<div class="alert alert-danger mt-1 mb-4" role="alert">' +
      'Email or password is invalid ' +
      '<a href="home-page.html" class="alert-link"' +
      '>click here to sign up</a>.';
    registerAlertLogin?.append(registerAlerts);
    registerAlertLogin.classList.toggle('fadeOut');
    signIpButton.setAttribute('disabled', 'disabled');
  }
  signIpButton.setAttribute('class', 'btn btn-primary mb-5');
  messageAlertFadeOutLogin();
}

function messageAlertFadeOutLogin() {
  setInterval(() => {
    document.getElementById('registerAlertInner')?.remove();
    registerAlert.classList.remove('fadeOut');
    signIpButton.setAttribute('class', 'btn btn-primary mb-5 mt-3');
  }, 5000);
}
