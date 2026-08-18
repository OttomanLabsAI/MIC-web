/* ---- CONFIG: edit these three lines, nothing else ------------- */
const PRICE_RISE = new Date('2026-10-01T00:00:00+01:00');  // standard → final release
const EVENT_DATE = new Date('2026-11-28T18:00:00+00:00');
/* -------------------------------------------------------------- */

// Countdown to the next price rise. Hides itself once the date passes,
// so the page never advertises an offer that has already expired.
(function(){
  const box = document.getElementById('countdown');
  const val = document.getElementById('cd-val');
  function tick(){
    const ms = PRICE_RISE - Date.now();
    if(ms <= 0 || Date.now() > EVENT_DATE){ box.hidden = true; return; }
    box.hidden = false;
    const d = Math.floor(ms/864e5), h = Math.floor(ms/36e5)%24, m = Math.floor(ms/6e4)%60;
    val.textContent = d + 'd ' + String(h).padStart(2,'0') + 'h ' + String(m).padStart(2,'0') + 'm';
  }
  tick(); setInterval(tick, 30000);
})();

// Scroll reveal
(function(){
  const items = document.querySelectorAll('.rv');
  if(!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches){
    items.forEach(el => el.classList.add('in')); return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if(e.isIntersecting){
        setTimeout(() => e.target.classList.add('in'), i * 45);
        io.unobserve(e.target);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 });
  items.forEach(el => io.observe(el));
})();

// Notify form — replace with your real endpoint (Mailchimp / WP / Formspree)
document.getElementById('notify').addEventListener('submit', function(e){
  e.preventDefault();
  const btn = this.querySelector('button');
  if(!this.email.value.includes('@')){ this.email.focus(); return; }
  btn.textContent = 'Added — check your inbox';
  btn.disabled = true;
});
