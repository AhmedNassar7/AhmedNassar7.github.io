const r=Math.sqrt(2);class c{draw(e,d,s){const t=s/r,n=2*t;e.rect(-t,-t,n,n)}getSidesCount(){return 4}}async function o(a,e=!0){await a.addShape(["edge","square"],new c,e)}export{o as l};
