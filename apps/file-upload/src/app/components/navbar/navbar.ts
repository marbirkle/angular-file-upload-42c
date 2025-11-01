import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

/**
 * Navigation bar component.
 *
 * Displays the application branding and navigation links with responsive behavior.
 * Implements a mobile-first approach with a collapsible menu for smaller screens.
 *
 * @implements {Single Responsibility Principle} - Handles only navigation UI state and presentation
 */
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  /**
   * Tracks the open/closed state of the mobile navigation menu.
   *
   * @default false
   */
  public isMenuOpen = false;

  /**
   * Toggles the mobile navigation menu visibility state.
   *
   * Implements the toggle behavior for the hamburger menu on mobile devices.
   * Changes the state between open and closed.
   *
   * @returns {void}
   */
  public toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  /**
   * Closes the mobile navigation menu.
   *
   * Called when a navigation link is clicked to automatically close
   * the mobile menu after navigation.
   *
   * @returns {void}
   */
  public closeMenu(): void {
    this.isMenuOpen = false;
  }
}
