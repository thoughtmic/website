(function () {
  const form = document.querySelector('.waitlist-form');
  if (!form) return;

  const fields = form.querySelector('[data-element="fields"]');
  const errors = form.querySelector('[data-element="errors"]');
  const input = form.querySelector('input[name="email_address"]');
  const button = form.querySelector('button[type="submit"]');
  const action = form.getAttribute('action');
  if (!fields || !input || !button || !action) return;

  function showError(msg) {
    errors.innerHTML = '<li>' + msg + '</li>';
  }

  function showSuccess() {
    fields.style.display = 'none';
    errors.innerHTML = '';
    const ok = document.createElement('div');
    ok.className = 'formkit-alert formkit-alert-success';
    ok.setAttribute('role', 'status');
    ok.textContent = "You're on the list. Check your inbox to confirm.";
    form.appendChild(ok);
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    errors.innerHTML = '';

    const email = (input.value || '').trim();
    if (!email) {
      showError('Please enter your email.');
      input.focus();
      return;
    }

    button.disabled = true;
    button.setAttribute('aria-busy', 'true');

    const body = new FormData();
    body.append('email_address', email);

    // Kit's public form endpoint accepts cross-origin submissions but doesn't
    // expose CORS headers on the response, so we submit with mode: 'no-cors'.
    // The trade-off: the response is opaque, so we can't distinguish a real
    // error from a successful submit. For a waitlist that's acceptable —
    // invalid-format emails are caught by the browser's type="email" validation
    // above, and duplicate subscribers are silently accepted by Kit (no harm).
    fetch(action, {
      method: 'POST',
      mode: 'no-cors',
      body: body,
    })
      .then(function () {
        showSuccess();
      })
      .catch(function () {
        button.disabled = false;
        button.removeAttribute('aria-busy');
        showError('Something went wrong. Please try again or email hello@thoughtmic.com.');
      });
  });
})();
