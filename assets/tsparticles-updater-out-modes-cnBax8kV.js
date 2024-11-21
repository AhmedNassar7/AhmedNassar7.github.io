import{X as M,e as w,g,Y as z,V as v,I as m,S as b}from"./tsparticles-engine-B56Pkamw.js";class C{constructor(o){this.container=o,this.modes=["bounce","bounce-vertical","bounce-horizontal","bounceVertical","bounceHorizontal","split"]}update(o,t,r,d){if(!this.modes.includes(d))return;const a=this.container;let i=!1;for(const[,e]of a.plugins)if(e.particleBounce!==void 0&&(i=e.particleBounce(o,r,t)),i)break;if(i)return;const s=o.getPosition(),n=o.offset,c=o.getRadius(),u=w(s,c),y=a.canvas.size;(function(e){if(e.outMode!=="bounce"&&e.outMode!=="bounce-horizontal"&&e.outMode!=="bounceHorizontal"&&e.outMode!=="split"||e.direction!=="left"&&e.direction!=="right")return;e.bounds.right<0&&e.direction==="left"?e.particle.position.x=e.size+e.offset.x:e.bounds.left>e.canvasSize.width&&e.direction==="right"&&(e.particle.position.x=e.canvasSize.width-e.size-e.offset.x);const l=e.particle.velocity.x;let h=!1;if(e.direction==="right"&&e.bounds.right>=e.canvasSize.width&&l>0||e.direction==="left"&&e.bounds.left<=0&&l<0){const x=M(e.particle.options.bounce.horizontal);e.particle.velocity.x*=-x,h=!0}if(!h)return;const f=e.offset.x+e.size;e.bounds.right>=e.canvasSize.width&&e.direction==="right"?e.particle.position.x=e.canvasSize.width-f:e.bounds.left<=0&&e.direction==="left"&&(e.particle.position.x=f),e.outMode==="split"&&e.particle.destroy()})({particle:o,outMode:d,direction:t,bounds:u,canvasSize:y,offset:n,size:c}),function(e){if(e.outMode!=="bounce"&&e.outMode!=="bounce-vertical"&&e.outMode!=="bounceVertical"&&e.outMode!=="split"||e.direction!=="bottom"&&e.direction!=="top")return;e.bounds.bottom<0&&e.direction==="top"?e.particle.position.y=e.size+e.offset.y:e.bounds.top>e.canvasSize.height&&e.direction==="bottom"&&(e.particle.position.y=e.canvasSize.height-e.size-e.offset.y);const l=e.particle.velocity.y;let h=!1;if(e.direction==="bottom"&&e.bounds.bottom>=e.canvasSize.height&&l>0||e.direction==="top"&&e.bounds.top<=0&&l<0){const x=M(e.particle.options.bounce.vertical);e.particle.velocity.y*=-x,h=!0}if(!h)return;const f=e.offset.y+e.size;e.bounds.bottom>=e.canvasSize.height&&e.direction==="bottom"?e.particle.position.y=e.canvasSize.height-f:e.bounds.top<=0&&e.direction==="top"&&(e.particle.position.y=f),e.outMode==="split"&&e.particle.destroy()}({particle:o,outMode:d,direction:t,bounds:u,canvasSize:y,offset:n,size:c})}}class S{constructor(o){this.container=o,this.modes=["destroy"]}update(o,t,r,d){if(!this.modes.includes(d))return;const a=this.container;switch(o.outType){case"normal":case"outside":if(z(o.position,a.canvas.size,v.origin,o.getRadius(),t))return;break;case"inside":{const{dx:i,dy:s}=g(o.position,o.moveCenter),{x:n,y:c}=o.velocity;if(n<0&&i>o.moveCenter.radius||c<0&&s>o.moveCenter.radius||n>=0&&i<-o.moveCenter.radius||c>=0&&s<-o.moveCenter.radius)return;break}}a.particles.remove(o,void 0,!0)}}class P{constructor(o){this.container=o,this.modes=["none"]}update(o,t,r,d){if(!this.modes.includes(d)||o.options.move.distance.horizontal&&(t==="left"||t==="right")||o.options.move.distance.vertical&&(t==="top"||t==="bottom"))return;const a=o.options.move.gravity,i=this.container,s=i.canvas.size,n=o.getRadius();if(a.enable){const c=o.position;(!a.inverse&&c.y>s.height+n&&t==="bottom"||a.inverse&&c.y<-n&&t==="top")&&i.particles.remove(o)}else{if(o.velocity.y>0&&o.position.y<=s.height+n||o.velocity.y<0&&o.position.y>=-n||o.velocity.x>0&&o.position.x<=s.width+n||o.velocity.x<0&&o.position.x>=-n)return;z(o.position,i.canvas.size,v.origin,n,t)||i.particles.remove(o)}}}class R{constructor(o){this.container=o,this.modes=["out"]}update(o,t,r,d){if(!this.modes.includes(d))return;const a=this.container;switch(o.outType){case"inside":{const{x:i,y:s}=o.velocity,n=v.origin;n.length=o.moveCenter.radius,n.angle=o.velocity.angle+Math.PI,n.addTo(v.create(o.moveCenter));const{dx:c,dy:u}=g(o.position,n);if(i<=0&&c>=0||s<=0&&u>=0||i>=0&&c<=0||s>=0&&u<=0)return;o.position.x=Math.floor(b({min:0,max:a.canvas.size.width})),o.position.y=Math.floor(b({min:0,max:a.canvas.size.height}));const{dx:y,dy:e}=g(o.position,o.moveCenter);o.direction=Math.atan2(-e,-y),o.velocity.angle=o.direction;break}default:if(z(o.position,a.canvas.size,v.origin,o.getRadius(),t))return;switch(o.outType){case"outside":{o.position.x=Math.floor(b({min:-o.moveCenter.radius,max:o.moveCenter.radius}))+o.moveCenter.x,o.position.y=Math.floor(b({min:-o.moveCenter.radius,max:o.moveCenter.radius}))+o.moveCenter.y;const{dx:i,dy:s}=g(o.position,o.moveCenter);o.moveCenter.radius&&(o.direction=Math.atan2(s,i),o.velocity.angle=o.direction);break}case"normal":{const i=o.options.move.warp,s=a.canvas.size,n={bottom:s.height+o.getRadius()+o.offset.y,left:-o.getRadius()-o.offset.x,right:s.width+o.getRadius()+o.offset.x,top:-o.getRadius()-o.offset.y},c=o.getRadius(),u=w(o.position,c);t==="right"&&u.left>s.width+o.offset.x?(o.position.x=n.left,o.initialPosition.x=o.position.x,i||(o.position.y=m()*s.height,o.initialPosition.y=o.position.y)):t==="left"&&u.right<-o.offset.x&&(o.position.x=n.right,o.initialPosition.x=o.position.x,i||(o.position.y=m()*s.height,o.initialPosition.y=o.position.y)),t==="bottom"&&u.top>s.height+o.offset.y?(i||(o.position.x=m()*s.width,o.initialPosition.x=o.position.x),o.position.y=n.top,o.initialPosition.y=o.position.y):t==="top"&&u.bottom<-o.offset.y&&(i||(o.position.x=m()*s.width,o.initialPosition.x=o.position.x),o.position.y=n.bottom,o.initialPosition.y=o.position.y);break}}}}}class k{constructor(o){this.container=o,this._updateOutMode=(t,r,d,a)=>{for(const i of this.updaters)i.update(t,a,r,d)},this.updaters=[new C(o),new S(o),new R(o),new P(o)]}init(){}isEnabled(o){return!o.destroyed&&!o.spawning}update(o,t){const r=o.options.move.outModes;this._updateOutMode(o,t,r.bottom??r.default,"bottom"),this._updateOutMode(o,t,r.left??r.default,"left"),this._updateOutMode(o,t,r.right??r.default,"right"),this._updateOutMode(o,t,r.top??r.default,"top")}}async function _(p,o=!0){await p.addParticleUpdater("outModes",t=>new k(t),o)}export{_ as l};