import { Component } from '@angular/core';

@Component({
  template: `
    <div class="container">
      <router-outlet></router-outlet>
    </div>
  `,
})
export class SimpleLayoutComponent {
  constructor() {}
}
