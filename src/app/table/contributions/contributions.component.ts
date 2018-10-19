import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { ApiContributionService } from 'src/app/services/api/api-contribution.service';
import { Contribution } from 'src/app/interfaces/contribution';
import { GitProject } from 'src/app/interfaces/git-project';

@Component({
  selector: 'app-table-contributions',
  templateUrl: './contributions.component.html',
  styleUrls: ['./contributions.component.scss']
})
export class ContributionsComponent implements OnInit {
  public currentContributions: Array<Contribution>;
  @Input("git-project") currentProject: GitProject;

  constructor(private contributionApi: ApiContributionService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.refreshContributions();
  }

  public refreshContributions() {
    if (this.currentProject) {
      this.contributionApi.getAll(this.currentProject.id).toPromise().then(contributions => {
        this.currentContributions = contributions;
      });
    }
  }

  public contributionsSum() {
    if (this.currentContributions) {
      return this.currentContributions.reduce(function (x, contribution) { return x + contribution.number_of_tokens }, 0);
    }
    return 0;
  }
}
