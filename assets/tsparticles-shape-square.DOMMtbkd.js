const t=Math.sqrt(2);class a{draw(a,e,s){const n=s/t,r=2*n;a.rect(-n,-n,r,r)}getSidesCount(){return 4}}async function e(t,e=!0){await t.addShape(["edge","square"],new a,e)}export{e as l};
