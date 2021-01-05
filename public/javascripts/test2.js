(() => {
  const formItems = document.forms[0];
  const submitButton = document.getElementById('js-submit');
  submitButton.addEventListener('click', (e) => {
    const pass = formItems.password.value;
    const passConfirm = formItems.passwordConfirm.value;
    if(pass != passConfirm) {
      e.preventDefault();
      const insertErrorMessage = document.getElementById('errorMessage');
      insertErrorMessage.innerHTML = 'パスワードが一致しません';
    }
  });
})();