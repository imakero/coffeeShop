const coffees = [
  { name: 'Bryggkaffe', price: 20 },
  { name: 'Cappucino', price: 30 },
  { name: 'Latte', price: 40 },
]

const errorMessage = document.getElementById('error-message')
const coffeeSelect = document.getElementById('coffee-select')
const quantityInput = document.getElementById('coffee-input')
const totalSpent = document.getElementById('total-spent')
const memberStatus = document.getElementById('member-status')
const transactionsContainer = document.getElementById('transactions-container')
const coffeeForm = document.getElementById('coffee-form')
const transactionTitle = document.getElementById('transaction-title')
const discountMessage = document.getElementById('discount-message')

coffees.forEach((coffee, index) => {
  const coffeeOption = document.createElement('option')
  coffeeOption.innerText = `${coffee.name} - ${coffee.price} kr`
  coffeeOption.value = index
  coffeeSelect.appendChild(coffeeOption)
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

    this.transactions.push(transaction)
    this.displayTransaction(transaction)
  }

  updateDiscount() {
    const total = this.calculateTotalSpent()
    if (total >= 500 && total < 1000) {
      this.discount = 0.9
    } else if (total >= 1000) {
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

  displayDiscountMessage() {
    const total = this.calculateTotalSpent()
    if (total >= 500 && total < 1000) {
      discountMessage.innerText = `Du har 10% rabatt`
    } else if (total >= 1000) {
      discountMessage.innerText = `Du har 15% rabatt`
    }
  }
}

coffeeForm.addEventListener('submit', onSubmit)

function onSubmit(event) {
  event.preventDefault()

  const coffeeId = parseInt(coffeeSelect.value)
  const quantity = parseInt(quantityInput.value)

  if (quantity > 0 && quantity <= 10) {
    customer.addTransaction(coffeeId, quantity)
    customer.displayTotalSpent()
    customer.displayMemberStatus()
    customer.displayDiscountMessage()
    errorMessage.innerText = ``
    transactionTitle.innerText = `Dina Transaktioner`
  } else if (quantity > 10) {
    errorMessage.innerText = `Du får inte köpa mer än 10 koppar samtidigt!`
  } else if (quantity < 1) {
    errorMessage.innerText = `Du måste köpa minst 1 kopp!`
  }
}

const customer = new Customer()
