const URL_BASE = 'http://localhost:3000'
const api = {
    async buscarPensamentos() {
        try {
            const response = await axios.get(`${URL_BASE}/pensamentos`)
            return await response.data
        } catch (error) {
            alert ('Erro ao buscar pensamentos')
            throw error
        }
    },

    async buscarPensamentosPorId(id) {
        try {
            const response = await axios.get(`${URL_BASE}/pensamentos/${id}`)
            return await response.data
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
            const response = await axios.post(`${URL_BASE}/pensamentos`)
            return await response.data
        } catch (error) {
            alert ('Erro ao buscar pensamentos')
            throw error
        }
    },

    async editarPensamentos(pensamento){
        try {
            const response = await axios.put(`${URL_BASE}/pensamentos/${pensamento.id}`)                    
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
    }   
}

// Permite que o objeto seja acessado por outros arquivos
export default api;