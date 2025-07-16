const expenseForm = document.getElementById('expense-form');
const expenseName = document.getElementById('expense-name');
const expenseAmount = document.getElementById('expense-amount');
const expenseList = document.getElementById('expense-list');
const totalAmount = document.getElementById('total-amount');

const pages = document.querySelectorAll('.page');
const navLinks = document.querySelectorAll('nav a');

let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
let budget = localStorage.getItem('budget') || 0;

function showPage(pageId) {
    pages.forEach(page => {
        page.style.display = page.id === pageId ? 'block' : 'none';
    });
}

function handleRouteChange() {
    const pageId = window.location.hash.substring(1) || 'dashboard';
    showPage(pageId);
}

window.addEventListener('hashchange', handleRouteChange);
window.addEventListener('load', handleRouteChange);

function renderDashboard() {
    const dashboardBudget = document.getElementById('dashboard-budget');
    const dashboardExpenses = document.getElementById('dashboard-expenses');
    const dashboardRemaining = document.getElementById('dashboard-remaining');

    const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
    const remaining = budget - totalExpenses;

    dashboardBudget.textContent = parseFloat(budget).toFixed(2);
    dashboardExpenses.textContent = totalExpenses.toFixed(2);
    dashboardRemaining.textContent = remaining.toFixed(2);
}

function renderExpenses() {
    expenseList.innerHTML = '';
    let total = 0;
    expenses.forEach((expense, index) => {
        const li = document.createElement('tr');
        li.innerHTML = `
            <td>${expense.name}</td>
            <td>$${expense.amount.toFixed(2)}</td>
            <td><button class="delete-btn" data-index="${index}">Delete</button></td>
        `;
        expenseList.appendChild(li);
        total += expense.amount;
    });
    totalAmount.textContent = total.toFixed(2);
    renderDashboard();
}

function addExpense(e) {
    e.preventDefault();
    const name = expenseName.value;
    const amount = parseFloat(expenseAmount.value);
    if (name && amount) {
        expenses.push({ name, amount });
        localStorage.setItem('expenses', JSON.stringify(expenses));
        renderExpenses();
        expenseName.value = '';
        expenseAmount.value = '';
    }
}

function deleteExpense(e) {
    if (e.target.classList.contains('delete-btn')) {
        const index = e.target.dataset.index;
        expenses.splice(index, 1);
        localStorage.setItem('expenses', JSON.stringify(expenses));
        renderExpenses();
    }
}

const budgetForm = document.getElementById('budget-form');
const budgetAmount = document.getElementById('budget-amount');

function setBudget(e) {
    e.preventDefault();
    budget = parseFloat(budgetAmount.value);
    localStorage.setItem('budget', budget);
    budgetAmount.value = '';
    alert('Budget set successfully!');
}

budgetForm.addEventListener('submit', setBudget);
expenseForm.addEventListener('submit', addExpense);
expenseList.addEventListener('click', deleteExpense);

renderExpenses();
