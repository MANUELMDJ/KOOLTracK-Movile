let vehicles=JSON.parse(localStorage.getItem("koolTrackVehicles")||"[]");
const $=id=>document.getElementById(id);

function openForm(){$("form").classList.remove("hidden");$("list").classList.add("hidden");scrollTo({top:document.body.scrollHeight,behavior:"smooth"})}
function closeForm(){$("form").classList.add("hidden")}
function showList(){$("list").classList.remove("hidden");$("form").classList.add("hidden");render()}

function save(){
 const v={id:Date.now(),client:$("client").value.trim(),phone:$("phone").value.trim(),brand:$("brand").value.trim(),model:$("model").value.trim(),year:$("year").value.trim(),plate:$("plate").value.trim(),job:$("job").value.trim(),date:new Date().toLocaleDateString("es-HN")};
 if(!v.client||!v.brand||!v.model){alert("Completa cliente, marca y modelo.");return}
 vehicles.push(v);localStorage.setItem("koolTrackVehicles",JSON.stringify(vehicles));
 ["client","phone","brand","model","year","plate","job"].forEach(id=>$(id).value="");
 update();render();$("form").classList.add("hidden");$("list").classList.remove("hidden");alert("Vehículo guardado.");
}
function render(){
 const box=$("vehicles");
 if(!vehicles.length){box.innerHTML="<p style='text-align:center;color:#777'>No hay vehículos registrados.</p>";return}
 box.innerHTML=vehicles.map(v=>`<article class="vehicle"><h4>🚗 ${v.brand} ${v.model} ${v.year||""}</h4><p><b>Cliente:</b> ${v.client}</p><p><b>Teléfono:</b> ${v.phone||"No registrado"}</p><p><b>Placa:</b> ${v.plate||"No registrada"}</p><p><b>Fecha:</b> ${v.date}</p><div class="job"><b>Trabajo:</b><br>${v.job||"Sin descripción"}</div></article>`).join("");
}
function update(){$("count").textContent=vehicles.length;$("jobs").textContent=vehicles.filter(v=>v.job).length}
update();render();

if("serviceWorker" in navigator){window.addEventListener("load",()=>navigator.serviceWorker.register("sw.js").catch(()=>{}));}