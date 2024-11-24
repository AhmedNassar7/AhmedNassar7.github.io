import{j as M,k as O,O as E,c as z,E as _,l as C,n as y,m as k,o as R,p as D,q as S,s as j,u as q,C as H,R as P,v as T,i as m,f as w,h as I}from"./tsparticles-engine.pEwhNYWv.js";class B{constructor(){this.distance=200,this.duration=.4,this.mix=!1}load(i){if(i){if(i.distance!==void 0&&(this.distance=i.distance),i.duration!==void 0&&(this.duration=i.duration),i.mix!==void 0&&(this.mix=i.mix),i.opacity!==void 0&&(this.opacity=i.opacity),i.color!==void 0){const e=M(this.color)?void 0:this.color;this.color=O(i.color,b=>E.create(e,b))}i.size!==void 0&&(this.size=i.size)}}}class A extends B{constructor(){super(),this.selectors=[]}get ids(){return O(this.selectors,i=>i.replace("#",""))}set ids(i){this.selectors=O(i,e=>`#${e}`)}load(i){super.load(i),i&&(i.ids!==void 0&&(this.ids=i.ids),i.selectors!==void 0&&(this.selectors=i.selectors))}}class L extends B{load(i){super.load(i),i&&(this.divs=O(i.divs,e=>{const b=new A;return b.load(e),b}))}}function x(d,i,e,b){if(i>=e){const s=d+(i-e)*b;return z(s,d,i)}else if(i<e){const s=d-(e-i)*b;return z(s,i,d)}}class W extends _{constructor(i){super(i),this._clickBubble=()=>{const e=this.container,b=e.actualOptions,s=e.interactivity.mouse.clickPosition,n=b.interactivity.modes.bubble;if(!n||!s)return;e.bubble||(e.bubble={});const o=e.retina.bubbleModeDistance;if(!o||o<0)return;const l=e.particles.quadTree.queryCircle(s,o,t=>this.isEnabled(t)),{bubble:u}=e;for(const t of l){if(!u.clicking)continue;t.bubble.inRange=!u.durationEnd;const c=t.getPosition(),a=C(c,s),f=(new Date().getTime()-(e.interactivity.mouse.clickTime||0))/1e3;f>n.duration&&(u.durationEnd=!0),f>n.duration*2&&(u.clicking=!1,u.durationEnd=!1);const p={bubbleObj:{optValue:e.retina.bubbleModeSize,value:t.bubble.radius},particlesObj:{optValue:y(t.options.size.value)*e.retina.pixelRatio,value:t.size.value},type:"size"};this._process(t,a,f,p);const h={bubbleObj:{optValue:n.opacity,value:t.bubble.opacity},particlesObj:{optValue:y(t.options.opacity.value),value:t.opacity?.value??1},type:"opacity"};this._process(t,a,f,h),!u.durationEnd&&a<=o?this._hoverBubbleColor(t,a):delete t.bubble.color}},this._hoverBubble=()=>{const e=this.container,b=e.interactivity.mouse.position,s=e.retina.bubbleModeDistance;if(!s||s<0||b===void 0)return;const n=e.particles.quadTree.queryCircle(b,s,o=>this.isEnabled(o));for(const o of n){o.bubble.inRange=!0;const l=o.getPosition(),u=C(l,b),t=1-u/s;u<=s?t>=0&&e.interactivity.status===k&&(this._hoverBubbleSize(o,t),this._hoverBubbleOpacity(o,t),this._hoverBubbleColor(o,t)):this.reset(o),e.interactivity.status===R&&this.reset(o)}},this._hoverBubbleColor=(e,b,s)=>{const n=this.container.actualOptions,o=s??n.interactivity.modes.bubble;if(o){if(!e.bubble.finalColor){const l=o.color;if(!l)return;const u=D(l);e.bubble.finalColor=S(u)}if(e.bubble.finalColor)if(o.mix){e.bubble.color=void 0;const l=e.getFillColor();e.bubble.color=l?j(q(l,e.bubble.finalColor,1-b,b)):e.bubble.finalColor}else e.bubble.color=e.bubble.finalColor}},this._hoverBubbleOpacity=(e,b,s)=>{const n=this.container,o=n.actualOptions,l=s?.opacity??o.interactivity.modes.bubble?.opacity;if(!l)return;const u=e.options.opacity.value,t=e.opacity?.value??1,c=x(t,l,y(u),b);c!==void 0&&(e.bubble.opacity=c)},this._hoverBubbleSize=(e,b,s)=>{const n=this.container,o=s?.size?s.size*n.retina.pixelRatio:n.retina.bubbleModeSize;if(o===void 0)return;const l=y(e.options.size.value)*n.retina.pixelRatio,u=e.size.value,t=x(u,o,l,b);t!==void 0&&(e.bubble.radius=t)},this._process=(e,b,s,n)=>{const o=this.container,l=n.bubbleObj.optValue,u=o.actualOptions,t=u.interactivity.modes.bubble;if(!t||l===void 0)return;const c=t.duration,a=o.retina.bubbleModeDistance,f=n.particlesObj.optValue,p=n.bubbleObj.value,h=n.particlesObj.value||0,r=n.type;if(!(!a||a<0||l===f))if(o.bubble||(o.bubble={}),o.bubble.durationEnd)p&&(r==="size"&&delete e.bubble.radius,r==="opacity"&&delete e.bubble.opacity);else if(b<=a){if((p??h)!==l){const v=h-s*(h-l)/c;r==="size"&&(e.bubble.radius=v),r==="opacity"&&(e.bubble.opacity=v)}}else r==="size"&&delete e.bubble.radius,r==="opacity"&&delete e.bubble.opacity},this._singleSelectorHover=(e,b,s)=>{const n=this.container,o=document.querySelectorAll(b),l=n.actualOptions.interactivity.modes.bubble;!l||!o.length||o.forEach(u=>{const t=u,c=n.retina.pixelRatio,a={x:(t.offsetLeft+t.offsetWidth/2)*c,y:(t.offsetTop+t.offsetHeight/2)*c},f=t.offsetWidth/2*c,p=s.type==="circle"?new H(a.x,a.y,f):new P(t.offsetLeft*c,t.offsetTop*c,t.offsetWidth*c,t.offsetHeight*c),h=n.particles.quadTree.query(p,r=>this.isEnabled(r));for(const r of h){if(!p.contains(r.getPosition()))continue;r.bubble.inRange=!0;const g=l.divs,v=T(g,t);(!r.bubble.div||r.bubble.div!==t)&&(this.clear(r,e,!0),r.bubble.div=t),this._hoverBubbleSize(r,1,v),this._hoverBubbleOpacity(r,1,v),this._hoverBubbleColor(r,1,v)}})},i.bubble||(i.bubble={}),this.handleClickMode=e=>{e==="bubble"&&(i.bubble||(i.bubble={}),i.bubble.clicking=!0)}}clear(i,e,b){i.bubble.inRange&&!b||(delete i.bubble.div,delete i.bubble.opacity,delete i.bubble.radius,delete i.bubble.color)}init(){const i=this.container,e=i.actualOptions.interactivity.modes.bubble;e&&(i.retina.bubbleModeDistance=e.distance*i.retina.pixelRatio,e.size!==void 0&&(i.retina.bubbleModeSize=e.size*i.retina.pixelRatio))}async interact(i){const e=this.container.actualOptions,b=e.interactivity.events,s=b.onHover,n=b.onClick,o=s.enable,l=s.mode,u=n.enable,t=n.mode,c=b.onDiv;o&&m("bubble",l)?this._hoverBubble():u&&m("bubble",t)?this._clickBubble():w("bubble",c,(a,f)=>this._singleSelectorHover(i,a,f))}isEnabled(i){const e=this.container,b=e.actualOptions,s=e.interactivity.mouse,n=(i?.interactivity??b.interactivity).events,{onClick:o,onDiv:l,onHover:u}=n,t=I("bubble",l);return t||u.enable&&s.position||o.enable&&s.clickPosition?m("bubble",u.mode)||m("bubble",o.mode)||t:!1}loadModeOptions(i,...e){i.bubble||(i.bubble=new L);for(const b of e)i.bubble.load(b?.bubble)}reset(i){i.bubble.inRange=!1}}async function $(d,i=!0){await d.addInteractor("externalBubble",e=>new W(e),i)}export{$ as l};
