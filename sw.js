self.addEventListener('install',e=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('push',e=>{
  let p={};try{p=e.data.json()}catch(_){p={title:'Sertifikat metan',body:e.data&&e.data.text()}}
  e.waitUntil(self.registration.showNotification(p.title||'Sertifikat metan',{body:p.body||'',tag:p.tag,icon:'icon-192.png',badge:'icon-192.png',renotify:true}));
});
self.addEventListener('notificationclick',e=>{
  e.notification.close();
  e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(cs=>{
    for(const c of cs){if('focus' in c)return c.focus()}
    return self.clients.openWindow('./');
  }));
});
