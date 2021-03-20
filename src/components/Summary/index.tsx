import { Container } from "./styles";
import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import totalImg from '../../assets/total.svg'
import { useTransactions } from "../../hooks/useTransactions";
import { formatAmount } from '../../utils/formaters';

export function Summary(){
  const { transactions } = useTransactions()
  const {deposits, whitdraws, total} = transactions.reduce((acc, transaction) => {
    if(transaction.type === 'deposit'){
      acc.deposits += transaction.amount
      acc.total += transaction.amount
    }else {
      acc.whitdraws += transaction.amount
      acc.total -= transaction.amount
    }
    return acc
  }, {
    deposits: 0,
    whitdraws: 0,
    total: 0
  })
  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>        
          <img src={incomeImg} alt="Entradas"/>
        </header>
        <strong>{formatAmount(deposits)}</strong>
      </div>
      <div>
        <header>
          <p>Saídas</p>        
          <img src={outcomeImg} alt="Outcome"/>
        </header>
        <strong>{formatAmount(whitdraws)}</strong>
      </div>
      <div className="highlight-background">
        <header>
          <p>Total</p>        
          <img src={totalImg} alt="Total"/>
        </header>
        <strong>{formatAmount(total)}</strong>
      </div>
    </Container>
  )
}