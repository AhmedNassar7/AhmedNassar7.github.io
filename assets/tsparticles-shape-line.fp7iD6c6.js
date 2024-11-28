class a{draw(a,e,n){const t=e.shapeData;a.moveTo(-n/2,0),a.lineTo(n/2,0),a.lineCap=t?.cap??"butt"}getSidesCount(){return 1}}async function e(e,n=!0){await e.addShape("line",new a,n)}export{e as l};
