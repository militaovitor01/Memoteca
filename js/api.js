const api = {
    async buscarPensamentos() {
        try {
            const response = await fetch('http://localhost:3000/pensamentos')
            return await response.json()
        } catch (error) {
            alert ('Erro ao buscar pensamentos')
            throw error
        }
    },

    async buscarPensamentosPorId(id) {
        try {
            const response = await fetch(`http://localhost:3000/pensamentos/${id}`)
            return await response.json()
        } catch (error) {
            alert ('Erro ao buscar pensamento')
            throw error
        }
    },

    async cadastrarPensamentos(pensamento){
        try {
            const response = await fetch('http://localhost:3000/pensamentos', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(pensamento)                       
            })
            return await response.json()
        } catch (error) {
            alert ('Erro ao buscar pensamentos')
            throw error
        }
    },

    async editarPensamentos(pensamento){
        try {
            const response = await fetch(`http://localhost:3000/pensamentos/${pensamento.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(pensamento)                       
            })
            return await response.json()
        } catch (error) {
            alert ('Erro ao alterar pensamento')
            throw error
        }
    },
   
    async excluirPensamentos(){
        try {
            const response = await fetch(`http://localhost:3000/pensamentos`, {
                method: "DELETE",                    
            })
            return await response.json()
        } catch (error) {
            alert ('Erro ao excluir todos os pensamentos')
            throw error
        }
    },

    async excluirPensamentoPorId(id){
        try {
            const response = await fetch(`http://localhost:3000/pensamentos/${id}`, {
                method: "DELETE",                              
            })
            return await response.json()
        } catch (error) {
            alert ('Erro ao excluir o pensamento')
            throw error
        }
    },
   
}

// Permite que o objeto seja acessado por outros arquivos
export default api;