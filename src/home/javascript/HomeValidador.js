
class HomeValidador {

    /**
    * - *Português* Função para validar os CNPJ's
    */
    cnpjValidator(cnpj) {

        cnpj = cnpj.replace(/[^\d]+/g, '');

        if (cnpj === '') return false;

        if (cnpj.length !== 14) {
            return false;
        }

        if (cnpj === "00000000000000" ||
            cnpj === "11111111111111" ||
            cnpj === "22222222222222" ||
            cnpj === "33333333333333" ||
            cnpj === "44444444444444" ||
            cnpj === "55555555555555" ||
            cnpj === "66666666666666" ||
            cnpj === "77777777777777" ||
            cnpj === "88888888888888" ||
            cnpj === "99999999999999") {
            return false;
        }

        var tamanho = cnpj.length - 2
        var numeros = cnpj.substring(0, tamanho);
        var digitos = cnpj.substring(tamanho);
        var soma = 0;
        var pos = tamanho - 7;
        for (var i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2)
                pos = 9;
        }
        var resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (parseInt(resultado) !== parseInt(digitos.charAt(0))) {
            return false;
        }

        tamanho = tamanho + 1;
        numeros = cnpj.substring(0, tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2)
                pos = 9;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (parseInt(resultado) !== parseInt(digitos.charAt(1))) {
            return false;
        }

        return true;
    }

    /**
    * - *Português* Função para validar as Datas
    */
    dataChecker(data) {
        return data instanceof Date && !isNaN(data);
    }

}

export const homeValidador = new HomeValidador();