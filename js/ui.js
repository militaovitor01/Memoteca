import api from "./api.js"
const listaPensamentos = document.getElementById('lista-pensamentos')

const ui = {
    async renderizarPensamentos() {
        try {
            const pensamentos = await api.buscarPensamentos()
            pensamentos.forEach(ui.cadastrarPensamentosNaLista)
        } catch (error) {
            alert('Erro ao renderizar pensamentos')
        }
    },

    cadastrarPensamentosNaLista(pensamento) {
        const li = document.createElement("li")

        li.setAttribute("data-id", pensamento.id)
        li.classList.add("li-pensamento")

        const iconeAspas = document.createElement("img")

        iconeAspas.src = "assets/imagens/aspas-azuis.png"
        iconeAspas.alt = "Aspes azuis"
        iconeAspas.classList.add("icone-aspas")

        const divConteudo = document.createElement("div")
        
        divConteudo.classList.add("pensamento-conteudo")
        divConteudo.textContent = pensamento.conteudo

        const divAutoria = document.createElement("div")
        divAutoria.classList.add("pensamento-autoria")
        divAutoria.textContent = pensamento.autoria    
        
        li.appendChild(iconeAspas)
        li.appendChild(divConteudo)
        li.appendChild(divAutoria)

        listaPensamentos.appendChild(li)
    } 
}

// Permite que o objeto seja acessado por outros arquivos
export default ui;