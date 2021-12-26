const carrito = document.querySelector('#carrito');
const listCursos = document.querySelector('#lista-cursos');
const contenedorCarrito= document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
let articulosCarrito=[];




const cargarEventListeners = () =>{

        //cuando agregas un curso presionado "agregar al  carrito"
        listCursos.addEventListener('click',agregarCurso);
        //elimina cursos de carrito
        carrito.addEventListener('click',eliminarCurso);

        vaciarCarritoBtn.addEventListener('click', () =>{

            articulosCarrito = [];//reseteamos html 
            limpiarHtml();//eliminamos todo el html

        });
        //muestra curso en el carrito
        document.addEventListener('DOMContentLoaded' , () =>{

            articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
            carritoHTML();

        });


}
//funciones
//1
const agregarCurso = (e) =>{

    
   // si tiene como clase el agregar carrito
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
    //apunta a la clase que das click
    //console.log(e.target.classList);
}
//8
//eliminar curso de carrito
 const eliminarCurso = (e) =>{
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');
        //recorre y elimina del arreglo  por id 
        //guarda todos los que son diferentes en articulo carrito
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
        //llama a la funcion para que vuelva a recorrer los articulosCarrito
        carritoHTML();  

    }
 }
//lee el contenido de html al que le dimos clik y extrae la informacion del curso
//2
const leerDatosCurso = (curso)=>{
    //console.log(curso);
    const infoCurso = {
        imagen : curso.querySelector('img').src,
        titulo : curso.querySelector('h4').textContent,
        precio : curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
    //6
    // some :permite recorrer los elementos de un objeto y condicionarlos: devuelve false o true
    const existe = articulosCarrito.some(curso => curso.id===infoCurso.id)
    if(existe){
        //actualizar la cantidad
         //crea un nuevo arreglo con los datos de articulo carrito
         const cursos = articulosCarrito.map(curso => {
            if(curso.id===infoCurso.id){

                curso.cantidad++;
                return curso;// retorna el curso duplicado con nueva cantidad

            }else{
                return curso; // retorna el curso no duplicado
            }
         });
        
         articulosCarrito = [...cursos];
    }else{

        //agregamos el curso
        articulosCarrito = [...articulosCarrito, infoCurso];
    }
    //console.log(infoCurso);

    carritoHTML();

}




//muestra el carrito de compras y genera el html
//3
const carritoHTML = ()=>{
    //limpiar html
    limpiarHtml();


    articulosCarrito.forEach(curso=> {

        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${curso.imagen}" width=100></td>
            <td>${curso.titulo}</td>
            <td>${curso.precio}</td>
            <td>${curso.cantidad}</td>
            <td><a href="#" class="borrar-curso" data-id="${curso.id}">X</a></td>

        `;
        //agrega el html del carrito al tbody
        contenedorCarrito.appendChild(row);
    });
    //agregar carrito de compras al storage
    sincronizarStorage();

}

 const  sincronizarStorage = () =>{

    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
 }

//4
//elimina los cursos de tbody
const limpiarHtml = () =>{
    //forma lenta
    //contenedorCarrito.innerHTML='';
   // mientras tenga un elemento hijo la funcion se va a ejecutar 
    while (contenedorCarrito.firstChild) {
        //elimina un hijo                               //comenzando desde el primero
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}


cargarEventListeners();






















