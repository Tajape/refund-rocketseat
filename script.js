//seleciona os elementos do formulario
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

//captura o evento de input para fomatar o valor
amount.oninput = () => {
    //obtem o valor atual dos inputs e remove os caracteres não numericos
    let value = amount.value.replace(/\D/g, "");

    //transformar o valor em centavos (exemplo: 150/100 = 1.5, que é R$1,50)
    value = Number(value)/ 100

    //atualiza o valor do input
    amount.value = formatCurrencyBRL(value)
} 

//formata o valor no formato BRL
function formatCurrencyBRL(value){
    value = value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })

    return value
}

//captura o evento de submit do fomulario para obter os valores
form.onsubmit = (event) => {
    event.preventDefault(); //previne o comportamento padrao de recarregar a pagina

    //cria um novo objeto com os detalhes da nova despesa
    const newExpense = {
        id: new Date().getTime(), //pega os milissegundos e transforma em um ID
        expense: expense.value,
        category_id: category.value,
        category_name: category.options[category.selectedIndex].text,
        amount: amount.value,
        create_at: new Date(),
    }
}

