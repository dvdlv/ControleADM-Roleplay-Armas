const selecionar = document.getElementById('membro')
const titanium = document.getElementById('titanium')
const ferro = document.getElementById('ferro')
const pistola = document.getElementById('pistola')
const sub = document.getElementById('sub')
const fura = document.getElementById('fura')
const dinheiro = document.getElementById('dinheiro')
const entrada = document.getElementById('valor')
const tabela = document.getElementById('tabela')
var pegar
var referencia

// Setor de Criação de membros

class Membro {
    constructor() {
        this.nome = ''
        this.titanium = 0
        this.ferro = 0
        this.pt = 0
        this.sub = 0
        this.fura = 0
        this.dinheiro = 0
        this.salario = 0
    }
    addNome(nome) {
        this.nome = nome;
    }


}

const membros = []

function novoMembro() { // Criar novo membro e jogar no LocalStorage
    let novo = prompt("Digite o nome do novo membro")
    let contador = localStorage.length
    membros[contador] = new Membro
    membros[contador].addNome(novo)
    localStorage.setItem(`membro${contador}`, JSON.stringify(membros[contador]))
    location.reload()
}


function criarOptions() { // Auto Explicativo, mas basicamente cria as options baseado no que tem dentro do LocalStorage
    let contador = 0
    while (contador < localStorage.length) {
        const option = document.createElement('option')
        option.classList.add(`option${contador}`)
        option.innerHTML = `<option value="${contador}">${JSON.parse(localStorage.getItem(`membro${contador}`)).nome}</option>`
        selecionar.appendChild(option)
        contador++
    }
}


function criarTabela() {
    let contador = 0
    while (contador < localStorage.length) {
        const tablezinha = document.createElement('tr')
        tablezinha.classList.add(`membro${contador}`)
        tablezinha.innerHTML = `<tr>
        <td>${JSON.parse(localStorage.getItem(`membro${contador}`)).nome}</td>
        <td>${JSON.parse(localStorage.getItem(`membro${contador}`)).titanium}</td>
        <td>${JSON.parse(localStorage.getItem(`membro${contador}`)).ferro}</td>
        <td>${JSON.parse(localStorage.getItem(`membro${contador}`)).pt}</td>
        <td>${JSON.parse(localStorage.getItem(`membro${contador}`)).sub}</td>
        <td>${JSON.parse(localStorage.getItem(`membro${contador}`)).fura}</td>
        <td>${JSON.parse(localStorage.getItem(`membro${contador}`)).dinheiro}</td>
        <td>${JSON.parse(localStorage.getItem(`membro${contador}`)).salario}</td>
        <td><button type="submit" value="X" onclick="limparEsse(${contador})">⭕</button><button type="submit" value="X" onclick="removaEsse(${contador})">❌</button></td>
        </tr>`
        tabela.appendChild(tablezinha)
        definirSalario(contador)
        contador++
    }
}

function criar() { // cria de fato os valores a serem mostrados e opções de select 
    criarOptions();
    criarTabela();
}

// Setor de execuções e buscas


// função de busca no Array membros // Alteração, não é mais no array membros, e sim no localStorage
function acharNoArray() {
    let contador = 0
    while (contador < localStorage.length) {
        if (selecionar.value !== JSON.parse(localStorage.getItem(`membro${contador}`)).nome) {
            contador++
        } else {
            pegar = JSON.parse(localStorage.getItem(`membro${contador}`))
            referencia = contador
            break;
        }
    }
}

function alterarArmazenamento() {

    let objeto = pegar
    localStorage.setItem(`membro${referencia}`, JSON.stringify(objeto))
    console.log(objeto)
}

//confirma se o membro de fato foi selecionado

function validacaoSelecao() {
    if (selecionar.value === '') { alert("Selecione um membro"); return false } else { console.log(pegar.nome); selecionar.value = ''; return true }
}

// validar o radial e injetar valor. 

function validacaoRadial() {
    let tipos = [ferro.checked, pistola.checked, sub.checked, fura.checked, dinheiro.checked, titanium.checked] // faz a chegagem se algum input radio está marcado
    switch (tipos.indexOf(true)) {
        case 0:
            // console.log(` o membro ${pegar.nome} adicionou mais ${entrada.value} de ferro, totalizando assim: ${Number(entrada.value) + Number(pegar.ferro)}`);
            pegar.ferro = Number(entrada.value) + Number(pegar.ferro)
            alterarArmazenamento()
            return true;
            break;
        case 1:
            // console.log(` o membro ${pegar.nome} adicionou mais ${entrada.value} de Corpo de Pt, totalizando assim: ${Number(entrada.value) + Number(pegar.pt)}`);
            pegar.pt = Number(entrada.value) + Number(pegar.pt)
            alterarArmazenamento()
            return true;
            break;
        case 2:
            // console.log(` o membro ${pegar.nome} adicionou mais ${entrada.value} de Corpo de SUB, totalizando assim: ${Number(entrada.value) + Number(pegar.sub)}`);
            pegar.sub = Number(entrada.value) + Number(pegar.sub)
            alterarArmazenamento()
            return true;
            break;
        case 3:
            // console.log(` o membro ${pegar.nome} adicionou mais ${entrada.value} de Corpo de Fuzil, totalizando assim: ${Number(entrada.value) + Number(pegar.fura)}`);
            pegar.fura = Number(entrada.value) + Number(pegar.fura)
            alterarArmazenamento()
            return true;
            break;
        case 4:
            // console.log(` o membro ${pegar.nome} adicionou mais ${entrada.value} de Dinheiro Sujo, totalizando assim: ${Number(entrada.value) + Number(pegar.dinheiro)}`);
            pegar.dinheiro = Number(entrada.value) + Number(pegar.dinheiro)
            alterarArmazenamento()
            return true;
            break;
        case 5:
            pegar.titanium = Number(entrada.value) + Number(pegar.titanium)
            alterarArmazenamento()
            return true;
            break;
        default:
            alert('Selecione um Material ou Dinheiro.');
            return false;
            break;
    }
}


function removaEsse(n) {
    let certeza = prompt("Tem certeza que deseja excluir? S/N")
    if (certeza === "s" || certeza === "S") {
        localStorage.removeItem(`membro${n}`)
        location.reload()
    }
}

function limparEsse(n) {

    let objeto = JSON.parse(localStorage.getItem(`membro${n}`))
    objeto.titanium = 0
    objeto.ferro = 0
    objeto.pt = 0
    objeto.sub = 0
    objeto.fura = 0
    objeto.dinheiro = 0
    objeto.salario = 0
    localStorage.setItem(`membro${n}`, JSON.stringify(objeto))
    location.reload()

}

function definirSalario(n) {
    let objeto = JSON.parse(localStorage.getItem(`membro${n}`))
    if (objeto.titanium >= 300 ||
        objeto.ferro >= 300 ||
        objeto.pt >= 300 ||
        objeto.sub >= 300 ||
        objeto.fura >= 300) {
        objeto.salario = ((objeto.dinheiro * .75) / 2) + 150000
        localStorage.setItem(`membro${n}`, JSON.stringify(objeto))
    }
}



// executa as funções de validação e busca
function validacoes() {
    acharNoArray();
    validacaoSelecao();
    validacaoRadial();

}



//     console.log(selecionar.value)
//     console.log(entrada.value)
//     console.log(ferro.checked)
//     console.log(pistola.checked)
//     console.log(sub.checked)
//     console.log(fura.checked)
//     console.log(dinheiro.checked)

// let variavel = "ferro"
// let membro1 = new Membro('David')
// let valor = 100
// membro1.ferro = entrada.value + membro1.ferro
// console.log(membro1)