import ui from "./ui.js"
import api from "./api.js"
import "./ui.js"
import "./api.js"

const formularioPensamento = document.getElementById('pensamento-form')
const botaoCancelar = document.getElementById("botao-cancelar")
const botaoExcluirTodos = document.getElementById("botao-excluir-todos")
const inputBusca = document.getElementById("campo-busca")

document.addEventListener("DOMContentLoaded", () => {
    
    ui.renderizarPensamentos()    
    formularioPensamento.addEventListener("submit", manipularSubmissaoFormulario)
    inputBusca.addEventListener("input", manipularBusca)
})

botaoCancelar.addEventListener('click', () => {
    formularioPensamento.reset()
})

botaoExcluirTodos.onclick = async () => {
    try {
        await api.excluirTodos()
    } catch (error) {
        alert("Erro ao chamar a função de exclusão de pensamentos")
        throw error
    }
}

async function manipularSubmissaoFormulario(event) {
    event.preventDefault()
    const id = document.getElementById("pensamento-id").value
    const conteudo = document.getElementById("pensamento-conteudo").value
    const autoria = document.getElementById("pensamento-autoria").value
    const data = document.getElementById("pensamento-data").value

    if(!validarData(data)) {
        alert("Data não é válida! Digite um valor válido")
    }

    try {
        if(id) {
            await api.editarPensamentos({id, conteudo, autoria, data})
        }else {
            await api.cadastrarPensamentos({conteudo, autoria, data})
        }

        ui.renderizarPensamentos()
    } catch (error) {
        alert("Erro ao cadastrar pensamentos!")
    }
}

async function manipularBusca(){
    const termoBusca = document.getElementById("campo-busca").value
    try {
        const pensamentosFiltrados = await api.buscarPensamentosPorTermo(termoBusca)
        ui.renderizarPensamentos(pensamentosFiltrados)
    } catch (error) {
        alert("Erro ao realizar busca")
    }
}

function validarData(data) {
    const dataAtual = new Date()
    const dataInserida = new Date(data)
    
    return dataInserida  <= dataAtual    
}