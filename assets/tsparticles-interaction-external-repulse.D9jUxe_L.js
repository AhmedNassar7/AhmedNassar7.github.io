import{k as x,E as b,C as g,g as k,V as M,c as S,a as _,R as q,v as w,m as D,i as y,f as T,h as C}from"./tsparticles-engine.DLgpyJd2.js";class E{constructor(){this.distance=200,this.duration=.4,this.factor=100,this.speed=1,this.maxSpeed=50,this.easing="ease-out-quad"}load(e){e&&(e.distance!==void 0&&(this.distance=e.distance),e.duration!==void 0&&(this.duration=e.duration),e.easing!==void 0&&(this.easing=e.easing),e.factor!==void 0&&(this.factor=e.factor),e.speed!==void 0&&(this.speed=e.speed),e.maxSpeed!==void 0&&(this.maxSpeed=e.maxSpeed))}}class V extends E{constructor(){super(),this.selectors=[]}get ids(){return x(this.selectors,e=>e.replace("#",""))}set ids(e){this.selectors=x(e,t=>`#${t}`)}load(e){super.load(e),e&&(e.ids!==void 0&&(this.ids=e.ids),e.selectors!==void 0&&(this.selectors=e.selectors))}}class H extends E{load(e){super.load(e),e&&(this.divs=x(e.divs,t=>{const i=new V;return i.load(t),i}))}}class I extends b{constructor(e,t){super(t),this._clickRepulse=()=>{const i=this.container,r=i.actualOptions.interactivity.modes.repulse;if(!r)return;const s=i.repulse||{particles:[]};if(s.finish||(s.count||(s.count=0),s.count++,s.count===i.particles.count&&(s.finish=!0)),s.clicking){const n=i.retina.repulseModeDistance;if(!n||n<0)return;const c=Math.pow(n/6,3),a=i.interactivity.mouse.clickPosition;if(a===void 0)return;const o=new g(a.x,a.y,c),l=i.particles.quadTree.query(o,u=>this.isEnabled(u));for(const u of l){const{dx:d,dy:p,distance:f}=k(a,u.position),h=f**2,m=r.speed,O=-c*m/h;if(h<=c){s.particles.push(u);const R=M.create(d,p);R.length=O,u.velocity.setTo(R)}}}else if(s.clicking===!1){for(const n of s.particles)n.velocity.setTo(n.initialVelocity);s.particles=[]}},this._hoverRepulse=()=>{const i=this.container,r=i.interactivity.mouse.position,s=i.retina.repulseModeDistance;!s||s<0||!r||this._processRepulse(r,s,new g(r.x,r.y,s))},this._processRepulse=(i,r,s,n)=>{const c=this.container,a=c.particles.quadTree.query(s,l=>this.isEnabled(l)),o=c.actualOptions.interactivity.modes.repulse;if(o)for(const l of a){const{dx:u,dy:d,distance:p}=k(l.position,i),f=((n==null?void 0:n.speed)??o.speed)*o.factor,h=S(_(o.easing)(1-p/r)*f,0,o.maxSpeed),m=M.create(p===0?f:u/p*h,p===0?f:d/p*h);l.position.addTo(m)}},this._singleSelectorRepulse=(i,r)=>{const s=this.container,n=s.actualOptions.interactivity.modes.repulse;if(!n)return;const c=document.querySelectorAll(i);c.length&&c.forEach(a=>{const o=a,l=s.retina.pixelRatio,u={x:(o.offsetLeft+o.offsetWidth/2)*l,y:(o.offsetTop+o.offsetHeight/2)*l},d=o.offsetWidth/2*l,p=r.type==="circle"?new g(u.x,u.y,d):new q(o.offsetLeft*l,o.offsetTop*l,o.offsetWidth*l,o.offsetHeight*l),f=n.divs,h=w(f,o);this._processRepulse(u,d,p,h)})},this._engine=e,t.repulse||(t.repulse={particles:[]}),this.handleClickMode=i=>{const r=this.container.actualOptions,s=r.interactivity.modes.repulse;if(!s||i!=="repulse")return;t.repulse||(t.repulse={particles:[]});const n=t.repulse;n.clicking=!0,n.count=0;for(const c of t.repulse.particles)this.isEnabled(c)&&c.velocity.setTo(c.initialVelocity);n.particles=[],n.finish=!1,setTimeout(()=>{t.destroyed||(n.clicking=!1)},s.duration*1e3)}}clear(){}init(){const e=this.container,t=e.actualOptions.interactivity.modes.repulse;t&&(e.retina.repulseModeDistance=t.distance*e.retina.pixelRatio)}async interact(){const e=this.container,t=e.actualOptions,i=e.interactivity.status===D,r=t.interactivity.events,s=r.onHover,n=s.enable,c=s.mode,a=r.onClick,o=a.enable,l=a.mode,u=r.onDiv;i&&n&&y("repulse",c)?this._hoverRepulse():o&&y("repulse",l)?this._clickRepulse():T("repulse",u,(d,p)=>this._singleSelectorRepulse(d,p))}isEnabled(e){const t=this.container,i=t.actualOptions,r=t.interactivity.mouse,s=((e==null?void 0:e.interactivity)??i.interactivity).events,n=s.onDiv,c=s.onHover,a=s.onClick,o=C("repulse",n);if(!(o||c.enable&&r.position||a.enable&&r.clickPosition))return!1;const l=c.mode,u=a.mode;return y("repulse",l)||y("repulse",u)||o}loadModeOptions(e,...t){e.repulse||(e.repulse=new H);for(const i of t)e.repulse.load(i==null?void 0:i.repulse)}reset(){}}async function W(v,e=!0){await v.addInteractor("externalRepulse",t=>new I(v,t),e)}export{W as l};
