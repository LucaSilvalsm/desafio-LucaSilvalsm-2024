import { RecintosZoo } from '../src/recintos-zoo';

describe('RecintosZoo', () => {
    let recintos;

    beforeEach(() => {
        recintos = new RecintosZoo();
    });

    test('deve retornar recintos viáveis para MACACO', () => {
        const resultado = recintos.analisaRecintos('MACACO', 1);
        expect(resultado.recintosViaveis).toEqual([
            "Recinto 1 (espaço livre: 7 total: 10)",
            "Recinto 2 (espaço livre: 5 total: 5)",
            "Recinto 3 (espaço livre: 5 total: 7)",
            "Recinto 4 (espaço livre: 8 total: 8)",
            "Recinto 5 (espaço livre: 6 total: 9)"
        ]);
    });

    test('deve retornar erro para animal inválido', () => {
        const resultado = recintos.analisaRecintos('T-REX', 1);
        expect(resultado.erro).toBe("Animal inválido");
    });

    test('deve retornar erro para animal não listado como UNICORNIO', () => {
        const resultado = recintos.analisaRecintos('UNICORNIO', 1);
        expect(resultado.erro).toBe("Animal inválido");
    });

    test('deve retornar erro para quantidade inválida', () => {
        const resultado = recintos.analisaRecintos('MACACO', -1);
        expect(resultado.erro).toBe("Quantidade inválida");
    });

    test('deve retornar erro quando a quantidade de animais é maior que a capacidade disponível', () => {
        const resultado = recintos.analisaRecintos('MACACO', 20);
        expect(resultado.erro).toBe("Não há recinto viável");
    });

   
    

    test('deve retornar erro se tentar adicionar animais carnívoros com espécies incompatíveis', () => {
        const resultado = recintos.analisaRecintos('LEAO', 2);
        expect(resultado.erro).toBe("Não há recinto viável");
    });

    test('deve retornar recintos viáveis para HIPOPOTAMO em recinto com savana e rio', () => {
        const resultado = recintos.analisaRecintos('HIPOPOTAMO', 2);
        expect(resultado.recintosViaveis).toEqual([
            "Recinto 4 (espaço livre: 8 total: 8)"
        ]);
    });
});
