(() => {
  const form = document.getElementById('login-form');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const emailError = document.getElementById('email-error');
  const passwordError = document.getElementById('password-error');
  const submitBtn = document.getElementById('submit-btn');
  const togglePasswordBtn = document.getElementById('toggle-password');
  const googleBtn = document.getElementById('google-btn');

  function setButtonLoading(isLoading) {
    submitBtn.classList.toggle('loading', isLoading);
    submitBtn.disabled = isLoading;
  }

  function validateEmail(value) {
    if (!value) return 'Email is required';
    const valid = /.+@.+\..+/.test(value);
    return valid ? '' : 'Enter a valid email address';
  }

  function validatePassword(value) {
    if (!value) return 'Password is required';
    if (value.length < 8) return 'Must be at least 8 characters';
    return '';
  }

  function showError(el, message) {
    el.textContent = message;
  }

  function clearErrors() {
    showError(emailError, '');
    showError(passwordError, '');
  }

  togglePasswordBtn.addEventListener('click', () => {
    const isPassword = passwordInput.type === 'password';
    passwordInput.type = isPassword ? 'text' : 'password';
    togglePasswordBtn.setAttribute('aria-pressed', String(isPassword));
    togglePasswordBtn.textContent = isPassword ? 'Hide' : 'Show';
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearErrors();

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    const emailMsg = validateEmail(email);
    const passwordMsg = validatePassword(password);
    if (emailMsg || passwordMsg) {
      if (emailMsg) showError(emailError, emailMsg);
      if (passwordMsg) showError(passwordError, passwordMsg);
      return;
    }

    try {
      setButtonLoading(true);
      await new Promise((r) => setTimeout(r, 900));
      // Replace with real API call
      // const res = await fetch('/api/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) });
      // const data = await res.json();
      // if (!res.ok) throw new Error(data.message || 'Login failed');
      localStorage.setItem('cartmoq_auth', JSON.stringify({ email, token: 'demo-token', ts: Date.now() }));
      window.location.href = './dashboard.html';
    } catch (err) {
      showError(passwordError, err?.message || 'Login failed');
    } finally {
      setButtonLoading(false);
    }
  });

  googleBtn.addEventListener('click', async () => {
    setButtonLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    alert('Google OAuth is not configured in this demo.');
    setButtonLoading(false);
  });
})();

