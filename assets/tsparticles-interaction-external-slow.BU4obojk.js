import{E as t,i as o,l as i}from"./tsparticles-engine.CajW4cSt.js";class s{constructor(){this.factor=3,this.radius=200}load(t){t&&(void 0!==t.factor&&(this.factor=t.factor),void 0!==t.radius&&(this.radius=t.radius))}}class a extends t{constructor(t){super(t)}clear(t,o,i){t.slow.inRange&&!i||(t.slow.factor=1)}init(){const t=this.container,o=t.actualOptions.interactivity.modes.slow;o&&(t.retina.slowModeRadius=o.radius*t.retina.pixelRatio)}async interact(){}isEnabled(t){const i=this.container,s=i.interactivity.mouse,a=(t?.interactivity??i.actualOptions.interactivity).events;return a.onHover.enable&&!!s.position&&o("slow",a.onHover.mode)}loadModeOptions(t,...o){t.slow||(t.slow=new s);for(const i of o)t.slow.load(i?.slow)}reset(t){t.slow.inRange=!1;const o=this.container,s=o.actualOptions,a=o.interactivity.mouse.position,n=o.retina.slowModeRadius,e=s.interactivity.modes.slow;if(!e||!n||n<0||!a)return;const r=t.getPosition(),c=i(a,r),l=c/n,d=e.factor,{slow:u}=t;c>n||(u.inRange=!0,u.factor=l/d)}}async function n(t,o=!0){await t.addInteractor("externalSlow",(t=>new a(t)),o)}export{n as l};
