import{S as r,p as k,D as m,q as v,T as y}from"./tsparticles-engine.pEwhNYWv.js";function a(s,t,n,i,e){if(!t||!n.enable||(t.maxLoops??0)>0&&(t.loops??0)>(t.maxLoops??0)||(t.time||(t.time=0),(t.delayTime??0)>0&&t.time<(t.delayTime??0)&&(t.time+=s.value),(t.delayTime??0)>0&&t.time<(t.delayTime??0)))return;const o=r(n.offset),f=(t.velocity??0)*s.factor+o*3.6,d=t.decay??1;!e||t.status==="increasing"?(t.value+=f,t.value>i&&(t.loops||(t.loops=0),t.loops++,e&&(t.status="decreasing",t.value-=t.value%i))):(t.value-=f,t.value<0&&(t.loops||(t.loops=0),t.loops++,t.status="increasing",t.value+=t.value)),t.velocity&&d!==1&&(t.velocity*=d),t.value>i&&(t.value%=i)}function p(s,t){if(!s.strokeColor||!s.strokeAnimation)return;const{h:n,s:i,l:e}=s.strokeColor,{h:o,s:f,l:d}=s.strokeAnimation;n&&a(t,n,o,360,!1),i&&a(t,i,f,100,!0),e&&a(t,e,d,100,!0)}class C{constructor(t){this.container=t}init(t){const n=this.container,i=t.options,e=k(i.stroke,t.id,i.reduceDuplicates);t.strokeWidth=m(e.width)*n.retina.pixelRatio,t.strokeOpacity=m(e.opacity??1),t.strokeAnimation=e.color?.animation;const o=v(e.color)??t.getFillColor();o&&(t.strokeColor=y(o,t.strokeAnimation,n.retina.reduceFactor))}isEnabled(t){const n=t.strokeAnimation,{strokeColor:i}=t;return!t.destroyed&&!t.spawning&&!!n&&(i?.h.value!==void 0&&i.h.enable||i?.s.value!==void 0&&i.s.enable||i?.l.value!==void 0&&i.l.enable)}update(t,n){this.isEnabled(t)&&p(t,n)}}async function h(s,t=!0){await s.addParticleUpdater("strokeColor",n=>new C(n),t)}export{h as l};
