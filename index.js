const coffees = [
  { name: 'Bryggkaffe', price: 20 },
  { name: 'Cappucino', price: 30 },
  { name: 'Latte', price: 40 },
]

const errorMessage = document.getElementById('error-message')
const coffeSelect = document.getElementById('coffee-select')
const totalSpent = document.getElementById('total-spent')
const memberStatus = document.getElementById('member-status')
const transactionsContainer = document.getElementById('transactions-container')
const coffeeForm = document.getElementById('coffee-form')
const transactionTitle = document.getElementById('transaction-title')
const discountMessage = document.getElementById('discount-message')

coffeeForm.addEventListener('submit', onSubmit)

coffees.forEach((coffee, index) => {
  const coffeeOption = document.createElement('option') //<option></option>
  coffeeOption.innerText = `${coffee.name} - ${coffee.price} kr` //<option>Bryggkaffe - 20 kr</option>
  coffeeOption.value = index //<option value="0">Bryggkaffe - 20 kr</option>
  coffeSelect.appendChild(coffeeOption)
})

class Customer {
  constructor() {
    this.transactions = []
    this.discount = 1
  }


  addTransaction(coffeeId, quantity) {
    this.updateDiscount()
    const transaction = {
      name: coffees[coffeeId].name,
      price: coffees[coffeeId].price * this.discount,
      quantity: quantity,
    }

    //console.log(JSON.stringify(this.transactions, null, 2))
    this.transactions.push(transaction)
    //console.log(JSON.stringify(this.transactions, null, 2))
    this.displayTransaction(transaction)
  }

  updateDiscount() {
    const total = this.calculateTotalSpent()
    if (total >= 500 && total < 1000){
      this.discount = 0.9
    } else if (total >= 1000){
      this.discount = 0.85
    }
  }

  displayTransaction(transaction) {
    const transactionElement = document.createElement('p')
    const { quantity, name, price } = transaction

    transactionElement.innerText = `Du köpte ${quantity} st ${name} för ${price} kr styck. Summa: ${
      quantity * price
    } kr`

    transactionsContainer.prepend(transactionElement)
  }

  calculateTotalSpent() {
    let sum = 0
    this.transactions.forEach((transaction) => {
      const transactionTotal = transaction.quantity * transaction.price
      sum += transactionTotal
    })
    return sum
  }

  displayTotalSpent() {
    totalSpent.innerText = `Du har handlat ${this.calculateTotalCups()} koppar för ${this.calculateTotalSpent()} kr`
  }

  calculateTotalCups() {
    let totalCups = 0
    this.transactions.forEach((transaction) => {
      totalCups += transaction.quantity
    })
    return totalCups
  }

  displayMemberStatus() {
    const totalCups = this.calculateTotalCups()
    if (totalCups < 10) {
      memberStatus.innerHTML = `Medlemskapsstatus: <span class="status-bronze">Brons</span>`
    } else if (totalCups < 30) {
      memberStatus.innerHTML = `Medlemskapsstatus: <span class="status-silver">Silver</span>`
    } else {
      memberStatus.innerHTML = `Medlemskapsstatus: <span class="status-gold">Guld</span>`
    }
  }

  displayDiscountMessage(){
    const total = this.calculateTotalSpent()
    if (total >= 500 && total < 1000){
      discountMessage.innerText = `Du har 10% rabatt`
    } else if (total >= 1000){
      discountMessage.innerText = `Du har 15% rabatt`
    }
  }
}

function onSubmit(event) {
  event.preventDefault()

  const coffeeTypeSelect = document.getElementById('coffee-select')
  const coffeeId = parseInt(coffeeTypeSelect.value) //Because value is of type string

  const quantityInput = document.getElementById('coffee-input')
  const quantity = parseInt(quantityInput.value)

  if (quantity > 0 && quantity <= 10) {
    customer.addTransaction(coffeeId, quantity)
    customer.displayTotalSpent()
    customer.displayMemberStatus()
    customer.displayDiscountMessage()
    errorMessage.innerText = ``
    transactionTitle.innerText = `Dina Transaktioner`
    

  } else if ( quantity > 10) {
    errorMessage.innerText = `Du får inte köpa mer än 10 koppar samtidigt`
  }
}

const customer = new Customer()
