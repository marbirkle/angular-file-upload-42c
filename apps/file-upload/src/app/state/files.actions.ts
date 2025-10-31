import { createActionGroup, props } from '@ngrx/store';
import { StoredFile } from './files.models';

/**
 * NgRx actions for file management.
 * Defines all actions available for manipulating the files state.
 */
export const FilesActions = createActionGroup({
  source: 'Files',
  events: {
    'Hydrate Request': props<{ items: StoredFile[] }>(),
    'Hydrate Apply': props<{ items: StoredFile[] }>(),

    'Add File': props<{ item: StoredFile }>(),
    'Delete File': props<{ fileName: string }>(),

    'Persist Success': props<{ count: number }>(),
  },
});
