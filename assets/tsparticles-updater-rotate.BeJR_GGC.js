import{B as t,U as e,D as a,I as o}from"./tsparticles-engine.CajW4cSt.js";class i{constructor(){this.enable=!1,this.speed=0,this.decay=0,this.sync=!1}load(e){e&&(void 0!==e.enable&&(this.enable=e.enable),void 0!==e.speed&&(this.speed=t(e.speed)),void 0!==e.decay&&(this.decay=t(e.decay)),void 0!==e.sync&&(this.sync=e.sync))}}class n extends e{constructor(){super(),this.animation=new i,this.direction="clockwise",this.path=!1,this.value=0}load(t){t&&(super.load(t),void 0!==t.direction&&(this.direction=t.direction),this.animation.load(t.animation),void 0!==t.path&&(this.path=t.path))}}class s{constructor(t){this.container=t}init(t){const e=t.options.rotate;if(!e)return;t.rotate={enable:e.animation.enable,value:a(e.value)*Math.PI/180},t.pathRotation=e.path;let i=e.direction;if("random"===i){i=Math.floor(2*o())>0?"counter-clockwise":"clockwise"}switch(i){case"counter-clockwise":case"counterClockwise":t.rotate.status="decreasing";break;case"clockwise":t.rotate.status="increasing"}const n=e.animation;n.enable&&(t.rotate.decay=1-a(n.decay),t.rotate.velocity=a(n.speed)/360*this.container.retina.reduceFactor,n.sync||(t.rotate.velocity*=o())),t.rotation=t.rotate.value}isEnabled(t){const e=t.options.rotate;return!!e&&(!t.destroyed&&!t.spawning&&e.animation.enable&&!e.path)}loadOptions(t,...e){t.rotate||(t.rotate=new n);for(const a of e)t.rotate.load(a?.rotate)}update(t,e){this.isEnabled(t)&&(!function(t,e){const a=t.rotate,o=t.options.rotate;if(!a||!o)return;const i=o.animation,n=(a.velocity??0)*e.factor,s=2*Math.PI,c=a.decay??1;i.enable&&("increasing"===a.status?(a.value+=n,a.value>s&&(a.value-=s)):(a.value-=n,a.value<0&&(a.value+=s)),a.velocity&&1!==c&&(a.velocity*=c))}(t,e),t.rotation=t.rotate?.value??0)}}async function c(t,e=!0){await t.addParticleUpdater("rotate",(t=>new s(t)),e)}export{c as l};
