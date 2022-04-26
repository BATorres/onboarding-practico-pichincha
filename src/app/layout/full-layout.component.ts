import { Component } from '@angular/core';

@Component({
  template: `
    <app-header></app-header>
    <main class="container">
      <router-outlet></router-outlet>
    </main>
  `,
})
export class FullLayoutComponent {
  constructor() {}
}
