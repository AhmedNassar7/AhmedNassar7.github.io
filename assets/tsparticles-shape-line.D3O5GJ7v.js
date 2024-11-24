class p{draw(a,t,n){const i=t.shapeData;a.moveTo(-n/2,0),a.lineTo(n/2,0),a.lineCap=i?.cap??"butt"}getSidesCount(){return 1}}async function s(e,a=!0){await e.addShape("line",new p,a)}export{s as l};
