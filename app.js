class Despesa{
    constructor(ano, mes, dia, tipo, descricao, valor){
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }

    validarDados(){
        for(let i in this){ //pega todas os atributos e armazena dentro de "i"
            if(this[i] == undefined || this[i] == '' || this[i] == null) {
            //this[i] mesma coisa que: this.atributo
            return false
            }
        }
        return true
    }
}

class Bd{

    constructor(){
        let id = localStorage.getItem('id')

        if(id === null){
            localStorage.setItem('id', 0) //criando o ID para cada elemento
        }
    }

    getProximoId(){
        let proximoId = localStorage.getItem('id') //get: pega dados
        return parseInt(proximoId) + 1
    }

    gravar(d){
        let id = this.getProximoId()//sempre que for executado, irá pegar a function "proximoId" e atualizará o próximo Id

        //insiro o objeto que eu quero, recebo o objeto literal e preciso converter para JSON
        localStorage.setItem(id, JSON.stringify(d)) //set: envia dados

         localStorage.setItem('id', id)
    }
}

let bd = new Bd()


function cadastrarDespesa(){
    let ano =  document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')

    let despesa = new Despesa(
        ano.value, 
        mes.value, 
        dia.value, 
        tipo.value, 
        descricao.value, 
        valor.value)

        if(despesa.validarDados()){
            bd.gravar(despesa)
            //dialog sucesso

            document.getElementById('modal_titulo').innerHTML = 'Registrdo inserido com sucesso.'
            document.getElementById('modal_titulo_div').className = 'modal-header text-success'
            document.getElementById('modal_btn').innerHTML = 'Voltar'
            document.getElementById('modal_btn').className = 'btn btn-success '

            $('#registraDespesa').modal('show')
        } else{
            //dialog de erro
            document.getElementById('modal_titulo_div').className = 'modal-header text-danger'
            document.getElementById('modal_conteudo').innerHTML = 'Existem campos obrigatórios que não foram preenchidos.'
            document.getElementById('modal_titulo').innerHTML = 'Erro na gravação.'
            document.getElementById('modal_conteudo').innerHTML = 'Erro na gravação, verifique se todos os campos foram preenchidos corretamente.'
            document.getElementById('modal_btn').innerHTML = 'Voltar e corrigir'
            document.getElementById('modal_btn').className = 'btn btn-danger '

            $('#registraDespesa').modal('show') //exibindo o modal caso dê erro
        }
        bd.gravar(despesa)
}



