import{w as g,u as p,x as f,y as k,E as v,i as M}from"./tsparticles-engine.pEwhNYWv.js";class m{constructor(){this.opacity=.5}load(n){n&&n.opacity!==void 0&&(this.opacity=n.opacity)}}class C{constructor(){this.distance=80,this.links=new m,this.radius=60}get lineLinked(){return this.links}set lineLinked(n){this.links=n}get line_linked(){return this.links}set line_linked(n){this.links=n}load(n){n&&(n.distance!==void 0&&(this.distance=n.distance),this.links.load(n.links??n.lineLinked??n.line_linked),n.radius!==void 0&&(this.radius=n.radius))}}function R(i,n,t,e){const o=Math.floor(t.getRadius()/n.getRadius()),s=n.getFillColor(),r=t.getFillColor();if(!s||!r)return;const c=n.getPosition(),l=t.getPosition(),d=p(s,r,n.getRadius(),t.getRadius()),a=i.createLinearGradient(c.x,c.y,l.x,l.y);return a.addColorStop(0,f(s,e)),a.addColorStop(o>1?1:o,k(d,e)),a.addColorStop(1,f(r,e)),a}function x(i,n,t,e,o){g(i,e,o),i.lineWidth=n,i.strokeStyle=t,i.stroke()}function b(i,n,t,e){const o=i.actualOptions,s=o.interactivity.modes.connect;if(s)return R(n,t,e,s.links.opacity)}function w(i,n,t){i.canvas.draw(e=>{const o=b(i,e,n,t);if(!o)return;const s=n.getPosition(),r=t.getPosition();x(e,n.retina.linksWidth??0,o,s,r)})}class P extends v{constructor(n){super(n)}clear(){}init(){const n=this.container,t=n.actualOptions.interactivity.modes.connect;t&&(n.retina.connectModeDistance=t.distance*n.retina.pixelRatio,n.retina.connectModeRadius=t.radius*n.retina.pixelRatio)}async interact(){const n=this.container;if(n.actualOptions.interactivity.events.onHover.enable&&n.interactivity.status==="pointermove"){const e=n.interactivity.mouse.position;if(!n.retina.connectModeDistance||n.retina.connectModeDistance<0||!n.retina.connectModeRadius||n.retina.connectModeRadius<0||!e)return;const o=Math.abs(n.retina.connectModeRadius),s=n.particles.quadTree.queryCircle(e,o,c=>this.isEnabled(c));let r=0;for(const c of s){const l=c.getPosition();for(const d of s.slice(r+1)){const a=d.getPosition(),u=Math.abs(n.retina.connectModeDistance),y=Math.abs(l.x-a.x),h=Math.abs(l.y-a.y);y<u&&h<u&&w(n,c,d)}++r}}}isEnabled(n){const t=this.container,e=t.interactivity.mouse,o=(n?.interactivity??t.actualOptions.interactivity).events;return o.onHover.enable&&e.position?M("connect",o.onHover.mode):!1}loadModeOptions(n,...t){n.connect||(n.connect=new C);for(const e of t)n.connect.load(e?.connect)}reset(){}}async function L(i,n=!0){await i.addInteractor("externalConnect",t=>new P(t),n)}export{L as l};
