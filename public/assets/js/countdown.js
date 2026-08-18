(function(){
  var target = Date.UTC(2026, 8, 12, 10, 0, 0); // 12 Sept 2026, 11:00 BST
  var d=document.getElementById('cd-d'), h=document.getElementById('cd-h'),
      m=document.getElementById('cd-m'), s=document.getElementById('cd-s'),
      mini=document.getElementById('cd-mini');
  function pad(n){return n<10?'0'+n:''+n}
  function tick(){
    var diff = target - Date.now();
    if (diff <= 0){
      d.textContent=h.textContent=m.textContent=s.textContent='00';
      if(mini) mini.textContent='Today';
      return;
    }
    var days=Math.floor(diff/86400000), hrs=Math.floor(diff/3600000)%24,
        mins=Math.floor(diff/60000)%60, secs=Math.floor(diff/1000)%60;
    d.textContent=days; h.textContent=pad(hrs); m.textContent=pad(mins); s.textContent=pad(secs);
    if(mini) mini.textContent = days + ' days to go';
  }
  tick(); setInterval(tick, 1000);
})();
