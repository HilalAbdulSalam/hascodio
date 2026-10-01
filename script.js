const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('open');
}
menuButton.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!expanded));
  navigation.classList.toggle('open', !expanded);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuButton.focus();
  }
});
document.querySelectorAll('[data-service]').forEach(link => {
  link.addEventListener('click', () => { document.querySelector('#service').value = link.dataset.service; });
});
document.querySelector('#year').textContent = new Date().getFullYear();
const form = document.querySelector('#contact-form');
const status = document.querySelector('#form-status');
const submitButton = form.querySelector('button[type="submit"]');
form.addEventListener('submit', async event => {
  event.preventDefault();
  if (submitButton.disabled) return;
  const name = form.elements.name.value.trim();
  const email = form.elements.email.value.trim();
  const message = form.elements.message.value.trim();
  if (name.length < 2 || message.length < 5) {
    status.textContent = 'Please enter your name and a brief description of your project.';
    (name.length < 2 ? form.elements.name : form.elements.message).focus();
    return;
  }
  submitButton.disabled = true;
  submitButton.textContent = 'Sending your enquiry…';
  status.textContent = '';
  try {
    if (!window.emailjs) throw new Error('Email service unavailable');
    window.emailjs.init({ publicKey: 'zyhByM6lDxBWJRVhT' });
    const service = form.elements.service.value;
    await window.emailjs.send('service_4yy0a0b', 'template_bg7n64i', {
      from_name: name,
      reply_to: email,
      message: (service ? `Service: ${service}\n\n` : '') + message
    });
    status.textContent = 'Thank you! Your enquiry has been sent. We’ll be in touch.';
    form.reset();
  } catch {
    status.textContent = 'Your enquiry could not be sent. Please try again or message us on WhatsApp using the link on this page. Your details are still here.';
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = 'Send project enquiry ↗';
  }
});
