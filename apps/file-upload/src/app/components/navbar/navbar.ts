import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

/**
 * Navigation bar component.
 * Displays application branding and navigation links.
 */
@Component({
  selector: 'app-navbar',
  imports: [RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {}
