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
        for(let i in this) { //pega todas os atributos e armazena dentro de "i"
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
    recuperarTodosRegistros(){ //evento será feito através do onload da página "consulta"

        //array de despesas
        let despesas = Array()
       let id = localStorage.getItem('id')

        //Recuperar todas as despesas cadastradas em LocalStorage
       for(let i = 1; i <= id; i++){ //verificando se o i é maior ou igual ao id que está no LocalStorage

        //recuperar a despesa
        let despesa = JSON.parse(localStorage.getItem(i)) //JSON.parse = convertendo para objeto literal, getItem = i, pegando todos os elementos do LocalStorage


        //verificar se existe a possibilidade de índices que foram removidos
        if(despesa === null){
            continue //avance para a interação seguinte
        }
        despesas.push(despesa) //cada interação, irá acrescentar mais despesas
       }
       return despesas //encerrando função e retornando seu valor para onde foi chamado
       
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
            ano.value = ''
            mes.value = ''
            dia.value = ''
            tipo.value = ''
            descricao.value = ''
            valor.value = ''


            document.getElementById('modal_titulo').innerHTML = 'Registrdo inserido com sucesso.'
            document.getElementById('modal_conteudo').innerHTML = 'Despesa cadastrada com sucesso.'
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
}

function carregaListaDespesas(){
    let despesas = Array() //para listar em formato de Array
    despesas = bd.recuperarTodosRegistros()

    //selecionando o elemento tbody da tabela
    let listaDespesas = document.getElementById('listaDespesas')

    //percorrer o Array desepsas, listando cada elemento de forma dinâmica
    despesas.forEach(function(d){
       
        //criando a linha (tr)
        let linha = listaDespesas.insertRow() //insert row = acrescentando linha (tr)

        //criar as colunas (td)
        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano} `//vai de 0 até x
        
        //ajustar tipo, sobrepondo seu valor
        switch(d.tipo){ //idêntico
            case '1': d.tipo = 'Alimentação'
            break
            case '2': d.tipo = 'Educação'
            break
            case '3': d.tipo = 'Lazer'
            break
            case '4': d.tipo = 'Saúde'
            break
            case '5': d.tipo = 'Transporte'
            break
        }
        linha.insertCell(1).innerHTML = d.tipo

        linha.insertCell(2).innerHTML = d.descricao
        linha.insertCell(3).innerHTML = d.valor  
    }) //forEach: percorrendo cada elemento
}



