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
  const coffeeOption = document.createElement('option')
  coffeeOption.innerText = `${coffee.name} - ${coffee.price} kr`
  coffeeOption.value = index
  select.appendChild(coffeeOption)
})

class Customer {
  constructor() {
    this.totalSpent = 0
    this.memberStatus = ''
    this.transactions = []
  }

  addTransaction(coffeeId, quantity) {
    const transaction = {
      name: coffees[coffeeId].name,
      price: coffees[coffeeId].price,
      quantity: quantity,
    }

    this.transactions.push(transaction)
    this.displayTransaction(transaction)
  }

  transactionTotalPrice(transaction) {
    return transaction.quantity * transaction.price
  }

  displayTransaction(transaction) {
    const transactionElement = document.createElement('p')
    const { quantity, name, price } = transaction

    transactionElement.innerText = `Du köpte ${quantity} st ${name} för ${price} kr styck. Summa: ${this.transactionTotalPrice(
      transaction
    )} kr`

    transactionsContainer.appendChild(transactionElement)
  }
}

function onSubmit(event) {
  event.preventDefault()

  const coffeeTypeSelect = document.getElementById('coffee-select')
  const coffeeId = parseInt(coffeeTypeSelect.value)

  const quantityInput = document.getElementById('coffee-input')
  const quantity = parseInt(quantityInput.value)

  customer.addTransaction(coffeeId, quantity)
}

const customer = new Customer()
