import{p,i as y,k as g,Q as m}from"./tsparticles-engine-B56Pkamw.js";const e=["text","character","char"];class w{draw(n,t,i,s){const a=t.shapeData;if(a===void 0)return;const c=a.value;if(c===void 0)return;t.text===void 0&&(t.text=p(c,t.randomIndexData));const r=t.text,d=a.style??"",h=a.weight??"400",f=2*Math.round(i),x=a.font??"Verdana",u=t.fill,v=r.length*i/2;n.font=`${d} ${h} ${f}px "${x}"`;const o={x:-v,y:i/2};n.globalAlpha=s,u?n.fillText(r,o.x,o.y):n.strokeText(r,o.x,o.y),n.globalAlpha=1}getSidesCount(){return 12}async init(n){const t=n.actualOptions;if(e.find(i=>y(i,t.particles.shape.type))){const i=e.map(a=>t.particles.shape.options[a]).find(a=>!!a),s=[];g(i,a=>{s.push(m(a.font,a.weight))}),await Promise.all(s)}}particleInit(n,t){if(!t.shape||!e.includes(t.shape))return;const i=t.shapeData;if(i===void 0)return;const s=i.value;s!==void 0&&(t.text=p(s,t.randomIndexData))}}async function $(l,n=!0){await l.addShape(e,new w,n)}export{$ as l};
