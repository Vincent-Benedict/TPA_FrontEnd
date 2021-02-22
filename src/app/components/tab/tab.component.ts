import { Component, Input, OnInit } from '@angular/core';
import { TabsComponent } from '../tabs/tabs.component';

@Component({
  selector: 'tab',
  // templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
  template: `
    <div class="content" [hidden]="!active">
      <ng-content></ng-content>
    </div>
  `
})
export class TabComponent implements OnInit {

  @Input() tabTitle;
  active;

  constructor(tabs: TabsComponent) {
    tabs.addTab(this)
  }

  ngOnInit(): void {
  }

}
