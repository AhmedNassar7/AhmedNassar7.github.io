import{k as x,E as T,C as g,g as k,V as _,c as b,a as O,R as S,v as q,m as E,i as y,f as M,h as D}from"./tsparticles-engine-B56Pkamw.js";class w{constructor(){this.distance=200,this.duration=.4,this.factor=100,this.speed=1,this.maxSpeed=50,this.easing="ease-out-quad"}load(e){e&&(e.distance!==void 0&&(this.distance=e.distance),e.duration!==void 0&&(this.duration=e.duration),e.easing!==void 0&&(this.easing=e.easing),e.factor!==void 0&&(this.factor=e.factor),e.speed!==void 0&&(this.speed=e.speed),e.maxSpeed!==void 0&&(this.maxSpeed=e.maxSpeed))}}class C extends w{constructor(){super(),this.selectors=[]}get ids(){return x(this.selectors,e=>e.replace("#",""))}set ids(e){this.selectors=x(e,i=>`#${i}`)}load(e){super.load(e),e&&(e.ids!==void 0&&(this.ids=e.ids),e.selectors!==void 0&&(this.selectors=e.selectors))}}class H extends w{load(e){super.load(e),e&&(this.divs=x(e.divs,i=>{const s=new C;return s.load(i),s}))}}class V extends T{constructor(e,i){super(i),this._clickRepulse=()=>{const s=this.container,n=s.actualOptions.interactivity.modes.repulse;if(!n)return;const t=s.repulse||{particles:[]};if(t.finish||(t.count||(t.count=0),t.count++,t.count===s.particles.count&&(t.finish=!0)),t.clicking){const c=s.retina.repulseModeDistance;if(!c||c<0)return;const l=Math.pow(c/6,3),p=s.interactivity.mouse.clickPosition;if(p===void 0)return;const o=new g(p.x,p.y,l),a=s.particles.quadTree.query(o,r=>this.isEnabled(r));for(const r of a){const{dx:u,dy:d,distance:h}=k(p,r.position),f=h**2,m=-l*n.speed/f;if(f<=l){t.particles.push(r);const R=_.create(u,d);R.length=m,r.velocity.setTo(R)}}}else if(t.clicking===!1){for(const c of t.particles)c.velocity.setTo(c.initialVelocity);t.particles=[]}},this._hoverRepulse=()=>{const s=this.container,n=s.interactivity.mouse.position,t=s.retina.repulseModeDistance;!t||t<0||!n||this._processRepulse(n,t,new g(n.x,n.y,t))},this._processRepulse=(s,n,t,c)=>{const l=this.container,p=l.particles.quadTree.query(t,a=>this.isEnabled(a)),o=l.actualOptions.interactivity.modes.repulse;if(o)for(const a of p){const{dx:r,dy:u,distance:d}=k(a.position,s),h=((c==null?void 0:c.speed)??o.speed)*o.factor,f=b(O(o.easing)(1-d/n)*h,0,o.maxSpeed),m=_.create(d===0?h:r/d*f,d===0?h:u/d*f);a.position.addTo(m)}},this._singleSelectorRepulse=(s,n)=>{const t=this.container,c=t.actualOptions.interactivity.modes.repulse;if(!c)return;const l=document.querySelectorAll(s);l.length&&l.forEach(p=>{const o=p,a=t.retina.pixelRatio,r={x:(o.offsetLeft+o.offsetWidth/2)*a,y:(o.offsetTop+o.offsetHeight/2)*a},u=o.offsetWidth/2*a,d=n.type==="circle"?new g(r.x,r.y,u):new S(o.offsetLeft*a,o.offsetTop*a,o.offsetWidth*a,o.offsetHeight*a),h=c.divs,f=q(h,o);this._processRepulse(r,u,d,f)})},this._engine=e,i.repulse||(i.repulse={particles:[]}),this.handleClickMode=s=>{const n=this.container.actualOptions.interactivity.modes.repulse;if(!n||s!=="repulse")return;i.repulse||(i.repulse={particles:[]});const t=i.repulse;t.clicking=!0,t.count=0;for(const c of i.repulse.particles)this.isEnabled(c)&&c.velocity.setTo(c.initialVelocity);t.particles=[],t.finish=!1,setTimeout(()=>{i.destroyed||(t.clicking=!1)},1e3*n.duration)}}clear(){}init(){const e=this.container,i=e.actualOptions.interactivity.modes.repulse;i&&(e.retina.repulseModeDistance=i.distance*e.retina.pixelRatio)}async interact(){const e=this.container,i=e.actualOptions,s=e.interactivity.status===E,n=i.interactivity.events,t=n.onHover,c=t.enable,l=t.mode,p=n.onClick,o=p.enable,a=p.mode,r=n.onDiv;s&&c&&y("repulse",l)?this._hoverRepulse():o&&y("repulse",a)?this._clickRepulse():M("repulse",r,(u,d)=>this._singleSelectorRepulse(u,d))}isEnabled(e){const i=this.container,s=i.actualOptions,n=i.interactivity.mouse,t=((e==null?void 0:e.interactivity)??s.interactivity).events,c=t.onDiv,l=t.onHover,p=t.onClick,o=D("repulse",c);if(!(o||l.enable&&n.position||p.enable&&n.clickPosition))return!1;const a=l.mode,r=p.mode;return y("repulse",a)||y("repulse",r)||o}loadModeOptions(e,...i){e.repulse||(e.repulse=new H);for(const s of i)e.repulse.load(s==null?void 0:s.repulse)}reset(){}}async function L(v,e=!0){await v.addInteractor("externalRepulse",i=>new V(v,i),e)}export{L as l};
