//seleciona os elementos do formulario
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")


//seleciona os elementos da lista
const expenseList = document.querySelector("ul");
const expensesTotal = document.querySelector("aside header h2")
const expensesQuantities = document.querySelector("aside header p span")

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

//esse metódo adiciona um novo item na lista
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
        expenseAmount.innerHTML = `<span>R$</span>${newExpense.amount.toUpperCase().replace("R$", "").trim()}`

        //cria o icone de remover
        const removeIcon = document.createElement("img")
        removeIcon.classList.add("remove-icon")
        removeIcon.setAttribute("src", "img/remove.svg")
        removeIcon.setAttribute("alt", "remover")

        //adiciona as informações no item.  
        expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon)

        //adiciona o item na lista
        expenseList.append(expenseItem)

        //limpa o formulario para adicionar um novo item
        formClear()
        
        // Atualiza os totais
        updateTotals()

    } catch (error) {
        alert("Não foi possivel atualizar a lista de despesas");
        console.log(error);
    }
}

//atualiza os totais
function updateTotals(){
    try{
        // recupera todos os itens (li) da lista (ul)
        const items = expenseList.children

        //atualiza a quantidade de itens da lista
        expensesQuantities.textContent = `${items.length} ${items.length > 1 ? "despesas" : "despesa"}`

        // variavel para incrementar o total   
        let total = 0

        //percorre cada item (li) da lista (ul)
        for(let item = 0; item < items.length; item++){
            const itemAmount = items[item].querySelector(".expense-amount")

            //remove caracteres não numericos e substitui a virgula pelo ponto
            let value = itemAmount.textContent.replace(/[^\d,]/g, "").replace(",",".")

            //converte o valor para float
            value = parseFloat(value)
            
            //verificar se é um numero valido 
            if(isNaN(value)){
                return alert("nao foi possivel calcular o total. O valor não parece ser um número")
            }
        
            //incrementar o valor total
            total += Number(value)
        }
    
        //cria a span para adicionar o R$ formatado
        const symbolBRL = document.createElement("small")
        symbolBRL.textContent = "R$"
        
        //formata o valor e remove o R$ que será exibido pela small com um estilo costumizado
        total = formatCurrencyBRL(total).toUpperCase().replace("R$","")

        //limpa o conteudo do elemento
        expensesTotal.innerHTML = ""


        expensesTotal.append(symbolBRL, total)
        
    }catch (error) { 
        console.log(error)
        alert("Não foi possivel atualizar os dados")
    }
}

// Evento que captura o clique nos itens da lista
expenseList.addEventListener("click", function (event){

    //verifica se o elemento clicando é o icone de remover
    if(event.target.classList.contains("remove-icon")){

        //obtem a li pai do elemento clicado
        const item = event.target.closest(".expense")

        //remove o item da lista
        item.remove()
    }

    updateTotals()

})


function formClear(){
    expense.value = ""
    category.value = ""
    amount.value = ""

    //coloca o foco no input de amount. 
    expense.focus()
}