const coffees = [
  { name: 'Bryggkaffe', price: 20 },
  { name: 'Cappucino', price: 30 },
  { name: 'Latte', price: 40 },
]

const select = document.getElementById('coffee-select')
const totalSpent = document.getElementById('total-spent')
const memberStatus = document.getElementById('member-status')
const transactionsContainer = document.getElementById('transactions-container')
const coffeeForm = document.getElementById('coffee-form')

coffeeForm.addEventListener('submit', onSubmit)

coffees.forEach((coffee, index) => {
  const coffeeOption = document.createElement('option') //<option></option>
  coffeeOption.innerText = `${coffee.name} - ${coffee.price} kr` //<option>Bryggkaffe - 20 kr</option>
  coffeeOption.value = index //<option value="0">Bryggkaffe - 20 kr</option>
  select.appendChild(coffeeOption)
})

class Customer {
  constructor() {
    this.transactions = []
  }

  addTransaction(coffeeId, quantity) {
    const transaction = {
      name: coffees[coffeeId].name,
      price: coffees[coffeeId].price,
      quantity: quantity,
    }

    //console.log(JSON.stringify(this.transactions, null, 2))
    this.transactions.push(transaction)
    //console.log(JSON.stringify(this.transactions, null, 2))
    this.displayTransaction(transaction)
  }

  displayTransaction(transaction) {
    const transactionElement = document.createElement('p')
    const { quantity, name, price } = transaction

    transactionElement.innerText = `Du köpte ${quantity} st ${name} för ${price} kr styck. Summa: ${
      quantity * price
    } kr`

    transactionsContainer.appendChild(transactionElement)
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
    totalSpent.innerText = `Du har handlat för ${this.calculateTotalSpent()} kr`
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
      memberStatus.innerText = `Medlemskapsstatus: Brons`
    } else if (totalCups < 30) {
      memberStatus.innerText = `Medlemskapsstatus: Silver`
    } else {
      memberStatus.innerText = `Medlemskapsstatus: Guld`
    }
  }
}

function onSubmit(event) {
  event.preventDefault()

  const coffeeTypeSelect = document.getElementById('coffee-select')
  const coffeeId = parseInt(coffeeTypeSelect.value) //Because value is of type string

  const quantityInput = document.getElementById('coffee-input')
  const quantity = parseInt(quantityInput.value)

  if (quantity > 0) {
    customer.addTransaction(coffeeId, quantity)
    customer.displayTotalSpent()
    customer.displayMemberStatus()
  } else {
  }
}

const customer = new Customer()
