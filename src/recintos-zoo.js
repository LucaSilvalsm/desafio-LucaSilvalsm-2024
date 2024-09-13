class RecintosZoo {
    constructor() {
        this.recintos = [
            { numero: 1, bioma: ['savana'], tamanhoTotal: 10, animais: [{ especie: 'MACACO', quantidade: 3 }] },
            { numero: 2, bioma: ['floresta'], tamanhoTotal: 5, animais: [] },
            { numero: 3, bioma: ['savana', 'rio'], tamanhoTotal: 7, animais: [{ especie: 'GAZELA', quantidade: 1 }] },
            { numero: 4, bioma: ['rio'], tamanhoTotal: 8, animais: [] },
            { numero: 5, bioma: ['savana'], tamanhoTotal: 9, animais: [{ especie: 'LEAO', quantidade: 1 }] },
        ];

        this.animais = {
            'LEAO': { tamanho: 3, bioma: ['savana'], carnivoro: true },
            'LEOPARDO': { tamanho: 2, bioma: ['savana'], carnivoro: true },
            'CROCODILO': { tamanho: 3, bioma: ['rio'], carnivoro: true },
            'MACACO': { tamanho: 1, bioma: ['savana', 'floresta'], carnivoro: false },
            'GAZELA': { tamanho: 2, bioma: ['savana'], carnivoro: false },
            'HIPOPOTAMO': { tamanho: 4, bioma: ['savana', 'rio'], carnivoro: false },
        };
    }

    calculaEspacoDisponivel(recinto) {
        const espacoOcupado = recinto.animais.reduce((acc, animal) => {
            const infoAnimal = this.animais[animal.especie];
            return acc + (infoAnimal.tamanho * animal.quantidade);
        }, 0);
        return recinto.tamanhoTotal - espacoOcupado;
    }
    

    analisaRecintos(tipoAnimal, quantidade) {
        if (!this.animais[tipoAnimal]) {
            return { erro: "Animal inválido" };
        }
    
        if (!Number.isInteger(quantidade) || quantidade <= 0) {
            return { erro: "Quantidade inválida" };
        }
    
        const infoAnimal = this.animais[tipoAnimal];
        const tamanhoNecessario = infoAnimal.tamanho * quantidade;
        const recintosViaveis = [];
    
        for (const recinto of this.recintos) {
            const biomaAdequado = infoAnimal.bioma.some(bioma => recinto.bioma.includes(bioma));
            const animaisNoRecinto = recinto.animais;
    
            
    
            if (infoAnimal.carnivoro && animaisNoRecinto.some(animal => !this.animais[animal.especie].carnivoro)) {
                return { erro: "Não há recinto viável" };
            }
    
            if (infoAnimal.especie === 'MACACO' && animaisNoRecinto.length === 0) {
                console.log(`  Erro: Não há recinto viável (recinto ${recinto.numero} vazio)`);
                return { erro: "Não há recinto viável" }; 
            }
    
            if (infoAnimal.especie === 'HIPOPOTAMO' && (!recinto.bioma.includes('savana') && !recinto.bioma.includes('rio'))) {
                continue; 
            }
    
            const espacoRestante = this.calculaEspacoDisponivel(recinto);
    
           
    
            if (espacoRestante >= tamanhoNecessario) {
                recintosViaveis.push(
                    `Recinto ${recinto.numero} (espaço livre: ${espacoRestante} total: ${recinto.tamanhoTotal})`
                );
            }
        }
    
        if (recintosViaveis.length > 0) {
            return { recintosViaveis };
        } else {
            return { erro: "Não há recinto viável" };
        }
    }
}    
    

module.exports = { RecintosZoo };
