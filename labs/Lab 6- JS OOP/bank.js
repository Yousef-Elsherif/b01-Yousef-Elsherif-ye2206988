const accounts = [
    { accountNo: 123, balance: 500, type: 'Savings' },
    { accountNo: 234, balance: 4000, type: 'Current' },
    { accountNo: 345, balance: 35000, type: 'Savings' },
]

function deposit(accountNo, amount){
    const account = accounts.find(acc => acc.accountNo === accountNo);
    account.balance += amount;
}

function withdraw(accountNo, amount){
    const account = accounts.find(acc => acc.accountNo === accountNo);
    if(account.balance < amount){
        console.log('Insufficient balance');
    }
    else
        account.balance -= amount;
}

function addAccount(accountNo, balance, type){
    accounts.push({ accountNo, balance, type });
}

function getAccount(accountNo){
    return accounts.find(acc => acc.accountNo === accountNo);
}

function sumBalance(){
    return accounts.reduce((sum, account) => sum + account.balance, 0);
}

function avgBalance(){
    return sumBalance() / accounts.length;
}

function distributeBenefit(benefitPercentage){
    const wantedAccounts = accounts.filter(account => account.type === 'Savings');
    wantedAccounts.forEach(account => account.balance += account.balance * benefitPercentage / 100);
}

function deductFee(monthlyFee){
    accounts.forEach(account => account.balance -= monthlyFee);
}

function deleteAccount(accountNo){
    const index = accounts.findIndex(acc => acc.accountNo === accountNo);
    accounts.splice(index, 1);
}

function toJson(){
    return JSON.stringify(accounts);
    }

function fromJson(json){
    accounts = JSON.parse(json);
}

module.exports = {
    deposit, withdraw, addAccount, getAccount, sumBalance, avgBalance, distributeBenefit, deductFee, deleteAccount, toJson, fromJson
}

