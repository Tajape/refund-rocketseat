//seleciona os elementos do formulario
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

//seleciona os elementos da lista
const expenseList = document.querySelector("ul");

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

    //chama a função que irá adicionar o item na lista
    expenseAdd(newExpense)
}

function expenseAdd(newExpense){
    try {
        //cria o elemento para adicionar na lista
        const expenseItem = document.createElement("li");
        expenseItem.classList.add("expense");

        //cria o icone da categoria 
        const expenseIcon = document.createElement("img")
        expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`)
        expenseIcon.setAttribute("alt", newExpense.category_name)

        //cria a info da despesa
        const expenseInfo = document.createElement("div")
        expenseInfo.classList.add("expense-info")

        //cria o nome da despesa
        const expenseName = document.createElement("strong")
        expenseName.textContent = newExpense.expense

        //cria a categoria de despesa
        const expenseCategory = document.createElement("span")
        expenseCategory.textContent = newExpense.category_name

        //adiciona nome e categoria na div informações da despesa 
        expenseInfo.append(expenseName, expenseCategory)

        //adiciona o valor da despesa
        const expenseAmount = document.createElement ("span")
        expenseAmount.classList.add("expense-amount")
        expenseAmount.innerHTML = `<span>R$</span>${newExpense.amount.toUpperCase().replace("R$", "")}`

        //adiciona as informações no item.  
        expenseItem.append(expenseIcon, expenseInfo, expenseAmount)

        //adiciona o item na lista
        expenseList.append(expenseItem)

    } catch (error) {
        alert("Não foi possivel atualizar a lista de despesas");
        console.log(error);
    }
}

