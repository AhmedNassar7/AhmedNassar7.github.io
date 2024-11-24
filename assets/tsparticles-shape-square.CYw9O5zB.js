const d=Math.sqrt(2);class i{draw(e,c,s){const a=s/d,t=a*2;e.rect(-a,-a,t,t)}getSidesCount(){return 4}}async function n(r,e=!0){await r.addShape(["edge","square"],new i,e)}export{n as l};
