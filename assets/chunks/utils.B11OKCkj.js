const t=e=>["object","symbol"].includes(typeof e)?e instanceof Set?new Set(Array.from(e).map(r=>t(r))):typeof e=="symbol"?e:JSON.parse(JSON.stringify(e)):e;export{t as d};
