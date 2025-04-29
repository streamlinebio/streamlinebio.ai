// Streamline Bio — minimal static-site interactions
(function () {
  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
      var open = links.classList.contains('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') links.classList.remove('open');
    });
  }

  // Current year in footer
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // Contact form -> Google Form (submits into hidden iframe, shows in-page thank-you)
  var form = document.getElementById('contact-form');
  var iframe = document.querySelector('iframe[name="gform-target"]');
  if (form && iframe) {
    var status = document.getElementById('form-status');
    var submitted = false;
    var btn = form.querySelector('button[type="submit"]');
    form.addEventListener('submit', function () {
      submitted = true;
      if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }
    });
    iframe.addEventListener('load', function () {
      if (!submitted) return; // ignore the iframe's initial load
      form.reset();
      if (btn) { btn.disabled = false; btn.textContent = 'Submit'; }
      if (status) {
        status.hidden = false;
        status.textContent = "Thanks — your message has been sent. We'll be in touch shortly.";
        status.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      submitted = false;
    });
  }
})();
