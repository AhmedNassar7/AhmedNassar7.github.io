import{E as k,C as h,g as x,c as g,a as A,V as M,m as b,i as u}from"./tsparticles-engine.pEwhNYWv.js";class E{constructor(){this.distance=200,this.duration=.4,this.easing="ease-out-quad",this.factor=1,this.maxSpeed=50,this.speed=1}load(t){t&&(t.distance!==void 0&&(this.distance=t.distance),t.duration!==void 0&&(this.duration=t.duration),t.easing!==void 0&&(this.easing=t.easing),t.factor!==void 0&&(this.factor=t.factor),t.maxSpeed!==void 0&&(this.maxSpeed=t.maxSpeed),t.speed!==void 0&&(this.speed=t.speed))}}class _ extends k{constructor(t,i){super(i),this._clickAttract=()=>{const c=this.container;c.attract||(c.attract={particles:[]});const{attract:e}=c;if(e.finish||(e.count||(e.count=0),e.count++,e.count===c.particles.count&&(e.finish=!0)),e.clicking){const a=c.interactivity.mouse.clickPosition,s=c.retina.attractModeDistance;if(!s||s<0||!a)return;this._processAttract(a,s,new h(a.x,a.y,s))}else e.clicking===!1&&(e.particles=[])},this._hoverAttract=()=>{const c=this.container,e=c.interactivity.mouse.position,a=c.retina.attractModeDistance;!a||a<0||!e||this._processAttract(e,a,new h(e.x,e.y,a))},this._processAttract=(c,e,a)=>{const s=this.container,r=s.actualOptions.interactivity.modes.attract;if(!r)return;const d=s.particles.quadTree.query(a,l=>this.isEnabled(l));for(const l of d){const{dx:v,dy:m,distance:n}=x(l.position,c),f=r.speed*r.factor,p=g(A(r.easing)(1-n/e)*f,0,r.maxSpeed),y=M.create(n===0?f:v/n*p,n===0?f:m/n*p);l.position.subFrom(y)}},this._engine=t,i.attract||(i.attract={particles:[]}),this.handleClickMode=c=>{const e=this.container.actualOptions,a=e.interactivity.modes.attract;if(!(!a||c!=="attract")){i.attract||(i.attract={particles:[]}),i.attract.clicking=!0,i.attract.count=0;for(const s of i.attract.particles)this.isEnabled(s)&&s.velocity.setTo(s.initialVelocity);i.attract.particles=[],i.attract.finish=!1,setTimeout(()=>{i.destroyed||(i.attract||(i.attract={particles:[]}),i.attract.clicking=!1)},a.duration*1e3)}}}clear(){}init(){const t=this.container,i=t.actualOptions.interactivity.modes.attract;i&&(t.retina.attractModeDistance=i.distance*t.retina.pixelRatio)}async interact(){const t=this.container,i=t.actualOptions,c=t.interactivity.status===b,e=i.interactivity.events,a=e.onHover.enable,s=e.onHover.mode,r=e.onClick.enable,d=e.onClick.mode;c&&a&&u("attract",s)?this._hoverAttract():r&&u("attract",d)&&this._clickAttract()}isEnabled(t){const i=this.container,c=i.actualOptions,e=i.interactivity.mouse,a=(t?.interactivity??c.interactivity).events;if((!e.position||!a.onHover.enable)&&(!e.clickPosition||!a.onClick.enable))return!1;const s=a.onHover.mode,r=a.onClick.mode;return u("attract",s)||u("attract",r)}loadModeOptions(t,...i){t.attract||(t.attract=new E);for(const c of i)t.attract.load(c?.attract)}reset(){}}async function O(o,t=!0){await o.addInteractor("externalAttract",i=>new _(o,i),t)}export{O as l};
