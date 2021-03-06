import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Input } from '@angular/core';
import { GitProject } from 'src/app/interfaces/git-project';
import { User } from 'src/app/interfaces/user';
import { ApiTransactionService } from '../../services/api/api-transaction.service';
import { Transaction } from 'src/app/interfaces/transaction';

@Component({
  selector: 'app-table-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  public currentTransactions: Array<Transaction>;
  @Input("git-project") currentProject: GitProject;
  @Input("from_user") from_user: User;
  @Input("to_user") to_user: User;

  constructor(private transactionService: ApiTransactionService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.refreshTransactions();
  }

  public refreshTransactions() {
    if (this.currentProject || this.from_user) {
      this.transactionService.getAll({
        project: this.currentProject ? this.currentProject.id : null,
        from_user: this.from_user ? this.from_user.id : null,
      }).toPromise().then(transactions => {
        this.currentTransactions = transactions;
      });
    }
  }

}
