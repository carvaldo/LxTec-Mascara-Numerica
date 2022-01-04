$(function () {
    $(".mascara").on("input", setup);
});

function setup(event) {
    let input = $(this);
    let valorStr = input.val().replaceAll('.', "").replace(',', "."); // Formatação americana.
    if (isNaN(valorStr)) return;
    let decimalSymbolPosition = valorStr.indexOf(".")
    let qtdMinDecimaisData = input.data("mascara-decimais");
    let qtdMinDecimais = (qtdMinDecimaisData !== undefined) ? parseInt(qtdMinDecimaisData) : -1;
    if (decimalSymbolPosition > 0) { // Ignorar se não houver a quantidade mínima de casas decimais.
        let aux = valorStr.slice(decimalSymbolPosition, valorStr.length);
        if (aux.length < qtdMinDecimais) return;
    }
    if (decimalSymbolPosition > -1 && qtdMinDecimais > -1) { // Ignorar casas decimais excedentes.
        valorStr = valorStr.slice(0, decimalSymbolPosition + (qtdMinDecimais + 1));
    }
    let valor = parseFloat(valorStr);
    if (valor > 0 && input.is(".mascara-negativa")) valor *= -1;
    valorStr = valor.toLocaleString('pt-BR');
    if (valorStr !== "NaN") input.val(valorStr);
}