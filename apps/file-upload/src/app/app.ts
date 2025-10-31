import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

/**
 * Root application component.
 * Provides the main layout and router outlet.
 */
@Component({
  imports: [RouterModule],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'file-upload';
}
