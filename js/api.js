const URL_BASE = 'http://localhost:3000'

const converterStringParaData = (dataString) => {
    const [ano, mes, dia] = dataString.split("-")
    return new Date(Date.UTC(ano,mes -1,dia))
}

const api = {
    async buscarPensamentos() {
        try {
            const response = await axios.get(`${URL_BASE}/pensamentos`)
            const pensamentos = await response.data

            return pensamentos.map(pensamento => {
                return{
                    ...pensamento,
                    data: new Date(pensamento.data)
                }
            })
        } catch (error) {
            alert ('Erro ao buscar pensamentos')
            throw error
        }
    },

    async buscarPensamentosPorId(id) {
        try {
            const response = await axios.get(`${URL_BASE}/pensamentos/${id}`)
            const pensamento = await response.data

            return {
                ...pensamento,
                data: new Date(pensamento.data)
            }
        } catch (error) {
            alert ('Erro ao buscar pensamento')
            throw error
        }
    },

    async buscarPensamentosPorTermo(termo) {        
        try {
            const pensamentos = await this.buscarPensamentos()
            const termoEmMinusculas = termo.toLowerCase() // O pensamento digitado pela pessoa sempre estará em minúsculas

            const pensamentosFiltrados = pensamentos.filter(pensamento =>{
                return (pensamento.conteudo.toLowerCase().includes(termoEmMinusculas)) ||
                (pensamento.autoria.toLowerCase().includes(termoEmMinusculas))
            })

            return pensamentosFiltrados
        } catch (error) {
            alert("Erro ao buscar pensamentos por termo!")
            throw error
        }   
    },

    async cadastrarPensamentos(pensamento){
        try {
            const data = converterStringParaData(pensamento.data)
            const response = await axios.post(`${URL_BASE}/pensamentos`, {
                ...pensamento,
                data: data.toISOString
            })
            return await response.data
        } catch (error) {
            alert ('Erro ao buscar pensamentos')
            throw error
        }
    },

    async editarPensamentos(pensamento){
        try {
            const response = await axios.put(`${URL_BASE}/pensamentos/${pensamento.id}`, pensamento)                    
            return await response.data
        } catch (error) {
            alert ('Erro ao alterar pensamento')
            throw error
        }
    },
   
    async excluirTodos(){
        try{
            const listaPensamentos = await api.buscarPensamentos();
            const promises = listaPensamentos.map(p => api.excluirPensamentoPorId(p.id)) // Cria lista de Promises
            await Promise.all(promises)
        }catch{
            alert("Erro ao excluir todos os pensamentos")
        }
    },
       
    async excluirPensamentoPorId(id){
        try {
            const response = await axios.delete(`${URL_BASE}/pensamentos/${id}`)
        } catch (error) {
            alert ('Erro ao excluir o pensamento')
            throw error
        }
    },   

    async atualizarFavorito(id, favorito) {
        try {
            const response = await axios.patch(`${URL_BASE}/pensamentos/${id}`, { favorito })
            return response.data
        } catch (error) {
            alert("Não foi possível atualizar favorito")
            throw error
        }
    }
}

// Permite que o objeto seja acessado por outros arquivos
export default api;