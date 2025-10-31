import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteModal } from './delete-modal';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

describe('DeleteModal', () => {
  let component: DeleteModal;
  let fixture: ComponentFixture<DeleteModal>;
  let mockActiveModal: NgbActiveModal;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteModal],
      providers: [NgbActiveModal],
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteModal);
    component = fixture.componentInstance;
    mockActiveModal = TestBed.inject(NgbActiveModal);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('confirm', () => {
    it('should close modal with success result', () => {
      const spyClose = jest.spyOn(mockActiveModal, 'close');
      component.confirm();
      expect(spyClose).toHaveBeenCalledWith(true);
    });
  });

  describe('dismiss', () => {
    it('should dismiss modal with cancel result', () => {
      const spyDismiss = jest.spyOn(mockActiveModal, 'dismiss');
      component.dismiss();
      expect(spyDismiss).toHaveBeenCalledWith(false);
    });
  });
});
