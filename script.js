//seleciona os elementos do formulario
const amount = document.getElementById("amount")

//captura o evento de input para fomatar o valor
amount.oninput = () => {
    //obtem o valor atual dos inputs e remove os caracteres não numericos
    let value = amount.value.replace(/\D/g, "");

    //transformar o valor em centavos (exemplo: 150/100 = 1.5, que é R$1,50)
    value = Number(value)/ 100

    //atualiza o valor do input
    amount.value = formatCurrencyBRL(value)
} 

function formatCurrencyBRL(value){
    //formata o valor no formato BRL
    value = value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })

    return value
}

