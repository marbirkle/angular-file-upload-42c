/**
 * Unit tests for DeleteModal component.
 *
 * Tests delete confirmation modal functionality including
 * modal dismissal and confirmation actions.
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteModal } from './delete-modal';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

describe('DeleteModal Component', () => {
  let component: DeleteModal;
  let fixture: ComponentFixture<DeleteModal>;
  let mockActiveModal: NgbActiveModal;

  /**
   * Setup test environment before each test.
   * Configures TestBed with required dependencies.
   */
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteModal],
      providers: [NgbActiveModal],
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteModal);
    component = fixture.componentInstance;
    mockActiveModal = TestBed.inject(NgbActiveModal);
  });

  /**
   * Component instantiation test.
   * Verifies that the component can be created successfully.
   */
  it('should create component instance', () => {
    expect(component).toBeTruthy();
  });

  /**
   * Confirmation action tests.
   * Verifies that the modal closes with success result when confirmed.
   */
  describe('confirm', () => {
    it('should close modal with success result (true)', () => {
      const spyClose = jest.spyOn(mockActiveModal, 'close');

      component.confirm();

      expect(spyClose).toHaveBeenCalledWith(true);
    });
  });

  /**
   * Dismissal action tests.
   * Verifies that the modal dismisses with cancel result when dismissed.
   */
  describe('dismiss', () => {
    it('should dismiss modal with cancel result (false)', () => {
      const spyDismiss = jest.spyOn(mockActiveModal, 'dismiss');

      component.dismiss();

      expect(spyDismiss).toHaveBeenCalledWith(false);
    });
  });
});
