// clase billete, actor principal del código.
class Billete
{
  constructor (img, v, c)
  {
    this.imagen = new Image ();
    this.imgBillete = img;
    this.valor = v;
    this.cantidad = c;

    this.imagen.src = rutaimg[this.imgBillete];
  }
}

// img src
var rutaimg = [];
rutaimg["cienmil"] = "https://i.imgur.com/AvqHzm5.png";
rutaimg["cincuentamil"] = "https://i.imgur.com/dWGL13M.jpg";
rutaimg["veintemil"] = "https://i.imgur.com/RlE9qmb.jpg";
rutaimg["diezmil"] = "https://i.imgur.com/5QEqREI.jpg";
rutaimg["cincomil"] = "https://i.imgur.com/q5gLeR6.jpg";
rutaimg["dosmil"] = "https://i.imgur.com/OeE8Kv6.png";
rutaimg["mil"] = "https://i.imgur.com/TtwNLTg.jpg";

// Función de números aleatorios
function aleatorio(max, min)
{
  var resultado = Math.floor(Math.random() * (max - min + 1)) + min;
  return resultado;
}

// Cantidad de billetes aleatorios
var cantidadBilletes = new Array();

for (i = 0; i <= 6; i++)
{
  var x = aleatorio(1, 100)
  cantidadBilletes[i] = x;
}

// billetes de caja y entregados
var caja = [];
var entregado = [];
caja.push( new Billete("cienmil", 100000, cantidadBilletes[0] ) );
caja.push( new Billete("cincuentamil", 50000, cantidadBilletes[1]) );
caja.push( new Billete("veintemil", 20000, cantidadBilletes[2]) );
caja.push( new Billete("diezmil", 10000, cantidadBilletes[3]) );
caja.push( new Billete("cincomil", 5000, cantidadBilletes[4]) );
caja.push( new Billete("dosmil", 2000, cantidadBilletes[5]) );
caja.push( new Billete("mil", 1000, cantidadBilletes[6]) );


//variables
var saldoBilletes = document.getElementById("saldoBilletes");
var saldoPesos = document.getElementById("saldoPesos");
var reiniciar = document.getElementById("reiniciar");
var resultado = document.getElementById("resultado");
var finalizado = document.getElementById("finalizado");
var enter = document.addEventListener("keydown", entregarBilletes2);
var t = document.getElementById("dinero");
var b = document.getElementById("extraer");
b.addEventListener("click", entregarBilletes);
var dinero;
var div = 0;
var papeles = 0;
var totalPesosFinal = calcularSaldoPesos();

// Extraer billetes con la tecla Enter
function entregarBilletes2(evento)
{
  document.getElementById("sinDinero");
  if (evento.keyCode == 13)
  {
    entregarBilletes();
  }
}

// Saldo de billetes
mostrarSaldoBilletes();  //Muestra el saldo inicial de billetes

function mostrarSaldoBilletes()
{
  saldoBilletes.innerHTML = "";  //Elimina el saldo anterior y deja el espacio vacio para la función
  for (var bill of caja)
  {
    if(bill.cantidad > 1)
    {
      saldoBilletes.innerHTML += bill.cantidad + " billetes de " + bill.valor + "<br />";
    }
    else if (bill.cantidad == 0)
    {
      saldoBilletes.innerHTML += bill.cantidad + " billetes de " + bill.valor + "<br />";
    }
    else
    {
      saldoBilletes.innerHTML += bill.cantidad + " billete de " + bill.valor + "<br />";
    }
  }
}

// Función con algoritmo del cajero
function entregarBilletes()
{
  var clave = parseInt(prompt("Ingrese la clave para retirar"));
  if (clave == 1837)
  {
  dinero = parseInt(t.value);
  resultado.innerHTML = "";
  entregado = [];  //Limpia los datos de entregado para que la funcion calcular billetes y saldo funcione
  for (var bi of caja)
    {        

      finalizado.innerHTML = "";
      if (dinero <= totalPesosFinal && dinero > 0)
      {
        div = Math.floor(dinero / bi.valor);
        if (div > bi.cantidad)
        {
          papeles = bi.cantidad;
        }
        else
        {
          papeles = div;
        }
        entregado.push( new Billete(bi.imgBillete, bi.valor, papeles) );
        dinero -= (bi.valor * papeles);
        bi.cantidad = bi.cantidad - papeles;
      }
    }
    if ( (dinero > totalPesosFinal) || (dinero <= 0) )
    {
      resultado.innerHTML = "";
      finalizado.innerHTML = "";
      document.getElementById("sinDinero");
      sinDinero.innerHTML = "No tengo los billetes para darte el dinero que necesitas..";
    }
  for (var e of entregado)
    {
      sinDinero.innerHTML = "";
      finalizado.innerHTML = "Usted ha recibido:";
      if (e.cantidad >  1 )
      {
        resultado.innerHTML += e.cantidad + " billetes de:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src=" + e.imagen.src + " /><br />";
      }
      else if (e.cantidad == 1)
      {
        resultado.innerHTML += e.cantidad + " billete de:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src=" + e.imagen.src + " /><br />";
      }  // &nbsp; para añadir espacios adicionales ya que html detecta solo el primer espacio
    }
        mostrarSaldoBilletes();
        totalPesosFinal = calcularSaldoPesos();
        saldoPesos.innerHTML = "Saldo total COP: " + totalPesosFinal;
  }
  else
  {
    sinDinero.innerHTML = "";
    finalizado.innerHTML = "";
    resultado.innerHTML = "Clave incorrecta, intente nuevamente.";
  }
}


// Función para refrescar el document con el boton "otra vez"
reiniciar.addEventListener("click", reiniciarCajero);

function reiniciarCajero()
{
  document.location.reload();
}

//  Calculo inicial del saldo en pantalla
var totalPesos = calcularSaldoPesos();
totalPesos = parseInt(totalPesos);
saldoPesos.innerHTML = "Saldo total COP: " + totalPesos;

// Función para calcular saldo en pantalla
function calcularSaldoPesos()
{
  var y = 0;
  for (var bill of caja)
  {
    y = (bill.cantidad * bill.valor) + y;
  }
  return y;
}
