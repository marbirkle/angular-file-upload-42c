/**
 * Unit tests for root App component.
 *
 * Tests application bootstrap, component creation, and router outlet rendering.
 */

import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';

describe('App Component', () => {
  /**
   * Setup test environment before each test.
   * Configures TestBed with router provider and App component.
   */
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  /**
   * Component instantiation test.
   * Verifies that the root component can be created successfully.
   */
  it('should create the app component', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;

    expect(app).toBeTruthy();
  });

  /**
   * Router outlet test.
   * Verifies that the router outlet is rendered in the component template,
   * enabling navigation between routes.
   */
  it('should render router outlet for navigation', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });
});
