import { Component, OnInit } from '@angular/core';
import { TabComponent } from '../tab/tab.component';

@Component({
  selector: 'tabs',
  // templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  template: `
  <div style="" class="tabs">

   <div style="" class="tabTitle" *ngFor="let tab of tabs" (click)="selectTab(tab)">
      <p>
        {{tab.tabTitle}}
      </p>
    </div>
  </div>
  <ng-content></ng-content>
`
})
export class TabsComponent implements OnInit {

  tabs: TabComponent[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  addTab(tab:TabComponent) {
    if (this.tabs.length === 0) {
      tab.active = true;
    }
    this.tabs.push(tab);
  }

  selectTab(tab:TabComponent) {
    this.tabs.forEach((tab) => {
      tab.active = false;
    });
    tab.active = true
  }

}
