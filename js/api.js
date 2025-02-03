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
    }
}

// Permite que o objeto seja acessado por outros arquivos
export default api;