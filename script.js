const ICONOS={
 con:'<path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z"/><path d="M12 12l8-4.5M12 12v9M12 12L4 7.5"/>',
 cnx:'<circle cx="5" cy="6" r="2.2"/><circle cx="19" cy="6" r="2.2"/><circle cx="12" cy="19" r="2.2"/><circle cx="12" cy="11" r="2.2"/><path d="M6.8 7.2l3.5 2.6M17.2 7.2l-3.5 2.6M12 13.2v3.6"/>',
 sit:'<path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0113 0c0 5-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.4"/>',
 tra:'<path d="M4 12a8 8 0 0113.7-5.6L20 8"/><path d="M20 3v5h-5"/><path d="M20 12a8 8 0 01-13.7 5.6L4 16"/><path d="M4 21v-5h5"/>',
 cmp:'<rect x="3" y="4" width="5" height="16" rx="1.5"/><rect x="9.5" y="4" width="5" height="16" rx="1.5"/><rect x="16" y="4" width="5" height="16" rx="1.5"/>'
};
const ASPECTOS=[
 {k:"principios",t:"Principios fundamentales"},
 {k:"roles",t:"Rol del docente y del estudiante"},
 {k:"digital",t:"Aplicación en entornos digitales"}
];
const TEORIAS=[
 {id:"con",nombre:"Constructivismo",autores:"Referentes: Piaget, Vygotsky, Ausubel",
  idea:"El conocimiento no se recibe: cada persona lo construye a partir de lo que ya sabe y de la interacción con otros.",
  principios:["El aprendizaje es una construcción activa del estudiante.","Se apoya en los conocimientos previos (aprendizaje significativo).","La interacción social impulsa el desarrollo: zona de desarrollo próximo."],
  roles:["Docente: mediador que diseña retos y ofrece andamiaje.","Estudiante: protagonista que explora, pregunta y construye sentido."],
  digital:["Simulaciones y laboratorios virtuales.","Documentos y wikis colaborativos.","Foros de discusión y aprendizaje basado en problemas en plataformas como Moodle."]},
 {id:"cnx",nombre:"Conectivismo",autores:"Referentes: George Siemens, Stephen Downes",
  idea:"Aprender es crear y recorrer conexiones entre personas, información y herramientas, en una red que se actualiza todo el tiempo.",
  principios:["El conocimiento está distribuido en una red de nodos.","Saber dónde y cómo encontrar información pesa más que memorizarla.","Mantener las conexiones vivas permite aprender de forma continua."],
  roles:["Docente: curador y facilitador de redes; modela cómo filtrar información.","Estudiante: nodo activo que busca, conecta, crea y comparte."],
  digital:["Cursos abiertos (MOOC) y comunidades en línea.","Blogs, redes sociales y entornos personales de aprendizaje.","Curaduría de recursos con marcadores y tableros compartidos."]},
 {id:"sit",nombre:"Aprendizaje situado",autores:"Referentes: Lave y Wenger, Brown, Collins y Duguid",
  idea:"Se aprende participando en actividades reales, dentro de una comunidad de práctica y en un contexto con sentido.",
  principios:["El conocimiento está ligado al contexto donde se usa.","Se aprende participando en comunidades de práctica.","Las tareas auténticas acercan el aula a la vida real."],
  roles:["Docente: experto que guía y propone situaciones auténticas.","Estudiante: aprendiz que pasa de participar en lo básico a asumir tareas completas."],
  digital:["Estudios de caso reales y proyectos con comunidades.","Simuladores y mundos virtuales de práctica profesional.","Portafolios digitales que documentan el proceso."]},
 {id:"tra",nombre:"Aprendizaje transformativo",autores:"Referente: Jack Mezirow",
  idea:"Aprender de verdad es cambiar la forma en que interpretamos el mundo: se revisan los supuestos propios y se actúa desde una perspectiva nueva.",
  principios:["El aprendizaje transforma los marcos de referencia con que damos sentido a la experiencia.","Parte de un dilema desorientador que invita a la reflexión crítica.","Se consolida con el diálogo racional con otros y la acción desde la nueva perspectiva."],
  roles:["Docente: facilitador que crea un ambiente seguro y provoca la reflexión crítica.","Estudiante: cuestiona sus propios supuestos, dialoga con otras miradas y actúa sobre lo aprendido."],
  digital:["Diarios reflexivos y blogs personales.","Debates en foros con perspectivas diversas.","Narrativas digitales y proyectos de ciudadanía digital."]}
];
let activa=0,modo="una";
const $=id=>document.getElementById(id);
const lista=(a,c)=>"<ul"+(c?" class='"+c+"'":"")+">"+a.map(x=>"<li>"+x+"</li>").join("")+"</ul>";
function pintarDock(){
 const d=$("dock");d.innerHTML="";
 const items=TEORIAS.map((t,i)=>({id:t.id,txt:t.nombre,on:modo==="una"&&i===activa,fn:()=>{activa=i;modo="una";render()}}));
 items.push({id:"cmp",txt:"Comparar los cuatro",on:modo==="todas",cls:"cmp",fn:()=>{modo="todas";render()}});
 items.forEach(o=>{
  const b=document.createElement("button");b.className="item"+(o.cls?" "+o.cls:"");
  b.setAttribute("aria-pressed",o.on);
  b.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true">'+ICONOS[o.id]+'</svg><span>'+o.txt+'</span>';
  b.onclick=o.fn;d.appendChild(b);
 });
}
function render(){
 pintarDock();
 if(modo==="todas"){
  $("detalle").classList.add("hidden");$("comparativo").classList.remove("hidden");
  let h="<thead><tr><th></th>"+TEORIAS.map(t=>"<th>"+t.nombre+"</th>").join("")+"</tr></thead><tbody>";
  ASPECTOS.forEach(a=>{h+="<tr><th scope='row'>"+a.t+"</th>"+TEORIAS.map(t=>"<td>"+lista(t[a.k],"t")+"</td>").join("")+"</tr>"});
  $("tabla").innerHTML=h+"</tbody>";return;
 }
 $("comparativo").classList.add("hidden");$("detalle").classList.remove("hidden");
 const t=TEORIAS[activa];
 $("nombre").textContent=t.nombre;$("autores").textContent=t.autores;$("idea").textContent=t.idea;
 const g=$("grid");g.innerHTML="";
 ASPECTOS.forEach(a=>{
  const b=document.createElement("button");b.className="flip";b.setAttribute("aria-pressed","false");b.setAttribute("aria-label",a.t);
  b.innerHTML="<div class='blur'></div><div class='face'><div class='side front'><b>"+a.t+"</b><small>Toca para ver</small></div><div class='side back'><h3>"+a.t+"</h3>"+lista(t[a.k])+"</div></div>";
  b.onclick=()=>b.setAttribute("aria-pressed",b.getAttribute("aria-pressed")!=="true");
  g.appendChild(b);
 });
}
render();
