import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-customer-toolbar',
  imports: [MatToolbar,
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './customer-toolbar.component.html',
  styleUrl: './customer-toolbar.component.scss'
})
export class CustomerToolbarComponent {

}
