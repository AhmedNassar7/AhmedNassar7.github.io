import{O as v,w as g,y,E as f,m,l as w,z as L,A as O,i as x}from"./tsparticles-engine-B56Pkamw.js";class C{constructor(){this.blink=!1,this.consent=!1,this.opacity=1}load(i){i&&(i.blink!==void 0&&(this.blink=i.blink),i.color!==void 0&&(this.color=v.create(this.color,i.color)),i.consent!==void 0&&(this.consent=i.consent),i.opacity!==void 0&&(this.opacity=i.opacity))}}class E{constructor(){this.distance=100,this.links=new C}get lineLinked(){return this.links}set lineLinked(i){this.links=i}get line_linked(){return this.links}set line_linked(i){this.links=i}load(i){i&&(i.distance!==void 0&&(this.distance=i.distance),this.links.load(i.links??i.lineLinked??i.line_linked))}}function H(o,i,n,t,e){o.canvas.draw(k=>{const a=i.getPosition();(function(s,b,r,c,l,d){g(s,r,c),s.strokeStyle=y(l,d),s.lineWidth=b,s.stroke()})(k,i.retina.linksWidth??0,a,e,n,t)})}class M extends f{constructor(i){super(i)}clear(){}init(){const i=this.container,n=i.actualOptions.interactivity.modes.grab;n&&(i.retina.grabModeDistance=n.distance*i.retina.pixelRatio)}async interact(){var a;const i=this.container,n=i.actualOptions.interactivity;if(!n.modes.grab||!n.events.onHover.enable||i.interactivity.status!==m)return;const t=i.interactivity.mouse.position;if(!t)return;const e=i.retina.grabModeDistance;if(!e||e<0)return;const k=i.particles.quadTree.queryCircle(t,e,s=>this.isEnabled(s));for(const s of k){const b=s.getPosition(),r=w(b,t);if(r>e)continue;const c=n.modes.grab.links,l=c.opacity,d=l-r*l/e;if(d<=0)continue;const u=c.color??((a=s.options.links)==null?void 0:a.color);if(!i.particles.grabLineColor&&u){const p=n.modes.grab.links;i.particles.grabLineColor=L(u,p.blink,p.consent)}const h=O(s,void 0,i.particles.grabLineColor);h&&H(i,s,h,d,t)}}isEnabled(i){const n=this.container,t=n.interactivity.mouse,e=((i==null?void 0:i.interactivity)??n.actualOptions.interactivity).events;return e.onHover.enable&&!!t.position&&x("grab",e.onHover.mode)}loadModeOptions(i,...n){i.grab||(i.grab=new E);for(const t of n)i.grab.load(t==null?void 0:t.grab)}reset(){}}async function q(o,i=!0){await o.addInteractor("externalGrab",n=>new M(n),i)}export{q as l};