import ui from "./ui.js"
import api from "./api.js"
import "./ui.js"
import "./api.js"

const formularioPensamento = document.getElementById('pensamento-form')
const botaoCancelar = document.getElementById("botao-cancelar")
const botaoExcluirTodos= document.getElementById("botao-excluir-todos")

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

document.addEventListener("DOMContentLoaded", () => {
    ui.renderizarPensamentos()    
    formularioPensamento.addEventListener("submit", manipularSubmissaoFormulario)
})

async function manipularSubmissaoFormulario(event) {
    event.preventDefault()
    const id = document.getElementById("pensamento-id").value
    const conteudo = document.getElementById("pensamento-conteudo").value
    const autoria = document.getElementById("pensamento-autoria").value

    try {
        if(id) {
            await api.editarPensamentos({id, conteudo, autoria})
        }else {
            await api.cadastrarPensamentos({conteudo, autoria})
        }

        ui.renderizarPensamentos()
    } catch (error) {
        alert("Erro ao cadastrar pensamentos!")
    }
}
