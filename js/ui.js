import api from "./api.js"
const listaPensamentos = document.getElementById('lista-pensamentos')

const ui = {
    async preencherFormulario(pensamentoId) {
        const pensamento = await api.buscarPensamentosPorId(pensamentoId)
        document.getElementById("pensamento-id").value = pensamento.id
        document.getElementById("pensamento-conteudo").value = pensamento.conteudo
        document.getElementById("pensamento-autoria").value = pensamento.autoria
    },

    async renderizarPensamentos(pensamentosFiltrados = null) {  
        const listaPensamentos = document.getElementById("lista-pensamentos")
        const mensagemVazia = document.getElementById("mensagem-vazia")
        listaPensamentos.innerHTML = ""
           
        try {
            let pensamentosParaRenderizar 

            if(pensamentosFiltrados) {
                pensamentosParaRenderizar = pensamentosFiltrados
            }else {
                pensamentosParaRenderizar = await api.buscarPensamentos()
            }

            if (pensamentosParaRenderizar.length === 0) {
                mensagemVazia.style.display = "block"
            } else {
                mensagemVazia.style.display = "none"
                pensamentosParaRenderizar.forEach(ui.cadastrarPensamentosNaLista)
            } 
        }catch {
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

        const botaoEditar = document.createElement("button")
        botaoEditar.classList.add("botao-editar")
        botaoEditar.onclick = () => {
            ui.preencherFormulario(pensamento.id)
        }

        const iconeEditar = document.createElement("img")
        iconeEditar.src = "assets/imagens/icone-editar.png"
        iconeEditar.alt = "editar"
        botaoEditar.appendChild(iconeEditar)

        const botaoExcluir = document.createElement("button")
        botaoExcluir.classList.add("botao-excluir")
        botaoExcluir.onclick = async () => {
            try {
                await api.excluirPensamentoPorId(pensamento.id)
                ui.renderizarPensamentos()
            } catch (error) {
                alert("Erro ao excluir pensamento")
            }            
        }

        const iconeExcluir = document.createElement("img")
        iconeExcluir.src = "assets/imagens/icone-excluir.png"
        iconeExcluir.alt = "Icone excluir"
        botaoExcluir.appendChild(iconeExcluir)

        const icones = document.createElement("div")
        icones.classList.add("icones")
        icones.appendChild(botaoEditar)
        icones.appendChild(botaoExcluir)

        li.appendChild(iconeAspas)
        li.appendChild(divConteudo)
        li.appendChild(divAutoria)
        li.appendChild(icones)

        listaPensamentos.appendChild(li)
    } 
}

// Permite que o objeto seja acessado por outros arquivos
export default ui;