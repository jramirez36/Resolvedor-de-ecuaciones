class Formulas {
    constructor(tabla) 
    {
        this._tabla = tabla;
        this._raiz = null;
        this._order = "";
        this._posorder = "";
        this._preorder = "";
    }
    crearValores(formula) 
    {   
                let aux = [];
                for(let i = 0; i < formula.length; i++)
                {
                    aux[i] = new valores(formula.charAt(i));
                }
                this.agregar(aux);
    }
    agregar(aux)
    {
        let aux2;
        for(let i = 0; i < aux.length; i++)
        {
            if(i === 0)
            {
                this._raiz = aux[i];
            }
            else if(aux[i].valor == "*" || aux[i].valor == "/")
            {
                if(this._raiz == "+" || this._raiz == "-")
                {
                    aux2 = aux[i];
                    aux2._hIzq = this._raiz._hDer;
                    aux2._hDer = aux[i+1];
                    this._raiz._hDer = aux2;
                }
                else
                {
                    aux2 = aux[i];
                    aux2._hIzq = this._raiz;
                    aux2._hDer = aux[i+1];
                    this._raiz = aux2;
                }
            }
            else if(aux[i].valor == "+" || aux[i].valor == "-")
            {
                    aux2 = aux[i];
                    aux2._hIzq = this._raiz;
                    aux2._hDer = aux[i+1];
                    this._raiz = aux2;
            }
        }
        this.impresion();
    }
    impresion() {
        this._order = "";
        let aux = this._raiz;
        if (aux != null)
        {
            this.impresionArbol(aux);
        }
        this.resolver();
        this._tabla.innerHTML = this._order;
    }
    resolver()
    {
        let aux = [];
        let aux2 = 1;
        let aux3 = 2;
        for(let i=0; i < this._order.length; i++){
            aux[i] = this._order.charAt(i);
        }
        for(let i=aux.length - 1; i >= 0; i--)
        {
            if(aux[i] === "+")
            {
                aux2 = aux2 + 2;
                console.log(aux2)
                aux3 = aux3 + 2;
            }
            else if(aux[i] === "-")
            {
                aux2 = aux2 + 2;
                console.log(aux2)
                aux3 = aux3 + 2;
            }
            else if(aux[i] === "*"){
                        this._order = Number(aux[i+aux2]) * Number(aux[i+aux3]);
                        console.log(aux)
                        aux.splice(i, 1);
                        aux.splice(i + aux2-1, 1);
                        aux.splice(i + aux3-2, 1, this._order);
                        console.log(aux)
            }
            else if(aux[i] === "/"){
                    this._order = Number(aux[i+aux2]) / Number(aux[i+aux3]);
                    console.log(aux)
                    aux.splice(i, 1);
                    aux.splice(i + aux2-1, 1);
                    aux.splice(i + aux3-2, 1, this._order);
                    console.log(aux)
            }
        }
        console.log(aux.length-1)
        for(let j = aux.length-1; j >= 0; j--)
        {
            if(aux[j] == "+")
            {
                this._order = Number(aux[j+1]) + Number(aux[j+2]);
                console.log(aux)
                aux.splice(j, 1);
                aux.splice(j, 1);
                aux.splice(j, 1, this._order);
                console.log(aux)
            }
            else if(aux[j] == "-")
            {
                console.log(aux)
                this._order = Number(aux[j+1]) - Number(aux[j+2]);
                aux.splice(j, 1);
                aux.splice(j, 1);
                aux.splice(j, 1, this._order);
                console.log(aux)
            }
        }
    }
    impresionArbol(aux)
    {
        if(aux != null)
        {
            this._order += aux.valor;
            this.impresionArbol(aux._hIzq);
            this.impresionArbol(aux._hDer);
        }
    }
    preorder()
    {
        let aux = this._raiz;
        if (aux != null)
        {
            this.impresionPreorder(aux);
        }
        let tabla = document.querySelector('#tablapreorder');
        tabla.innerHTML = this._preorder;
    }
    impresionPreorder(aux)
    {
        if(aux != null)
        {
            this._preorder += aux.valor + "<br>";
            this.impresionPreorder(aux._hIzq);
            this.impresionPreorder(aux._hDer);
        }
    }

    posorder()
    {
        let aux = this._raiz;
        if (aux != null)
        {
            this.impresionPosorder(aux);
        }
        let tabla = document.querySelector('#tablaposorder');
        tabla.innerHTML = this._posorder;
    }
    impresionPosorder(aux)
    {
        if(aux != null)
        {
            this.impresionPosorder(aux._hIzq);
            this.impresionPosorder(aux._hDer);
            this._posorder += aux.valor + "<br>";
        }
    }
}
//impreciones
class valores{
    constructor(valor)
    {
        this._valor = valor;
        this._hIzq = null;
        this._hDer = null;
    }
    get valor()
    {
        return this._valor;
    }
}
//botones
var almacen = new Formulas(document.querySelector('#tablaArticulos'));
document.querySelector('#agregar').addEventListener('click', () => {
    let formula = document.querySelector('#formula').value;

    almacen.crearValores(formula);
});
document.querySelector('#preorder').addEventListener('click', () => {
    almacen.preorder();
});
document.querySelector('#posorder').addEventListener('click', () => {
    almacen.posorder();
});